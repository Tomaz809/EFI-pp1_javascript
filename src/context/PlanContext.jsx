import { createContext, useEffect, useState } from "react"

// Estado global del alumno:
//  - favoritas: materias prioritarias / objetivos
//  - cursada: materias que piensa cursar este cuatrimestre
//  - enfocada: materia seleccionada en "Modo Enfoque"
// eslint-disable-next-line react-refresh/only-export-components
export const PlanContext = createContext()

function cargarLista(clave) {
  try {
    const guardado = localStorage.getItem(clave)
    return guardado ? JSON.parse(guardado) : []
  } catch {
    return []
  }
}

function guardarLista(clave, lista) {
  try {
    localStorage.setItem(clave, JSON.stringify(lista))
  } catch {
    // storage lleno o bloqueado
  }
}

// Agrega el id si no está, lo saca si ya está
const alternar = (lista, id) =>
  lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id]

export function PlanProvider({ children }) {
  const [favoritas, setFavoritas] = useState(() => cargarLista("favoritas"))
  const [cursada, setCursada] = useState(() => cargarLista("cursada"))
  const [enfocada, setEnfocada] = useState(null)

  useEffect(() => guardarLista("favoritas", favoritas), [favoritas])
  useEffect(() => guardarLista("cursada", cursada), [cursada])

  const toggleFavorita = (id) => setFavoritas((prev) => alternar(prev, id))
  const toggleCursada = (id) => setCursada((prev) => alternar(prev, id))
  const limpiarCursada = () => setCursada([])

  // Si toco la misma materia otra vez, salgo del modo enfoque
  const enfocar = (id) => setEnfocada((prev) => (prev === id ? null : id))
  const salirDeEnfoque = () => setEnfocada(null)

  // Cuando se borra una materia de la API la sacamos de todas las listas
  const quitarMateria = (id) => {
    setFavoritas((prev) => prev.filter((x) => x !== id))
    setCursada((prev) => prev.filter((x) => x !== id))
    setEnfocada((prev) => (prev === id ? null : prev))
  }

  return (
    <PlanContext.Provider
      value={{
        favoritas,
        cursada,
        enfocada,
        toggleFavorita,
        toggleCursada,
        limpiarCursada,
        enfocar,
        salirDeEnfoque,
        quitarMateria,
      }}
    >
      {children}
    </PlanContext.Provider>
  )
}
