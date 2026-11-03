import { useContext } from "react"
import { PlanContext } from "../context/PlanContext"
import { estadoEnEnfoque, idsCuelloDeBotella } from "../utils/correlativas"
import MateriaCard from "./MateriaCard"

// Muestra las materias en columnas, una por año
export default function PlanGrid({ materias, todasLasMaterias, grafo }) {
  const { enfocada, cursada } = useContext(PlanContext)

  // Los cuellos de botella se calculan sobre toda la cursada, aunque se esté filtrando por año
  const cuellos = idsCuelloDeBotella(todasLasMaterias ?? materias, cursada, grafo)

  const anios = [...new Set(materias.map((m) => m.anio))].sort((a, b) => a - b)

  if (materias.length === 0) {
    return <p className="text-zinc-400 py-10 text-center">No hay materias para mostrar.</p>
  }

  return (
    <div
      className="grid gap-6"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(260px, 1fr))` }}
    >
      {anios.map((anio) => (
        <section key={anio} className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-blue-400 border-b border-zinc-700 pb-2">
            {anio}° año
          </h2>
          {materias
            .filter((m) => m.anio === anio)
            .map((materia) => (
              <MateriaCard
                key={materia.id}
                materia={materia}
                estado={estadoEnEnfoque(materia.id, enfocada, grafo)}
                esCuello={cuellos.has(materia.id)}
              />
            ))}
        </section>
      ))}
    </div>
  )
}
