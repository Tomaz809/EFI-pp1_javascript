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
      <p className="text-sm text-zinc-400">
        Aprobar esta materia destraba <strong className="text-emerald-400">{todas.size}</strong>{" "}
        materia(s) en total.
      </p>

      <section>
        <h2 className="font-bold mb-2">Directamente</h2>
        <ListaMaterias
          materias={materiasDirectas}
          color="border-emerald-500"
          vacio="No es correlativa de ninguna materia."
        />
      </section>

      {materiasIndirectas.length > 0 && (
        <section>
          <h2 className="font-bold mb-2">Más adelante (en cadena)</h2>
          <ListaMaterias materias={materiasIndirectas} color="border-emerald-800" />
        </section>
      )}
    </div>
  )
}
