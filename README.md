# PlanITEC – Planificador de Carrera y Correlativas

Aplicación web en React para que los estudiantes del ITEC vean el plan de estudios completo (1.° a 3.° año) y gestionen su avance de forma visual: qué correlativas necesita cada materia, qué materias destraba y cuáles conviene cursar si no se puede cursar todo.

## Temática y API

La app consume la **API de Gestión Académica** desarrollada por el mismo grupo en el EFI de PP1 Python (FastAPI + SQLModel + Alembic):
[EFI-pp1_python](https://github.com/Tomaz809/EFI-pp1_python), desplegada en `https://efi-python-javascript.fastapicloud.dev`.

Endpoints usados:

| Método | Endpoint | Uso en la app |
|---|---|---|
| GET | `/materias/?size=100` | Plan de estudios |
| GET | `/materias/{id}` | Detalle de una materia con sus correlativas |
| POST | `/materias/` | Formulario "Nueva materia" |
| DELETE | `/materias/{id}` | Eliminar materia |
| GET | `/correlativas/?size=100` | Arma el grafo de correlativas |
| POST | `/correlativas/` | Formulario "Nueva correlativa" |
| DELETE | `/correlativas/{materia_id}/{correlativa_id}` | Quitar una correlativa |
| GET | `/carreras/` | Select de carreras del formulario |

## Funcionalidades

- **Modo Enfoque:** al tildar una materia se apagan las demás y quedan resaltadas sus correlativas previas (amarillo) y las materias que destraba (verde).
- **Materias favoritas:** se marcan con ★ y se destacan en violeta en toda la app (Context API). En `/favoritos` se ve además el camino de previas necesario para llegar a ellas.
- **Asistente de cursada:** el alumno marca las materias que va a cursar este cuatrimestre y la app indica cuál cursar **sí o sí** (cuello de botella: la que más materias destraba de su año) y cuáles son **postergables** (no son correlativas de ninguna).
- **ABM:** alta de materias y correlativas con formularios controlados y validados, y baja de materias y correlativas.

## Requisitos cubiertos

| Requisito | Implementación |
|---|---|
| Rutas base | `/`, `/materias`, `/favoritos`, `/cursada`, `/agregar` |
| Ruta dinámica | `/materia/:id` |
| Rutas anidadas | `/materias/anio/:anio` dentro de `/materias` y `/materia/:id/destraba` dentro de `/materia/:id` (con `<Outlet />`) |
| useState / useEffect | `hooks/usePlanEstudios.js` (datos, `loading`, `error`) y `pages/MateriaDetalle.jsx` (se vuelve a pedir al cambiar el `id`) |
| Formularios validados | `components/FormMateria.jsx` y `components/FormCorrelativa.jsx` (obligatorios, formato, longitud, rangos, duplicados) |
| Context API | `context/PlanContext.jsx`: favoritas, cursada y materia enfocada (persistidas en `localStorage`) |
| Estilos | Tailwind CSS v4 |
| Deploy | Vercel con la variable de entorno `VITE_API_URL` y `vercel.json` para las rutas |

## Estructura

```
src/
├── components/   # Navbar, Footer, MateriaCard, PlanGrid, formularios, etc.
├── context/      # PlanContext (estado global)
├── hooks/        # usePlanEstudios (consumo de la API)
├── pages/        # Vistas de cada ruta
├── services/     # api.js (todas las peticiones fetch)
└── utils/        # correlativas.js (grafo, previas, destraba, asistente)
```

## Ejecutar localmente

Requisitos: Node.js 20 o superior.

```bash
git clone https://github.com/Tomaz809/EFI-pp1_javascript.git
cd EFI-pp1_javascript
npm install
cp .env.example .env     # en Windows: copy .env.example .env
npm run dev
```

La app queda en `http://localhost:5173`.

Para usar la API local en lugar de la desplegada, cambiar en `.env`:

```
VITE_API_URL=http://127.0.0.1:8000
```

## Deploy en Vercel

1. Importar el repositorio en Vercel (framework: Vite).
2. En **Settings → Environment Variables** agregar `VITE_API_URL` con la URL de la API.
3. Agregar la URL de Vercel a `allow_origins` del CORS en la API (`src/main.py` del repo de Python).

## Organización

- Tablero Kanban: (https://equipo-9z-retools.atlassian.net/jira/software/projects/JS/boards/35?filter=&groupBy=none)
- GitFlow: `main` (producción), `develop` (integración) y ramas `feature/*` por funcionalidad.

## Integrantes

- Juan Ignacio Andrada Guzman
- Tomas Castelo
- Lautaro Ocanto
- Geronimo Martin Torasso
