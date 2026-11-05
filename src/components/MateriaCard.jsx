import { useContext } from "react"
import { Link } from "react-router-dom"
import { Star, ArrowRight } from "lucide-react"
import { PlanContext } from "../context/PlanContext"

// Colores en Modo Enfoque: bordó = elegida, amarillo = previas, gris = las que destraba
const ESTILOS_ESTADO = {
  normal: "bg-sitec-barra text-white shadow-xs",
  enfocada: "bg-sitec-rojo text-white shadow-md ring-2 ring-sitec-rojo-2",
  previa: "bg-sitec-amarillo text-zinc-900 shadow-xs font-medium",
  destraba: "bg-sitec-gris text-white shadow-xs",
  apagada: "bg-zinc-200 text-zinc-400 opacity-60",
}

export default function MateriaCard({ materia, estado = "normal", previas = [] }) {
  const { favoritas, enfocada, toggleFavorita, enfocar } = useContext(PlanContext)

  const esFavorita = favoritas.includes(materia.id)
  const claro = estado === "previa" || estado === "apagada"
  const textoSecundario =
    estado === "previa"
      ? "text-zinc-800"
      : estado === "apagada"
        ? "text-zinc-400"
        : "text-zinc-300"

  return (
    <article className={`flex flex-col transition-all duration-200 ${ESTILOS_ESTADO[estado]}`}>
      <div className="px-5 pt-4 pb-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[16px] leading-snug font-medium">{materia.nombre_materia}</p>
          <button
            onClick={() => toggleFavorita(materia.id)}
            className="cursor-pointer transition-transform hover:scale-110"
            aria-label={esFavorita ? "Quitar de favoritos" : "Agregar a favoritos"}
            title={esFavorita ? "Materia prioritaria (marcada)" : "Marcar como prioritaria"}
          >
            <Star
              className={`w-5 h-5 transition-colors ${
                esFavorita
                  ? "fill-amber-400 text-amber-400"
                  : "text-zinc-500 hover:text-zinc-300 fill-transparent"
              }`}
            />
          </button>
        </div>
        <p className={`text-xs mt-1 ${textoSecundario}`}>
          Cód. {materia.codigo} · {materia.anio}° año · {materia.cuatrimestral ? "Cuatrimestral" : "Anual"}
        </p>
        <p className={`text-xs mt-2 ${textoSecundario}`}>
          Correlativas: {previas.length > 0 ? previas.join(", ") : "—"}
        </p>
      </div>

      <div
        className={`flex items-center justify-between px-5 py-2 text-xs border-t ${
          claro ? "border-black/15" : "border-white/10"
        }`}
      >
        <label className="flex items-center gap-1.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={enfocada === materia.id}
            onChange={() => enfocar(materia.id)}
            className="cursor-pointer accent-zinc-700"
            aria-label={`Enfocar ${materia.nombre_materia}`}
          />
          Ver correlativas
        </label>
        <Link to={`/materia/${materia.id}`} className="hover:underline font-medium flex items-center gap-1">
          <span>Detalle</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  )
}
