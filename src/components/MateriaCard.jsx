import { useContext } from "react"
import { Link } from "react-router-dom"
import { PlanContext } from "../context/PlanContext"

// Estilos según el estado de la materia en Modo Enfoque
const ESTILOS_ESTADO = {
  normal: "bg-zinc-800 border-zinc-700",
  enfocada: "bg-blue-950 border-blue-500 ring-2 ring-blue-500 scale-[1.02]",
  previa: "bg-amber-950/60 border-amber-500",
  destraba: "bg-emerald-950/60 border-emerald-500",
  apagada: "bg-zinc-800 border-zinc-800 opacity-30 grayscale",
}

const ETIQUETA_ESTADO = {
  previa: { texto: "Previa", clase: "bg-amber-500 text-zinc-950" },
  destraba: { texto: "Destraba", clase: "bg-emerald-500 text-zinc-950" },
}

export default function MateriaCard({ materia, estado = "normal", esCuello = false }) {
  const { favoritas, cursada, enfocada, toggleFavorita, toggleCursada, enfocar } =
    useContext(PlanContext)

  const esFavorita = favoritas.includes(materia.id)
  const enCursada = cursada.includes(materia.id)
  const etiqueta = ETIQUETA_ESTADO[estado]

  return (
    <article
      className={`relative p-4 rounded-lg border-2 transition-all duration-300
        ${ESTILOS_ESTADO[estado]}
        ${esFavorita && estado !== "apagada" ? "shadow-lg shadow-violet-600/40 outline-2 outline-violet-500" : ""}`}
    >
      <div className="flex justify-between items-start gap-2">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={enfocada === materia.id}
            onChange={() => enfocar(materia.id)}
            className="mt-1 accent-blue-500 cursor-pointer"
            aria-label={`Enfocar ${materia.nombre_materia}`}
          />
          <span className="font-semibold leading-tight">{materia.nombre_materia}</span>
        </label>

        <button
          onClick={() => toggleFavorita(materia.id)}
          className={`text-xl leading-none cursor-pointer transition-colors
            ${esFavorita ? "text-violet-400" : "text-zinc-500 hover:text-violet-400"}`}
          aria-label={esFavorita ? "Quitar de favoritas" : "Marcar como favorita"}
          title={esFavorita ? "Quitar de favoritas" : "Marcar como favorita"}
        >
          {esFavorita ? "★" : "☆"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3 text-xs">
        <span className="bg-zinc-700 px-2 py-0.5 rounded">{materia.anio}° año</span>
        <span className="bg-zinc-700 px-2 py-0.5 rounded">
          {materia.cuatrimestral ? "Cuatrimestral" : "Anual"}
        </span>
        {etiqueta && (
          <span className={`px-2 py-0.5 rounded font-bold ${etiqueta.clase}`}>{etiqueta.texto}</span>
        )}
        {esCuello && (
          <span className="px-2 py-0.5 rounded font-bold bg-rose-600 text-white">Cursar sí o sí</span>
        )}
      </div>

      <div className="flex justify-between items-center mt-4 text-sm">
        <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
          <input
            type="checkbox"
            checked={enCursada}
            onChange={() => toggleCursada(materia.id)}
            className="accent-rose-500 cursor-pointer"
          />
          La curso este cuatri
        </label>

        <Link to={`/materia/${materia.id}`} className="text-indigo-400 hover:underline">
          Detalle →
        </Link>
      </div>
    </article>
  )
}
