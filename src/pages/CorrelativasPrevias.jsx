import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import ListaMaterias from "../components/ListaMaterias"
import { deleteCorrelativa } from "../services/api"
import { previasDe } from "../utils/correlativas"

// Subruta index de /materia/:id
export default function CorrelativasPrevias() {
  const { materia, plan, recargar } = useOutletContext()
  const [error, setError] = useState(null)

  // Las directas vienen de la API (GET /materias/:id -> correlativas)
  const directas = materia.correlativas ?? []
  const idsDirectas = new Set(directas.map((m) => m.id))

  // Las indirectas se calculan con el grafo (previas de las previas)
  const indirectas = plan.materias.filter(
    (m) => previasDe(materia.id, plan.grafo).has(m.id) && !idsDirectas.has(m.id)
  )

  const quitar = async (previa) => {
    setError(null)
    try {
      await deleteCorrelativa(materia.id, previa.id)
      recargar()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {error && <p className="text-sm text-red-400">{error}</p>}

      <section>
        <h2 className="font-bold mb-2">Directas</h2>
        <ListaMaterias
          materias={directas}
          color="border-amber-500"
          vacio="No tiene correlativas: se puede cursar sin requisitos."
          accion={(previa) => (
            <button
              onClick={() => quitar(previa)}
              className="text-zinc-400 hover:text-red-400 text-sm cursor-pointer"
              aria-label={`Quitar correlativa ${previa.nombre_materia}`}
              title="Quitar esta correlativa"
            >
              ✕
            </button>
          )}
        />
      </section>

      {indirectas.length > 0 && (
        <section>
          <h2 className="font-bold mb-2">Indirectas (previas de las previas)</h2>
          <ListaMaterias materias={indirectas} color="border-amber-800" />
        </section>
      )}
    </div>
  )
}
