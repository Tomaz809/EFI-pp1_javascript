import { useContext } from "react"
import { Link } from "react-router-dom"
import { PlanContext } from "../context/PlanContext"

// Estilos según el estado de la materia en Modo Enfoque
const ESTILOS_ESTADO = {
  normal: "bg-white border-zinc-200",
  enfocada: "bg-white border-sky-600 ring-2 ring-sky-500/40",
  previa: "bg-amber-50 border-amber-400",
  destraba: "bg-emerald-50 border-emerald-500",
  apagada: "bg-white border-zinc-200 opacity-35 grayscale",
}

const BADGE_ESTADO = {
  enfocada: { texto: "◎ Enfocada", clase: "bg-sky-50 text-sky-700 border-sky-300" },
  previa: { texto: "Previa", clase: "bg-amber-100 text-amber-800 border-amber-300" },
  destraba: { texto: "Destraba", clase: "bg-emerald-100 text-emerald-800 border-emerald-300" },
}

export default function MateriaCard({ materia, estado = "normal", esCuello = false, previas, destraba }) {
  const { favoritas, cursada, enfocada, toggleFavorita, toggleCursada, enfocar } =
    useContext(PlanContext)

  const esFavorita = favoritas.includes(materia.id)
  const enCursada = cursada.includes(materia.id)
  const badge = BADGE_ESTADO[estado]

  return (
    <article
      className={`flex flex-col rounded-lg border shadow-sm transition-all duration-300
        ${ESTILOS_ESTADO[estado]}
        ${esFavorita ? "border-t-4 border-t-violet-500" : ""}`}
    >
      <div className="p-4 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] text-zinc-500 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded">
            Cód. {materia.codigo}
          </span>
          <div className="flex items-center gap-1.5">
            {badge && (
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${badge.clase}`}>
                {badge.texto}
              </span>
            )}
            {esCuello && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full border bg-itec-50 text-itec-700 border-itec-200">
                Cursar sí o sí
              </span>
            )}
            <button
              onClick={() => toggleFavorita(materia.id)}
              className={`text-lg leading-none cursor-pointer transition-colors
                ${esFavorita ? "text-violet-600" : "text-zinc-300 hover:text-violet-500"}`}
              aria-label={esFavorita ? "Quitar de favoritas" : "Marcar como favorita"}
              title={esFavorita ? "Quitar de favoritas" : "Marcar como favorita"}
            >
              {esFavorita ? "★" : "☆"}
            </button>
          </div>
        </div>

        <h3 className="font-bold text-zinc-800 mt-3 leading-snug">{materia.nombre_materia}</h3>
        <p className="text-xs text-zinc-500 mt-0.5">
          {materia.anio}° año · {materia.cuatrimestral ? "Cuatrimestral" : "Anual"}
        </p>

        {previas && (
          <div className="mt-3 space-y-1 text-xs text-zinc-600">
            <p>
              <span className="font-semibold">Para cursar:</span>{" "}
              {previas.length > 0 ? previas.join(", ") : <em className="text-zinc-400">Sin correlativas</em>}
            </p>
            {destraba !== undefined && (
              <p>
                <span className="font-semibold">Destraba:</span>{" "}
                {destraba > 0 ? `${destraba} materia(s)` : <em className="text-zinc-400">Ninguna</em>}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-t border-zinc-200/80 text-xs">
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer text-sky-700 font-semibold">
            <input
              type="checkbox"
              checked={enfocada === materia.id}
              onChange={() => enfocar(materia.id)}
              className="accent-sky-600 cursor-pointer"
              aria-label={`Enfocar ${materia.nombre_materia}`}
            />
            Enfocar
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-itec-700 font-semibold">
            <input
              type="checkbox"
              checked={enCursada}
              onChange={() => toggleCursada(materia.id)}
              className="accent-itec-700 cursor-pointer"
            />
            La curso este cuatri
          </label>
        </div>

        <Link to={`/materia/${materia.id}`} className="text-zinc-500 hover:text-itec-700">
          👁 Detalle
        </Link>
      </div>
    </article>
  )
}
