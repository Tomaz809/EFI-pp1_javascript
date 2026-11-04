import { useContext } from "react"
import { Link } from "react-router-dom"
import { PlanContext } from "../context/PlanContext"

// Barra superior del SITEC
export default function Topbar({ onToggleMenu }) {
  const { favoritas, abrirFavoritos } = useContext(PlanContext)

  return (
    <header className="h-11 bg-sitec-top text-white flex items-stretch justify-between sticky top-0 z-30 border-b border-black/40">
      <div className="flex items-center gap-2 px-3">
        <button
          onClick={onToggleMenu}
          className="lg:hidden w-8 h-8 flex items-center justify-center hover:bg-white/10 cursor-pointer"
          aria-label="Abrir menú"
        >
          ☰
        </button>
        <Link to="/" className="flex items-center gap-2">
          <svg viewBox="0 0 24 20" className="w-6 h-5 bg-zinc-200 rounded-sm p-0.5" aria-hidden="true">
            <rect x="3" y="10" width="4" height="8" fill="#7b1e1e" />
            <rect x="10" y="5" width="4" height="13" fill="#555" />
            <rect x="17" y="2" width="4" height="16" fill="#7b1e1e" />
          </svg>
          <span className="text-[15px]">SITEC</span>
        </Link>
      </div>

      <div className="flex items-stretch">
        {/* Abre el panel de favoritos sin cambiar de página */}
        <button
          onClick={abrirFavoritos}
          className="px-4 sm:px-6 bg-sitec-rojo hover:bg-sitec-rojo-2 text-[15px] cursor-pointer whitespace-nowrap"
        >
          favoritos{favoritas.length > 0 && ` (${favoritas.length})`}
        </button>

        {/* Botones de la cuenta: solo de muestra */}
        <div className="hidden sm:flex items-center gap-1 px-3 text-xs" title="Solo muestra del SITEC">
          <span className="border border-sky-600 text-sky-400 px-3 py-1 rounded-sm cursor-not-allowed">
            👤 Mi Usuario
          </span>
          <span className="border border-sitec-amarillo text-sitec-amarillo px-3 py-1 rounded-sm cursor-not-allowed">
            ➜ Salir
          </span>
        </div>
      </div>
    </header>
  )
}
