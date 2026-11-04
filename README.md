# SITEC · Inscripciones y Correlativas

Aplicación web en React para que los estudiantes del ITEC Río Cuarto se inscriban a cursar, sigan la condición de sus materias y consulten el plan de estudios de la Tecnicatura Superior en Desarrollo de Software (1.° a 3.° año) con su régimen de correlatividades.

Está diseñada como un **prototipo de módulo para el SITEC**: reproduce su estética (barra superior, menú lateral, colores y tipografía) para mostrar cómo se integraría en el sistema actual.

> **Alcance:** son funcionales **Inscripciones → Cursar / Ver Inscripciones**, **Estado Cursada → Condición / Plan de Estudio / Cargar plan** y el botón **favoritos**. El resto (Mis Datos, Rendir, Llamado a Examen, Institucional, Ayuda, Descarga de Archivos, Mi Usuario y Salir) es **solo una muestra visual** del SITEC: aparece atenuado y no se puede usar.

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

- **Inscripciones Para Cursar:** se listan las materias del año que cursa el alumno y las del año siguiente. Al tocar el círculo de una materia el alumno se inscribe:
  - si la materia **es correlativa** de otras, la barra se pone **amarilla** con el mensaje "Cuenta con correlativa" y las materias que destraba;
  - si **no es correlativa** de ninguna, se pone **gris** con el aviso "OJO! Si no tenés tiempo para cursar todo el año, priorizá otra materia con correlativa".
- **Ver Inscripciones:** materias inscriptas, con opción de darse de baja.
- **Condición (Estado de Cursada):** cada materia inscripta tiene un botón de **simulación** que cambia la condición (Sin nota → Aprobada → Desaprobada) como si el docente cargara la nota, y una ★ para marcarla como favorita.
- **Favoritos:** el botón de la barra superior abre un panel en la misma página con cada materia favorita y sus correlativas.
- **Plan de Estudio:** todas las materias por año (con filtro por año como ruta anidada y buscador). Al tildar "Ver correlativas" se resaltan en amarillo las previas y en gris las que destraba.
- **Detalle de materia** (`/materia/:id`): correlativas directas e indirectas y qué materias destraba; permite quitar correlativas y eliminar la materia.
- **Cargar plan:** alta de materias y correlativas con formularios controlados y validados.

## Requisitos cubiertos

| Requisito | Implementación |
|---|---|
| Rutas base | `/`, `/inscripciones`, `/estado-cursada`, `/materias`, `/agregar` |
| Ruta dinámica | `/materia/:id` |
| Rutas anidadas | `/inscripciones/cursar` y `/inscripciones/ver`; `/materias/anio/:anio`; `/materia/:id/destraba` (con `<Outlet />`) |
| useState / useEffect | `hooks/usePlanEstudios.js` (datos, `loading`, `error`) y `pages/MateriaDetalle.jsx` (se vuelve a pedir al cambiar el `id`) |
| Formularios validados | `components/FormMateria.jsx` y `components/FormCorrelativa.jsx` (obligatorios, formato, longitud, rangos, duplicados) |
| Context API | `context/PlanContext.jsx`: favoritas, inscripciones, condiciones simuladas, año que cursa, modo enfoque y panel de favoritos (persistidos en `localStorage`) |
| Estilos | Tailwind CSS v4 con la paleta del SITEC (`@theme` en `src/index.css`) |
| Deploy | Vercel con la variable de entorno `VITE_API_URL` y `vercel.json` para las rutas |

## Estructura

```
src/
├── components/   # Topbar, Sidebar, BarraMateria, FavoritosModal, MateriaCard, formularios, etc.
├── context/      # PlanContext (estado global)
├── hooks/        # usePlanEstudios (consumo de la API)
├── pages/        # Vistas de cada ruta
├── services/     # api.js (todas las peticiones fetch)
└── utils/        # correlativas.js (grafo, previas, destraba) y mensajes.js (avisos de inscripción)
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
