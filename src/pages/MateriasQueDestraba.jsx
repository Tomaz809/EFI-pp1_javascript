import { useOutletContext } from "react-router-dom"
import ListaMaterias from "../components/ListaMaterias"
import Loader from "../components/Loader"
import { destrabaDe } from "../utils/correlativas"

// Subruta /materia/:id/destraba
export default function MateriasQueDestraba() {
  const { materia, plan } = useOutletContext()

  if (plan.loading) return <Loader />

  const directas = plan.grafo.habilita[materia.id] ?? []
  const todas = destrabaDe(materia.id, plan.grafo)

  const materiasDirectas = plan.materias.filter((m) => directas.includes(m.id))
  const materiasIndirectas = plan.materias.filter((m) => todas.has(m.id) && !directas.includes(m.id))

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-zinc-500">
        Aprobar esta materia destraba <strong className="text-zinc-800">{todas.size}</strong>{" "}
        materia(s) en total.
      </p>

      <section>
        <h2 className="text-sm text-zinc-600 mb-2">Directamente</h2>
        <ListaMaterias
          materias={materiasDirectas}
          color="bg-sitec-gris text-white"
          vacio="No es correlativa de ninguna materia."
        />
      </section>

      {materiasIndirectas.length > 0 && (
        <section>
          <h2 className="text-sm text-zinc-600 mb-2">Más adelante (en cadena)</h2>
          <ListaMaterias materias={materiasIndirectas} color="bg-zinc-200 text-zinc-800" />
        </section>
      )}
    </div>
  )
}
