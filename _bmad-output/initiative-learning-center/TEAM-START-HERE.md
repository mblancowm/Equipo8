# Learning Center — guía para arrancar con cuatro personas

Actualizado: 2026-11-11. La rama de preparación deja cuatro tickets iniciales listos. Todavía no existe código de aplicación.

## Decisiones de desarrollo

1. Monorepo con backend Python/Django REST, frontend React Router SPA y PostgreSQL. Las versiones exactas están en la arquitectura.
2. Dependencias bloqueadas con uv.lock y package-lock.json. PostgreSQL local se levanta con Docker Compose.
3. La SPA llama rutas relativas bajo /api/v1. Vite las redirige al backend en desarrollo; la configuración de producción se define cuando el dueño de plataforma apruebe el destino.
4. API: respuestas de recurso en JSON; colecciones paginadas con count, next, previous y results; validación por campo como lista de mensajes; errores generales con detail y códigos HTTP semánticos.
5. UI en English/Español, preferencia seleccionable. El idioma de interfaz no filtra la búsqueda ni modifica el texto de origen. No hay traducción automática.
6. Meta de accesibilidad: WCAG 2.2 AA.
7. Los datos e identidades locales son sintéticos. La autenticación real, el identificador de empleado y la matriz de roles esperan decisión organizacional.

## Reparto inicial

| Ranura | Ticket | Responsable de coordinar | Entrega |
| --- | --- | --- | --- |
| Developer A | 5.1 | Persona que toma la base local | Inicio reproducible del frontend, API y PostgreSQL; lockfiles y comandos documentados |
| Developer B | 5.2 | Persona que coordina con IT/Identity, HR y Security | Proveedor, llave de empleado, matriz de acceso, denegaciones y aprobaciones pendientes |
| Developer C | 5.3 | Persona que coordina con Product Owner y HR/Learning | Diccionario aprobado de campos de Learning Item con dueño, validación y búsqueda |
| Developer D | 5.4 | Persona que coordina con SharePoint owner e IT | Biblioteca, contenido, permisos, acceso automatizado, esquema de muestra y casos no soportados |

Cada persona toma una ranura y registra su nombre en el rastreador que use el equipo. Los tickets no tienen nombres ni estimaciones porque no se proporcionaron.

## Orden para comenzar

1. Abrir esta guía, el ticket asignado y los contratos enlazados.
2. Empezar los cuatro tickets en paralelo. No hay dependencia entre 5.1, 5.2, 5.3 y 5.4.
3. Developer A crea solo la base local; usa datos sintéticos y no integra identidad corporativa ni conecta SharePoint.
4. Developers B, C y D llevan las decisiones a sus dueños de negocio/IT y anotan aprobaciones, decisiones abiertas, evidencia y fecha en el artefacto del ticket.
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
