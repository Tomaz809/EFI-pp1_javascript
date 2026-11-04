import { useContext } from "react"
import { PlanContext } from "../context/PlanContext"
import { estadoEnEnfoque } from "../utils/correlativas"
import MateriaCard from "./MateriaCard"

// Muestra las materias agrupadas por año
export default function PlanGrid({ materias, todasLasMaterias, grafo }) {
  const { enfocada } = useContext(PlanContext)

  const todas = todasLasMaterias ?? materias
  const nombres = Object.fromEntries(todas.map((m) => [m.id, m.nombre_materia]))
  const anios = [...new Set(materias.map((m) => m.anio))].sort((a, b) => a - b)

  if (materias.length === 0) {
    return <p className="text-zinc-500 py-6">No hay materias para mostrar.</p>
  }

  return (
    <div className="flex flex-col gap-8">
      {anios.map((anio) => {
        const delAnio = materias.filter((m) => m.anio === anio)
        return (
          <section key={anio}>
            <h2 className="text-[15px] text-zinc-700 border-b border-zinc-300 pb-1 mb-3">
              {anio}° Año <span className="text-zinc-400 text-xs">({delAnio.length} materias)</span>
            </h2>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {delAnio.map((materia) => (
                <MateriaCard
                  key={materia.id}
                  materia={materia}
                  estado={estadoEnEnfoque(materia.id, enfocada, grafo)}
                  previas={(grafo.requisitos[materia.id] ?? []).map((id) => nombres[id]).filter(Boolean)}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
