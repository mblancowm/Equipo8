#!/usr/bin/env python3
"""Refresh the Learning Center backlog page and every ticket's HTML view."""

from __future__ import annotations

import datetime as dt
import html
import json
import posixpath
import re
import subprocess
import sys
import tomllib
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[3]
INITIATIVE = REPO_ROOT / "_bmad-output" / "initiative-learning-center"
TICKET_SCRIPT = REPO_ROOT / "_bmad" / "method" / "scripts" / "tickets.py"
BACKLOG_HTML = INITIATIVE / "backlog-review.html"
RISK_LABELS = {"high": "Riesgo alto", "medium": "Riesgo medio", "low": "Riesgo bajo"}
TYPE_LABELS = {"story": "Historia", "spike": "Spike"}
STATE_LABELS = {"done": "Completado", "backlog": "En backlog", "planned": "Planificado"}
READINESS_BY_BUCKET = {
    "ready_to_refine": "Listo para refinar",
    "ready_to_start": "Listo para iniciar",
    "in_progress": "En progreso",
    "blocked": "Esperando dependencias",
}


def run_ticket_command(command: str) -> dict:
    result = subprocess.run(
        [
            sys.executable,
            str(TICKET_SCRIPT),
            "--project-root",
            str(REPO_ROOT),
            command,
            str(INITIATIVE),
        ],
        cwd=REPO_ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(result.stdout)


def load_toml_entries() -> dict[tuple[str, int], dict]:
    entries: dict[tuple[str, int], dict] = {}
    for epic_dir in sorted((INITIATIVE / "tickets").glob("epic-*")):
        path = epic_dir / "tickets" / "tickets.toml"
        if not path.exists():
            continue
        parsed = tomllib.loads(path.read_text(encoding="utf-8"))
        for entry in parsed.get("entry", []):
            entries[(epic_dir.name, int(entry["id"]))] = entry
    return entries


def escape(value: object) -> str:
    return html.escape(str(value if value is not None else ""), quote=True)


INLINE_TOKEN = re.compile(r"\*\*.+?\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|(?<!\*)\*[^*]+\*")


def inline_markdown(value: str) -> str:
    parts: list[str] = []
    last = 0
    for match in INLINE_TOKEN.finditer(value):
        parts.append(escape(value[last : match.start()]))
        token = match.group(0)
        if token.startswith("**"):
            parts.append(f"<strong>{escape(token[2:-2])}</strong>")
        elif token.startswith("`"):
            parts.append(f"<code>{escape(token[1:-1])}</code>")
        elif token.startswith("["):
            link = re.fullmatch(r"\[([^\]]+)\]\(([^)]+)\)", token)
            assert link
            label, href = link.groups()
            parts.append(f'<a href="{escape(href)}">{escape(label)}</a>')
        else:
            parts.append(f"<em>{escape(token[1:-1])}</em>")
        last = match.end()
    parts.append(escape(value[last:]))
    return "".join(parts)


def is_table_separator(line: str) -> bool:
    cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
    return bool(cells) and all(re.fullmatch(r":?-{3,}:?", cell or "-") for cell in cells)


def table_cells(line: str) -> list[str]:
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def render_markdown(markdown: str, title: str) -> str:
    lines = markdown.splitlines()
    if lines and lines[0].strip() == "---":
        for index in range(1, len(lines)):
            if lines[index].strip() == "---":
                lines = lines[index + 1 :]
                break

    rendered: list[str] = []
    paragraph: list[str] = []
    index = 0

    def flush_paragraph() -> None:
        if paragraph:
            rendered.append("<p>" + inline_markdown(" ".join(part.strip() for part in paragraph)) + "</p>")
            paragraph.clear()

    while index < len(lines):
        line = lines[index].rstrip()
        stripped = line.strip()
        if not stripped:
            flush_paragraph()
            index += 1
            continue

        if stripped.startswith("```"):
            flush_paragraph()
            fence = stripped[:3]
            code: list[str] = []
            index += 1
            while index < len(lines) and not lines[index].strip().startswith(fence):
                code.append(lines[index])
                index += 1
            rendered.append("<pre><code>" + escape("\n".join(code)) + "</code></pre>")
            index += 1
            continue

        heading = re.match(r"^(#{1,6})\s+(.+)$", stripped)
        if heading:
            flush_paragraph()
            level = len(heading.group(1))
            heading_text = heading.group(2).strip()
            if not (level == 1 and heading_text.casefold() == title.casefold()):
                html_level = max(2, min(level, 6))
                rendered.append(f"<h{html_level}>{inline_markdown(heading_text)}</h{html_level}>")
            index += 1
            continue

        if stripped.startswith("|") and index + 1 < len(lines) and is_table_separator(lines[index + 1]):
            flush_paragraph()
            headers = table_cells(lines[index])
            index += 2
            rows: list[list[str]] = []
            while index < len(lines) and lines[index].strip().startswith("|"):
                rows.append(table_cells(lines[index]))
                index += 1
            head = "".join(f"<th scope=\"col\">{inline_markdown(cell)}</th>" for cell in headers)
            body = "".join(
                "<tr>" + "".join(f"<td>{inline_markdown(cell)}</td>" for cell in row) + "</tr>"
                for row in rows
            )
            rendered.append(f'<div class="table-scroll"><table><thead><tr>{head}</tr></thead><tbody>{body}</tbody></table></div>')
            continue

        list_match = re.match(r"^\s*([-+*]|\d+\.)\s+(.+)$", line)
        if list_match:
            flush_paragraph()
            ordered = list_match.group(1).endswith(".")
            items: list[str] = []
            while index < len(lines):
                current = lines[index].rstrip()
                current_match = re.match(r"^\s*([-+*]|\d+\.)\s+(.+)$", current)
                if current_match:
                    current_ordered = current_match.group(1).endswith(".")
                    if current_ordered != ordered:
                        break
                    items.append(inline_markdown(current_match.group(2).strip()))
                    index += 1
                    continue
                if current.strip() and current[:1].isspace() and items:
                    items[-1] += "<br>" + inline_markdown(current.strip())
                    index += 1
                    continue
                break
            tag = "ol" if ordered else "ul"
            rendered.append(f"<{tag}>" + "".join(f"<li>{item}</li>" for item in items) + f"</{tag}>")
            continue

        if stripped.startswith(">"):
            flush_paragraph()
            quote: list[str] = []
            while index < len(lines) and lines[index].strip().startswith(">"):
                quote.append(lines[index].strip()[1:].strip())
                index += 1
            rendered.append("<blockquote><p>" + inline_markdown(" ".join(quote)) + "</p></blockquote>")
            continue

        if re.fullmatch(r"-{3,}|\*{3,}|_{3,}", stripped):
            flush_paragraph()
            rendered.append("<hr>")
            index += 1
            continue

        paragraph.append(line)
        index += 1

    flush_paragraph()
    return "\n".join(rendered)


def relative_ref(value: object, ticket: dict, epic_titles: dict[str, str]) -> str:
    if isinstance(value, int):
        return f"{ticket['epicPrefix']}.{value}"
    text = str(value)
    if text.startswith("epic-"):
        return f"Épica: {epic_titles.get(text, text)}"
    return text


def ticket_page_path(ticket: dict) -> str:
    if ticket.get("file"):
        filename = Path(ticket["file"]).with_suffix(".html").name
    else:
        filename = f"ticket-{ticket['id']}.html"
    return f"tickets/{ticket['epic']}/tickets/{filename}"


def linked_refs(values: list, ticket: dict, by_ref: dict[str, dict], epic_titles: dict[str, str]) -> str:
    if not values:
        return "<p>Ninguna registrada.</p>"
    items: list[str] = []
    for value in values:
        label = relative_ref(value, ticket, epic_titles)
        target = by_ref.get(label)
        if target:
            start = posixpath.dirname(ticket["webPage"])
            href = posixpath.relpath(target["webPage"], start=start)
            items.append(f'<li><a href="{escape(href)}">{escape(label)} · {escape(target["title"])}</a></li>')
        else:
            items.append(f"<li>{escape(label)}</li>")
    return "<ul>" + "".join(items) + "</ul>"


def detail_css() -> str:
    return """
:root{font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#17211f;background:#f4f6f3;font-synthesis:none;text-rendering:optimizeLegibility;--ink:#17211f;--muted:#64716c;--line:#dce3dd;--paper:#fff;--green:#176b51;--green-soft:#e6f3ed;--amber:#946200;--amber-soft:#fff3d5;--red:#a34236;--red-soft:#fbe9e5}
*{box-sizing:border-box}body{margin:0;min-width:320px}
header{background:#fff;border-bottom:1px solid var(--line);padding:28px max(24px,calc((100vw - 980px)/2))}
.eyebrow{font-size:12px;text-transform:uppercase;letter-spacing:.11em;color:var(--green);font-weight:750}
h1{font-size:clamp(28px,4vw,42px);line-height:1.08;margin:9px 0 10px;letter-spacing:-.035em}
header p{max-width:850px;color:var(--muted);line-height:1.55;margin:0}
main{max-width:980px;margin:0 auto;padding:22px 24px 32px}
.back{display:inline-block;color:#176b51;font-size:13px;font-weight:700;text-decoration:none;margin-bottom:18px}.back:hover{text-decoration:underline}
.meta{display:flex;flex-wrap:wrap;gap:7px;margin-top:15px}.badge{font-size:11px;font-weight:700;color:#435149;background:#f1f4f1;border-radius:999px;padding:6px 9px}
.badge.high{color:#a34236;background:#fbe9e5}.badge.medium{color:#946200;background:#fff3d5}.badge.low{color:#176b51;background:#e6f3ed}
.notice{background:#edf4ef;border:1px solid #d5e4d9;border-radius:12px;padding:13px 15px;margin-bottom:14px;color:#4d5d54;font-size:12px;line-height:1.5}.notice a{color:#176b51;text-decoration-thickness:1px;text-underline-offset:2px}
.content{background:#fff;border:1px solid var(--line);border-radius:12px;padding:clamp(18px,4vw,34px)}
.content h2{font-size:21px;line-height:1.25;margin:28px 0 11px;padding-bottom:8px;border-bottom:1px solid #e6ebe7;letter-spacing:-.02em}.content h2:first-child{margin-top:0}.content h3{font-size:16px;margin:22px 0 9px}
.content p,.content li{font-size:14px;line-height:1.65;color:#394840}.content ul,.content ol{padding-left:24px;margin:10px 0 18px}.content li{padding-left:4px;margin:0 0 11px}
.content code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.92em;background:#f1f4f1;border:1px solid #e5eae5;border-radius:4px;padding:1px 4px;color:#30443a}
.content a{color:#176b51;text-underline-offset:2px}.content blockquote{border-left:3px solid #a9cdbb;padding:1px 0 1px 16px;margin:14px 0}.table-scroll{overflow-x:auto}table{border-collapse:collapse;width:100%;font-size:13px}th,td{border:1px solid var(--line);padding:8px 10px;text-align:left;vertical-align:top}th{background:#f1f4f1}
.end{margin-top:16px}footer{max-width:980px;margin:0 auto;padding:0 24px 25px;color:var(--muted);font-size:11px;line-height:1.5}
@media(max-width:580px){header{padding:24px 18px}main{padding:18px}.content{padding:18px}}
"""


def make_ticket_page(ticket: dict, ticket_toml: dict, by_ref: dict[str, dict], epic_titles: dict[str, str]) -> str:
    page_path = ticket["webPage"]
    output_path = INITIATIVE / page_path
    source_path = INITIATIVE / "tickets" / ticket["epic"] / "tickets" / ticket["file"] if ticket.get("file") else None
    source_exists = bool(source_path and source_path.is_file())
    plan_rel = ticket.get("plan")
    plan_path = INITIATIVE / plan_rel if plan_rel else None
    if not plan_path or not plan_path.is_file():
        plan_path = None

    if source_exists:
        body = render_markdown(source_path.read_text(encoding="utf-8"), ticket["title"])
    else:
        description = ticket_toml.get("description") or "No hay descripción en tickets.toml todavía."
        verify = ticket_toml.get("verify") or "No hay criterio de verificación registrado todavía."
        body = (
            "<h2>Descripción</h2><p>" + inline_markdown(description) + "</p>"
            + "<h2>Verificación</h2><p>" + inline_markdown(verify) + "</p>"
        )
        unknown = ticket_toml.get("unknown") or ticket.get("unknown")
        if unknown:
            body += "<h2>Pregunta abierta</h2><p>" + inline_markdown(str(unknown)) + "</p>"

    source_link = ""
    if source_exists and source_path:
        source_link = f' · <a href="{escape(source_path.name)}">Fuente Markdown</a>'
    plan_link = ""
    if plan_path:
        plan_link = f' · <a href="{escape(plan_path.name)}">Plan</a>'

    after = ticket_toml.get("after", ticket.get("after", [])) or []
    waiting_on = ticket.get("waiting_on", []) or []
    blocks = ticket.get("blocks", []) or []
    context = (
        "<h2>Dependencias y seguimiento</h2>"
        "<h3>Dependencias definidas</h3>" + linked_refs(after, ticket, by_ref, epic_titles)
        + "<h3>Dependencias pendientes ahora</h3>" + linked_refs(waiting_on, ticket, by_ref, epic_titles)
        + "<h3>Tickets que desbloquea</h3>" + linked_refs(blocks, ticket, by_ref, epic_titles)
    )
    body += context

    status = ticket.get("status") or ticket.get("tracker_status") or STATE_LABELS.get(ticket.get("state", ""), "Sin estado")
    if status == "ready-for-dev":
        status = "Listo para desarrollo"
    elif status == "done":
        status = "Completado"
    badges = [
        f'<span class="badge">{escape(TYPE_LABELS.get(ticket.get("type"), ticket.get("type", "Ticket")))}</span>',
        f'<span class="badge {escape(ticket.get("risk", ""))}">{escape(RISK_LABELS.get(ticket.get("risk"), "Riesgo sin definir"))}</span>',
        f'<span class="badge">Preparación: {escape(ticket.get("readiness", "Sin calcular"))}</span>',
        f'<span class="badge">Estado: {escape(status)}</span>',
        f'<span class="badge">Responsable: {escape(ticket.get("assignee") or "Sin asignar")}</span>',
    ]
    if ticket.get("refined"):
        badges.append('<span class="badge">Refinado</span>')
    if ticket.get("covers"):
        badges.extend(f'<span class="badge">{escape(item)}</span>' for item in ticket["covers"])

    return f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>{escape(ticket['ref'])} · {escape(ticket['title'])}</title>
<style>{detail_css()}</style>
</head>
<body>
<header>
  <div class="eyebrow">Learning Center · Ficha {escape(ticket['ref'])}</div>
  <h1>{escape(ticket['title'])}</h1>
  <p>{escape(epic_titles.get(ticket['epic'], ticket['epic']))}</p>
  <div class="meta">{''.join(badges)}</div>
</header>
<main>
  <a class="back" href="../../../backlog-review.html">← Volver al backlog</a>
  <div class="notice">Ficha web de solo lectura generada desde el backlog BMad{source_link}{plan_link}</div>
  <article class="content">{body}</article>
  <div class="end"><a class="back" href="../../../backlog-review.html">← Volver al backlog</a></div>
</main>
<footer>Learning Center · ficha web local de revisión de equipo</footer>
</body>
</html>
"""


def refresh() -> tuple[int, int]:
    status = run_ticket_command("status")
    next_data = run_ticket_command("next")
    toml_entries = load_toml_entries()
    backlog = BACKLOG_HTML.read_text(encoding="utf-8")
    data_match = re.search(r"const DATA = (\{.*?\});\nconst EPIC_DEFINITIONS =", backlog, re.S)
    if not data_match:
        raise RuntimeError(f"Could not locate DATA payload in {BACKLOG_HTML}")
    old_data = json.loads(data_match.group(1))

    epic_records = {epic["slug"]: epic for epic in status.get("epics", [])}
    epic_titles = dict(old_data.get("epics", {}))
    for slug, epic in epic_records.items():
        if slug not in epic_titles:
            source = next((INITIATIVE / "tickets" / slug).glob("*.md"), None)
            heading = ""
            if source:
                heading_match = re.search(r"^#\s+(.+)$", source.read_text(encoding="utf-8"), re.M)
                heading = heading_match.group(1) if heading_match else ""
            epic_titles[slug] = heading or slug.removeprefix("epic-").replace("-", " ").title()

    readiness: dict[str, str] = {}
    next_by_ref: dict[str, dict] = {}
    for bucket, label in READINESS_BY_BUCKET.items():
        for ticket in next_data.get(bucket, []):
            readiness[ticket["ref"]] = label
            next_by_ref[ticket["ref"]] = ticket

    tickets: list[dict] = []
    for source in status["tickets"]:
        ticket = dict(source)
        entry = toml_entries.get((ticket["epic"], int(ticket["id"])), {})
        for key in ("description", "verify", "unknown", "after", "blocks", "covers", "risk", "hitl", "refine", "refined", "estimate"):
            if key in entry:
                ticket[key] = entry[key]
        epic = epic_records.get(ticket["epic"], {})
        ticket["epicTitle"] = epic_titles.get(ticket["epic"], ticket["epic"])
        ticket["epicPrefix"] = int(epic.get("id", ticket["ref"].split(".", 1)[0]))
        next_item = next_by_ref.get(ticket["ref"], {})
        ticket["readiness"] = "Completado" if ticket.get("state") == "done" or ticket.get("status") == "done" else readiness.get(ticket["ref"], "Esperando dependencias")
        ticket["waiting_on"] = next_item.get("waiting_on", [])
        if next_item.get("blocks"):
            ticket["blocks"] = next_item["blocks"]
        if ticket.get("file"):
            source_path = INITIATIVE / "tickets" / ticket["epic"] / "tickets" / ticket["file"]
            plan_path = source_path.with_name(source_path.stem + "-plan.md")
            ticket["plan"] = plan_path.relative_to(INITIATIVE).as_posix() if plan_path.is_file() else None
        else:
            ticket["plan"] = None
        ticket["webPage"] = ticket_page_path(ticket)
        tickets.append(ticket)

    by_ref = {ticket["ref"]: ticket for ticket in tickets}
    for ticket in tickets:
        entry = toml_entries.get((ticket["epic"], int(ticket["id"])), {})
        html_path = INITIATIVE / ticket["webPage"]
        html_path.parent.mkdir(parents=True, exist_ok=True)
        html_path.write_text(make_ticket_page(ticket, entry, by_ref, epic_titles), encoding="utf-8")

    data = {
        "createdAt": dt.date.today().isoformat(),
        "source": "BMad ticket tree and tickets.py status/next",
        "tickets": tickets,
        "epics": epic_titles,
    }
    serialized = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    serialized = serialized.replace("</", "<\\/")
    new_backlog = backlog[: data_match.start(1)] + serialized + backlog[data_match.end(1) :]
    BACKLOG_HTML.write_text(new_backlog, encoding="utf-8")
    return len(tickets), sum(1 for ticket in tickets if (INITIATIVE / ticket["webPage"]).is_file())


if __name__ == "__main__":
    total, pages = refresh()
    print(f"Updated backlog snapshot and {pages}/{total} ticket web views.")
