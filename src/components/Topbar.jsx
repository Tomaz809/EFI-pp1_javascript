import { Link } from "react-router-dom"

// Barra superior oscura como la del SITEC
export default function Topbar({ onToggleMenu }) {
  return (
    <header className="h-12 bg-sitec-top text-white flex items-center justify-between px-3 shadow-md sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMenu}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded hover:bg-white/10 cursor-pointer"
          aria-label="Abrir menú"
        >
          ☰
        </button>
        <Link to="/" className="flex items-center gap-2">
          <span className="w-7 h-7 border border-white/40 rounded-sm flex items-center justify-center text-xs">
            📊
          </span>
          <span className="text-lg font-bold tracking-wide">SITEC</span>
        </Link>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="hidden sm:flex items-center gap-1 bg-sky-700 px-3 py-1.5 rounded">
          👤 Mi Usuario
        </span>
        <span className="flex items-center gap-1 border border-amber-500 text-amber-400 px-3 py-1.5 rounded">
          ⏻ Salir
        </span>
      </div>
    </header>
  )
}
