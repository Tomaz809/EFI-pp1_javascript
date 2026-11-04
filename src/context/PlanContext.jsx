import { createContext, useEffect, useState } from "react"

// Estado global del alumno:
//  - favoritas: materias prioritarias / objetivos
//  - cursada: materias en las que se inscribió para cursar este cuatrimestre
//  - condiciones: condición simulada de cada materia (sin nota / aprobada / desaprobada)
//  - enfocada: materia seleccionada en "Modo Enfoque" del plan de estudio
//  - favoritosAbierto: si el panel de favoritos está visible
// eslint-disable-next-line react-refresh/only-export-components
export const PlanContext = createContext()

// Orden en que cambia la condición al tocar el botón de simulación
const CONDICIONES = ["sin_nota", "aprobada", "desaprobada"]

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

  useEffect(() => guardar("favoritas", favoritas), [favoritas])
  useEffect(() => guardar("cursada", cursada), [cursada])
  useEffect(() => guardar("condiciones", condiciones), [condiciones])
  useEffect(() => guardar("anioActual", anioActual), [anioActual])

  const toggleFavorita = (id) => setFavoritas((prev) => alternar(prev, id))
  const toggleCursada = (id) => setCursada((prev) => alternar(prev, id))
  const limpiarCursada = () => setCursada([])

  // Botón de simulación: pasa a la siguiente condición
  const simularCondicion = (id) =>
    setCondiciones((prev) => {
      const actual = prev[id] ?? "sin_nota"
      const siguiente = CONDICIONES[(CONDICIONES.indexOf(actual) + 1) % CONDICIONES.length]
      return { ...prev, [id]: siguiente }
    })

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
        abrirFavoritos: () => setFavoritosAbierto(true),
        cerrarFavoritos: () => setFavoritosAbierto(false),
      }}
    >
      {children}
    </PlanContext.Provider>
  )
}
