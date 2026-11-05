import { useContext } from "react"
import { Link } from "react-router-dom"
import { Menu, Star, User, LogOut } from "lucide-react"
import { PlanContext } from "../context/PlanContext"

// Barra superior del SITEC con iconos profesionales de Lucide
export default function Topbar({ onToggleMenu }) {
  const { favoritas, abrirFavoritos } = useContext(PlanContext)

  return (
    <header className="h-11 bg-sitec-top text-white flex items-stretch justify-between sticky top-0 z-30 border-b border-black/40 shadow-sm">
      <div className="flex items-center gap-3 px-3.5">
        <button
          onClick={onToggleMenu}
          className="lg:hidden w-8 h-8 flex items-center justify-center hover:bg-white/10 cursor-pointer rounded"
          aria-label="Abrir menú"
        >
          <Menu className="w-4 h-4 text-zinc-300" />
        </button>
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo22.png"
            alt="Logo SITEC"
            className="h-6 w-auto object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none"
            }}
          />
          <span className="text-[16px] font-semibold tracking-wider text-zinc-100">SITEC</span>
        </Link>
      </div>

      <div className="flex items-stretch">
        {/* Abre el panel de favoritos sin cambiar de página (Mockup 3) */}
        <button
          onClick={abrirFavoritos}
          className="px-5 sm:px-7 bg-sitec-rojo hover:bg-sitec-rojo-2 text-[14px] font-medium tracking-wide cursor-pointer flex items-center gap-2 transition-colors border-l border-white/10"
        >
          <Star className="w-3.5 h-3.5 fill-white text-white" />
          <span>favoritos</span>
          {favoritas.length > 0 && (
            <span className="bg-white/20 text-white text-xs px-1.5 py-0.2 rounded-full font-bold">
              {favoritas.length}
            </span>
          )}
        </button>

        {/* Botones de la cuenta: estilo SITEC real */}
        <div className="hidden sm:flex items-center gap-2 px-3 text-xs border-l border-white/10" title="Solo muestra del SITEC">
          <span className="border border-sky-500/70 text-sky-300 px-3 py-1 rounded flex items-center gap-1.5 select-none bg-sky-950/20">
            <User className="w-3.5 h-3.5 text-sky-400" />
            <span>Mi Usuario</span>
          </span>
          <span className="border border-sitec-amarillo/70 text-sitec-amarillo px-3 py-1 rounded flex items-center gap-1.5 select-none bg-amber-950/20">
            <LogOut className="w-3.5 h-3.5 text-sitec-amarillo" />
            <span>Salir</span>
          </span>
        </div>
      </div>
    </header>
  )
}
