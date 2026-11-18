# Learning Center — guía para arrancar con cuatro personas

Actualizado: 2026-11-18. Los cuatro tickets de la primera ola están asignados y listos para desarrollo; el ticket de scaffold 5.1 está actualizado al stack de la empresa y espera que Producto e Ingeniería confirmen sus supuestos antes de implementar. Todavía no existe código de aplicación.

## Decisiones de desarrollo

1. `apps/web`: React, Vike (`vike-react`) y Tailwind CSS. TypeScript `strict` está activo en `apps/web`, `apps/api` y `packages/contracts`; 5.1 dejará un comando raíz documentado para revisar tipos en los tres paquetes. [SUPUESTO] Se conserva el modo SPA existente.
2. `apps/api`: Bun con Hono. `apps/api/src/db`: Drizzle ORM con SQLite local. `packages/contracts`: esquemas Zod compartidos y validados en tiempo de ejecución por web y API.
3. La web llama rutas relativas bajo `/api/v1`; Vike/Vite las redirige a Hono en desarrollo. Producción y base de datos de producción esperan decisión de sus responsables.
4. API: respuestas JSON; colecciones paginadas con count, next, previous y results; validación por campo como lista de mensajes; errores generales con detail y códigos HTTP semánticos. Zod valida contratos, pero la autorización siempre se comprueba en la API.
5. UI en English/Español, preferencia seleccionable. El idioma de interfaz no filtra la búsqueda ni modifica el texto de origen. No hay traducción automática.
6. Búsqueda local: SQLite FTS5, sin stemming específico para español. [SUPUESTO] El Product Owner debe confirmar ejemplos de búsqueda antes de implementar el ticket de búsqueda.
7. Meta de accesibilidad: WCAG 2.2 AA. Los datos e identidades locales son sintéticos; autenticación real, identificador de empleado y matriz de roles esperan decisión organizacional.

> Los criterios de 5.1 y el índice `tickets.toml` se alinearon con el stack nuevo. El ticket quedó sin refinamiento hasta que Producto acepte el modo SPA y el equipo de Ingeniería confirme el workspace Bun y cómo verificará FTS5 en los sistemas soportados. Producto también debe aprobar ejemplos de búsqueda antes de implementar búsqueda; el scaffold solo comprueba que FTS5 esté disponible.

## Reparto inicial

| Persona | Ticket | Responsable de coordinar | Entrega |
| --- | --- | --- | --- |
| Marianne | 5.1 | Coordina la base local con Producto e Ingeniería | Inicio reproducible de web/API/contratos y SQLite; lockfile y comandos documentados |
| Juan | 5.2 | Coordina con IT/Identity, HR y Security | Proveedor, llave de empleado, matriz de acceso, denegaciones y aprobaciones pendientes |
| Daniela | 5.3 | Coordina con Product Owner y HR/Learning | Diccionario aprobado de campos de Learning Item con dueño, validación y búsqueda |
| Harun | 5.4 | Coordina con SharePoint owner e IT | Biblioteca, contenido, permisos, acceso automatizado, esquema de muestra y casos no soportados |

Las asignaciones están registradas en los planes de los tickets. Las estimaciones y la cadencia del sprint siguen pendientes.

## Orden para comenzar

1. Abrir esta guía, el ticket asignado y los contratos enlazados.
2. Empezar 5.2, 5.3 y 5.4 en paralelo. Refinar 5.1 con Producto e Ingeniería antes de iniciar su implementación; quien lo tome verifica FTS5 en los sistemas soportados.
3. Una vez Producto e Ingeniería confirmen los supuestos, Marianne crea solo la base local; usa datos sintéticos y no integra identidad corporativa ni conecta SharePoint.
4. Juan, Daniela y Harun llevan las decisiones a sus dueños de negocio/IT y anotan aprobaciones, decisiones abiertas, evidencia y fecha en el artefacto del ticket.
5. Cuando 5.1 y 5.3 estén listos, tomar 5.7 para crear el único modelo LearningItem. Los tickets 2.2 y 3.2 esperan ese contrato; no creen modelos duplicados.
6. Revisar los resultados de discovery y el scaffold. Después elegir el siguiente ticket con el tablero BMad.

Consultar los tickets disponibles:

    uv run _bmad/method/scripts/tickets.py --project-root . next

Convención inicial del equipo: una rama por ticket, prefijo codex/learning-center-<ticket>, y revisión por otra de las cuatro personas antes de integrar. El repositorio aún no tiene protección de rama, revisión obligatoria ni CI configurados.

## Aprobaciones pendientes antes de datos reales o producción

| Responsable organizacional | Decisión necesaria | Qué queda detenido |
| --- | --- | --- |
| IT/Identity + Security | Proveedor de sign-in, employee key estable y roles | Autenticación real y acceso a registros personales |
| HR/Learning + Product Owner | Tipos y campos de registros personales; campos del catálogo | Formularios, importación y acceso a registros no aprobados |
| SharePoint owner + IT | Biblioteca exacta, contenido, permiso mínimo, acceso por usuario, cambios/borrados | Conector real y enlaces visibles |
| Security/Privacy + data owner | Clasificación, retención, auditoría y manejo regional | Cualquier dato real de empleados en producción |
| Operations/IT | Hosting, región, despliegue, rollback, backup, monitoreo, alertas y owner on-call | Lanzamiento a producción |
| Product Owner + empleados | Alcance del MVP, medición inicial y metas de búsqueda | Evaluación de piloto |

## Qué no existe todavía

No hay código frontend/backend, manifiestos, lockfiles, Compose, CI ni comandos de desarrollo. El ticket 5.1 crea la base y documenta sus comandos. Esta guía no presenta comandos planeados como si ya funcionaran.
