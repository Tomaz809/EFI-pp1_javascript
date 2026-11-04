import { useContext } from "react"
import { Link } from "react-router-dom"
import { PlanContext } from "../context/PlanContext"

// Colores en Modo Enfoque: bordó = elegida, amarillo = previas, gris = las que destraba
const ESTILOS_ESTADO = {
  normal: "bg-sitec-barra text-white",
  enfocada: "bg-sitec-rojo text-white",
  previa: "bg-sitec-amarillo text-zinc-900",
  destraba: "bg-sitec-gris text-white",
  apagada: "bg-zinc-200 text-zinc-400",
}

export default function MateriaCard({ materia, estado = "normal", previas = [] }) {
  const { favoritas, enfocada, toggleFavorita, enfocar } = useContext(PlanContext)

  const esFavorita = favoritas.includes(materia.id)
  const claro = estado === "previa" || estado === "apagada"
  // Color del texto secundario según el fondo
  const textoSecundario = estado === "previa" ? "text-zinc-800" : estado === "apagada" ? "text-zinc-400" : "text-zinc-300"

  return (
    <article className={`flex flex-col transition-all duration-300 ${ESTILOS_ESTADO[estado]}`}>
      <div className="px-5 pt-4 pb-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[16px] leading-snug">{materia.nombre_materia}</p>
          <button
            onClick={() => toggleFavorita(materia.id)}
            className={`text-2xl leading-none cursor-pointer
              ${esFavorita ? (claro ? "text-zinc-700" : "text-white") : claro ? "text-zinc-400/60" : "text-zinc-500 hover:text-zinc-300"}`}
            aria-label={esFavorita ? "Quitar de favoritos" : "Agregar a favoritos"}
            title={esFavorita ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            ★
          </button>
        </div>
        <p className={`text-xs mt-1 ${textoSecundario}`}>
          Cód. {materia.codigo} · {materia.anio}° año · {materia.cuatrimestral ? "Cuatrimestral" : "Anual"}
        </p>
        <p className={`text-xs mt-2 ${textoSecundario}`}>
          Correlativas: {previas.length > 0 ? previas.join(", ") : "—"}
        </p>
      </div>

      <div className={`flex items-center justify-between px-5 py-2 text-xs border-t ${claro ? "border-black/15" : "border-white/10"}`}>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={enfocada === materia.id}
            onChange={() => enfocar(materia.id)}
            className="cursor-pointer accent-zinc-600"
            aria-label={`Enfocar ${materia.nombre_materia}`}
          />
          Ver correlativas
        </label>
        <Link to={`/materia/${materia.id}`} className="hover:underline">
          Detalle
        </Link>
      </div>
    </article>
  )
}
