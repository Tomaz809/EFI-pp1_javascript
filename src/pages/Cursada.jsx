import PageHeader from "../components/PageHeader"
import { useContext } from "react"
import { Link } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import Loader from "../components/Loader"
import { PlanContext } from "../context/PlanContext"
import usePlanEstudios from "../hooks/usePlanEstudios"
import { analizarCursada } from "../utils/correlativas"

const PRIORIDADES = {
  cuello: {
    titulo: "Cursala sí o sí",
    detalle: "Es cuello de botella: es la que más materias destraba de su año.",
    clase: "border-itec-700 bg-itec-50",
    badge: "bg-itec-700",
  },
  recomendada: {
    titulo: "Recomendada",
    detalle: "Destraba materias, pero hay otra de su año que destraba más.",
    clase: "border-amber-500 bg-amber-50",
    badge: "bg-amber-600",
  },
  postergable: {
    titulo: "Postergable",
    detalle: "No es correlativa de ninguna materia: si no te da el tiempo, dejala para después.",
    clase: "border-zinc-300 bg-white border border-zinc-200",
    badge: "bg-zinc-500",
  },
}

export default function Cursada() {
  const { materias, grafo, loading, error, recargar } = usePlanEstudios()
  const { cursada, toggleCursada, limpiarCursada } = useContext(PlanContext)

  if (loading) return <Loader texto="Analizando tu cursada..." />
  if (error) return <ErrorMessage mensaje={error} onReintentar={recargar} />

  const seleccionadas = materias.filter((m) => cursada.includes(m.id))
  const analisis = analizarCursada(seleccionadas, grafo)

  return (
    <main className="max-w-4xl">
      <PageHeader
        nuevo
        titulo="Seguimiento de cursada"
        subtitulo="Asistente: si no podés cursar todo, priorizá las materias que más destraban para el año siguiente."
      >
        {seleccionadas.length > 0 && (
          <button onClick={limpiarCursada} className="text-sm text-zinc-500 hover:text-red-600 cursor-pointer">
            Vaciar selección
          </button>
        )}
      </PageHeader>

      {seleccionadas.length === 0 ? (
        <div className="bg-white border border-zinc-200 p-6 rounded-lg">
          <p>No elegiste materias para este cuatrimestre.</p>
          <Link to="/materias" className="text-sm text-itec-700 hover:underline mt-2 inline-block">
            ← Ir al plan y tildar "La curso este cuatri"
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {analisis.map(({ materia, totalDestraba, directas, prioridad }) => {
            const p = PRIORIDADES[prioridad]
            return (
              <li key={materia.id} className={`p-4 rounded-lg border-l-4 ${p.clase}`}>
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <Link to={`/materia/${materia.id}`} className="text-lg font-semibold hover:underline">
                      {materia.nombre_materia}
                    </Link>
                    <p className="text-zinc-500 text-sm">{materia.anio}° año</p>
                  </div>
                  <span className={`${p.badge} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {p.titulo}
                  </span>
                </div>

                <p className="text-sm text-zinc-600 mt-2">{p.detalle}</p>
                <div className="flex justify-between items-center mt-2 text-xs text-zinc-500">
                  <span>
                    Destraba {directas} directa(s) · {totalDestraba} en total
                  </span>
                  <button
                    onClick={() => toggleCursada(materia.id)}
                    className="hover:text-red-600 cursor-pointer"
                  >
                    Quitar
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}
