import { useContext } from "react"
import { PlanContext } from "../context/PlanContext"
import { destrabaDe, estadoEnEnfoque, idsCuelloDeBotella } from "../utils/correlativas"
import MateriaCard from "./MateriaCard"

// Muestra las materias agrupadas por año, como el plan de estudio de SITEC
export default function PlanGrid({ materias, todasLasMaterias, grafo }) {
  const { enfocada, cursada } = useContext(PlanContext)

  const todas = todasLasMaterias ?? materias
  const nombres = Object.fromEntries(todas.map((m) => [m.id, m.nombre_materia]))

  // Los cuellos de botella se calculan sobre toda la cursada, aunque se esté filtrando por año
  const cuellos = idsCuelloDeBotella(todas, cursada, grafo)

  const anios = [...new Set(materias.map((m) => m.anio))].sort((a, b) => a - b)

  if (materias.length === 0) {
    return <p className="text-zinc-500 py-10 text-center">No hay materias para mostrar.</p>
  }

  return (
    <div className="flex flex-col gap-10">
      {anios.map((anio) => {
        const delAnio = materias.filter((m) => m.anio === anio)
        return (
          <section key={anio}>
            <div className="flex items-center justify-between border-b-2 border-itec-700 pb-2 mb-4">
              <h2 className="flex items-center gap-2 font-bold text-zinc-800">
                <span className="w-6 h-6 rounded-full bg-itec-700 text-white text-xs flex items-center justify-center">
                  {anio}
                </span>
                {anio}° Año – Tecnicatura Superior en Desarrollo de Software
              </h2>
              <span className="text-xs text-zinc-500">{delAnio.length} materias</span>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {delAnio.map((materia) => (
                <MateriaCard
                  key={materia.id}
                  materia={materia}
                  estado={estadoEnEnfoque(materia.id, enfocada, grafo)}
                  esCuello={cuellos.has(materia.id)}
                  previas={(grafo.requisitos[materia.id] ?? []).map((id) => nombres[id]).filter(Boolean)}
                  destraba={destrabaDe(materia.id, grafo).size}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
