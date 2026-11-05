import { createContext, useEffect, useState } from "react"
import Toast from "../components/Toast"

// Estado global del alumno:
//  - favoritas: materias prioritarias / objetivos
//  - cursada: materias en las que se inscribió para cursar este cuatrimestre
//  - condiciones: condición simulada de cada materia (sin nota / aprobada / desaprobada)
//  - anioActual: año lectivo activo de cursada
//  - enfocada: materia seleccionada en "Modo Enfoque" del plan de estudio
//  - favoritosAbierto: si el panel de favoritos está visible
//  - toast: sistema de notificaciones no invasivas
// eslint-disable-next-line react-refresh/only-export-components
export const PlanContext = createContext()

// Orden en que cambia la condición al tocar el botón de simulación
const CONDICIONES = ["sin_nota", "aprobada", "desaprobada"]

const ETIQUETAS_CONDICION = {
  sin_nota: "Sin nota",
  aprobada: "Aprobada",
  desaprobada: "Desaprobada",
}

function cargar(clave, inicial) {
  try {
    const guardado = localStorage.getItem(clave)
    return guardado ? JSON.parse(guardado) : inicial
  } catch {
    return inicial
  }
}

function guardar(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor))
  } catch {
    // storage lleno o bloqueado
  }
}

// Agrega el id si no está, lo saca si ya está
const alternar = (lista, id) =>
  lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id]

export function PlanProvider({ children }) {
  const [favoritas, setFavoritas] = useState(() => cargar("favoritas", []))
  const [cursada, setCursada] = useState(() => cargar("cursada", []))
  const [condiciones, setCondiciones] = useState(() => cargar("condiciones", {}))
  const [anioActual, setAnioActual] = useState(() => cargar("anioActual", 1))
  const [enfocada, setEnfocada] = useState(null)
  const [favoritosAbierto, setFavoritosAbierto] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => guardar("favoritas", favoritas), [favoritas])
  useEffect(() => guardar("cursada", cursada), [cursada])
  useEffect(() => guardar("condiciones", condiciones), [condiciones])
  useEffect(() => guardar("anioActual", anioActual), [anioActual])

  const mostrarToast = (mensaje, tipo = "info") => {
    setToast({ id: Date.now(), mensaje, tipo })
  }

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3500)
    return () => clearTimeout(timer)
  }, [toast])

  const toggleFavorita = (id, nombre) => {
    setFavoritas((prev) => {
      const yaExiste = prev.includes(id)
      const nueva = alternar(prev, id)
      if (nombre) {
        mostrarToast(
          !yaExiste
            ? `★ "${nombre}" marcada como prioritaria`
            : `Removida de prioritarias: "${nombre}"`,
          !yaExiste ? "star" : "info"
        )
      }
      return nueva
    })
  }

  const toggleCursada = (id, nombre) => {
    setCursada((prev) => {
      const yaInscripta = prev.includes(id)
      const nueva = alternar(prev, id)
      if (nombre) {
        mostrarToast(
          !yaInscripta
            ? `✓ Inscripción confirmada: "${nombre}"`
            : `Baja de inscripción: "${nombre}"`,
          !yaInscripta ? "ok" : "warn"
        )
      }
      return nueva
    })
  }

  const limpiarCursada = () => {
    setCursada([])
    mostrarToast("Se dieron de baja todas las inscripciones", "info")
  }

  // Botón de simulación: pasa a la siguiente condición
  const simularCondicion = (id, nombre) => {
    setCondiciones((prev) => {
      const actual = prev[id] ?? "sin_nota"
      const siguiente = CONDICIONES[(CONDICIONES.indexOf(actual) + 1) % CONDICIONES.length]
      if (nombre) {
        mostrarToast(
          `Condición de "${nombre}": ${ETIQUETAS_CONDICION[siguiente]}`,
          siguiente === "aprobada" ? "ok" : siguiente === "desaprobada" ? "warn" : "info"
        )
      }
      return { ...prev, [id]: siguiente }
    })
  }

  // Si toco la misma materia otra vez, salgo del modo enfoque
  const enfocar = (id) => setEnfocada((prev) => (prev === id ? null : id))
  const salirDeEnfoque = () => setEnfocada(null)

  // Cuando se borra una materia de la API la sacamos de todas las listas
  const quitarMateria = (id) => {
    setFavoritas((prev) => prev.filter((x) => x !== id))
    setCursada((prev) => prev.filter((x) => x !== id))
    setCondiciones((prev) => {
      const copia = { ...prev }
      delete copia[id]
      return copia
    })
    setEnfocada((prev) => (prev === id ? null : prev))
    mostrarToast("Materia eliminada del sistema", "warn")
  }

  return (
    <PlanContext.Provider
      value={{
        favoritas,
        cursada,
        condiciones,
        anioActual,
        enfocada,
        favoritosAbierto,
        toggleFavorita,
        toggleCursada,
        limpiarCursada,
        simularCondicion,
        setAnioActual,
        enfocar,
        salirDeEnfoque,
        quitarMateria,
        mostrarToast,
        abrirFavoritos: () => setFavoritosAbierto(true),
        cerrarFavoritos: () => setFavoritosAbierto(false),
      }}
    >
      {children}
      <Toast toast={toast} onCerrar={() => setToast(null)} />
    </PlanContext.Provider>
  )
}
