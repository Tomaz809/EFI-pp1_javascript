import { useContext } from "react"
import { Link } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import Loader from "../components/Loader"
import MateriaCard from "../components/MateriaCard"
import { PlanContext } from "../context/PlanContext"
import usePlanEstudios from "../hooks/usePlanEstudios"
import { previasDe } from "../utils/correlativas"

export default function Favoritos() {
  const { materias, grafo, loading, error, recargar } = usePlanEstudios()
  const { favoritas } = useContext(PlanContext)

  if (loading) return <Loader texto="Cargando favoritas..." />
  if (error) return <ErrorMessage mensaje={error} onReintentar={recargar} />

  const materiasFavoritas = materias.filter((m) => favoritas.includes(m.id))

  // Para llegar a todas las favoritas, ¿qué materias necesito aprobar antes?
  const caminoIds = new Set()
  for (const m of materiasFavoritas) {
    previasDe(m.id, grafo).forEach((id) => caminoIds.add(id))
  }
  const camino = materias.filter((m) => caminoIds.has(m.id) && !favoritas.includes(m.id))

  return (
    <main className="max-w-5xl mx-auto w-full pt-6 px-4">
      <h1 className="text-3xl font-bold">Materias favoritas</h1>
      <p className="text-zinc-400 text-sm mt-1 mb-6">
        Las materias que marcaste como objetivo o prioritarias.
      </p>

      {materiasFavoritas.length === 0 ? (
        <div className="bg-zinc-800 p-6 rounded-lg">
          <p>Todavía no marcaste ninguna materia como favorita.</p>
          <Link to="/materias" className="text-sm text-indigo-400 hover:underline mt-2 inline-block">
            ← Ir al plan y marcar con ★
          </Link>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {materiasFavoritas.map((m) => (
              <MateriaCard key={m.id} materia={m} />
            ))}
          </div>

          <section className="mt-10">
            <h2 className="text-xl font-bold mb-1">Camino para llegar a tus favoritas</h2>
            <p className="text-zinc-400 text-sm mb-4">
              Materias que tenés que aprobar antes para poder cursarlas.
            </p>
            {camino.length === 0 ? (
              <p className="text-zinc-400">No necesitás ninguna previa extra.</p>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {camino.map((m) => (
                  <li key={m.id}>
                    <Link
                      to={`/materia/${m.id}`}
                      className="block bg-amber-950/60 border border-amber-600 px-3 py-1 rounded text-sm hover:bg-amber-900/60"
                    >
                      {m.nombre_materia} <span className="text-zinc-400">({m.anio}°)</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </main>
  )
}
