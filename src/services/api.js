// Todas las peticiones a la API de FastAPI (EFI PP1 Python) pasan por acá.
// La URL se toma de la variable de entorno VITE_API_URL (.env / Vercel).
export const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

// La API pagina con fastapi-pagination: { items, total, page, size, pages }.
// Pedimos size=100 (el máximo) para traer el plan completo en una sola página.
const TAMANIO_PAGINA = 100

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })

  if (!res.ok) {
    let mensaje = `Error ${res.status}`
    try {
      const data = await res.json()
      // FastAPI devuelve "detail" como string (HTTPException) o como lista (errores de validación)
      if (typeof data.detail === "string") mensaje = data.detail
      else if (Array.isArray(data.detail)) mensaje = data.detail[0]?.msg ?? mensaje
    } catch {
      // la respuesta no era JSON
    }
    throw new Error(mensaje)
  }

  if (res.status === 204) return null
  return res.json()
}

// ---- Materias ----
export async function getMaterias() {
  const data = await request(`/materias/?size=${TAMANIO_PAGINA}`)
  return data.items
}

export const getMateria = (id) => request(`/materias/${id}`)

export const createMateria = (materia) =>
  request("/materias/", { method: "POST", body: JSON.stringify(materia) })

export const deleteMateria = (id) => request(`/materias/${id}`, { method: "DELETE" })

// ---- Correlativas ----
// Cada correlativa es { materia_id, correlativa_id }:
// "para cursar materia_id hay que tener correlativa_id"
export async function getCorrelativas() {
  const data = await request(`/correlativas/?size=${TAMANIO_PAGINA}`)
  return data.items
}

export const createCorrelativa = (correlativa) =>
  request("/correlativas/", { method: "POST", body: JSON.stringify(correlativa) })

export const deleteCorrelativa = (materiaId, correlativaId) =>
  request(`/correlativas/${materiaId}/${correlativaId}`, { method: "DELETE" })

// ---- Carreras ----
export async function getCarreras() {
  const data = await request(`/carreras/?size=${TAMANIO_PAGINA}`)
  return data.items
}
