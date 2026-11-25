# Learning Center — guía para arrancar con cuatro personas

Actualizado: 2026-11-24. El scaffold 5.1 está terminado; 5.3 y 5.4 están completos. Juan dejó la propuesta de 5.2 en `docs/planning/5-2-identity-and-access-spike-2026-11-24.md`; está bloqueado hasta que los dueños aprueben identidad, roles y controles de datos.

## Decisiones de desarrollo

1. `apps/web`: React, Vike (`vike-react`) y Tailwind CSS. TypeScript `strict` está activo en `apps/web`, `apps/api` y `packages/contracts`; 5.1 dejó un comando raíz documentado para revisar tipos en los tres paquetes. El cliente Vike usa el modo SPA refinado en el ticket.
2. `apps/api`: Bun con Hono. `apps/api/src/db`: Drizzle ORM con SQLite local. `packages/contracts`: esquemas Zod compartidos y validados en tiempo de ejecución por web y API.
3. La web llama rutas relativas bajo `/api/v1`; Vike/Vite las redirige a Hono en desarrollo. Producción y base de datos de producción esperan decisión de sus responsables.
4. API: respuestas JSON; colecciones paginadas con count, next, previous y results; validación por campo como lista de mensajes; errores generales con detail y códigos HTTP semánticos. Zod valida contratos, pero la autorización siempre se comprueba en la API.
5. UI en English/Español, preferencia seleccionable. El idioma de interfaz no filtra la búsqueda ni modifica el texto de origen. No hay traducción automática.
6. Búsqueda local: SQLite FTS5, sin stemming específico para español. [SUPUESTO] El Product Owner debe confirmar ejemplos de búsqueda antes de implementar el ticket de búsqueda.
7. Meta de accesibilidad: WCAG 2.2 AA. Los datos e identidades locales son sintéticos; autenticación real, identificador de empleado y matriz de roles esperan decisión organizacional.

> 5.1 se ejecutó sobre los criterios refinados: Bun workspaces, Vike SPA y la verificación FTS5 quedaron documentados y comprobados en macOS ARM64. Producto debe aprobar ejemplos de búsqueda antes de implementar esa función; el scaffold solo comprueba que FTS5 esté disponible.

## Reparto inicial

| Persona | Ticket | Responsable de coordinar | Entrega |
| --- | --- | --- | --- |
| Marianne | 5.1 | Completado | Inicio reproducible de web/API/contratos y SQLite; lockfile, comandos y smoke checks documentados |
| Juan | 5.2 | Propuesta documentada; espera revisión de IT/Identity, HR/Learning, Product Owner y Security/Privacy | Proveedor y llave oficiales, matriz de acceso, denegaciones y aprobaciones pendientes |
| Daniela | 5.3 | Completado | Diccionario aprobado de campos de Learning Item con dueño, validación y búsqueda |
| Harun | 5.4 | Coordina con SharePoint owner e IT | Biblioteca, contenido, permisos, acceso automatizado, esquema de muestra y casos no soportados |

Las asignaciones están registradas en los planes de los tickets. Las estimaciones y la cadencia del sprint siguen pendientes.

## Orden para comenzar

1. Abrir esta guía, el ticket asignado y los contratos enlazados.
2. 5.3 y 5.4 están completos. La propuesta 5.2 requiere decisión de sus dueños antes de implementar acceso. Consultar `tickets.py next` para escoger el siguiente trabajo disponible. El scaffold 5.1 está disponible como base local compartida.
3. Seguir el [README de la aplicación](../../README.md) para instalar y arrancar web/API y SQLite. Usar datos sintéticos; no integrar identidad corporativa ni conectar SharePoint.
4. Juan lleva la propuesta 5.2 a IT/Identity, HR/Learning, Product Owner y Security/Privacy; Daniela continúa 5.3 y Harun usa el resultado de 5.4. Registren aprobaciones, decisiones abiertas, responsable, evidencia y fecha en los artefactos de cada ticket.
5. Cuando 5.3 esté listo, tomar 5.7 para crear el único modelo LearningItem. Los tickets 2.2 y 3.2 esperan ese contrato; no creen modelos duplicados.
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

## Qué sigue pendiente

El scaffold local y sus comandos ya existen en el repositorio. CI, Compose, identidad real, integraciones con fuentes y configuración de producción siguen pendientes de sus tickets y aprobaciones correspondientes.
