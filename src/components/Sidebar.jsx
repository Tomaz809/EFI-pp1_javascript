import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { PlanContext } from "../context/PlanContext"

// Ítems del SITEC que no forman parte de este módulo (solo se muestran)
const MENU_SITEC = ["Mis Datos", "Inscripciones", "Llamado a Examen", "Institucional"]

const subLink = ({ isActive }) =>
  `flex items-center justify-between pl-11 pr-4 py-2 text-sm transition-colors
  ${isActive ? "bg-itec-700 text-white font-semibold" : "text-sitec-text hover:text-white hover:bg-white/5"}`

function Contador({ valor, color }) {
  if (!valor) return null
  return <span className={`${color} text-white text-[10px] font-bold px-1.5 py-0.5 rounded`}>{valor}</span>
}

export default function Sidebar({ abierto, onCerrar }) {
  const { favoritas, cursada } = useContext(PlanContext)

  return (
    <>
      {/* Fondo oscuro al abrir el menú en celular */}
      {abierto && (
        <div onClick={onCerrar} className="fixed inset-0 bg-black/40 z-30 lg:hidden" aria-hidden="true" />
      )}

      <aside
        className={`fixed lg:sticky top-12 left-0 z-40 h-[calc(100vh-3rem)] w-60 shrink-0 bg-sitec-side text-sitec-text
          flex flex-col overflow-y-auto transition-transform
          ${abierto ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Perfil del alumno */}
        <div className="flex flex-col items-center py-5 border-b border-sitec-line">
          <svg viewBox="0 0 80 80" className="w-20 h-20 rounded-full border-4 border-zinc-500" aria-hidden="true">
            <circle cx="40" cy="40" r="40" fill="#e4e4e7" />
            <circle cx="40" cy="31" r="14" fill="#a1a1aa" />
            <path d="M12 72c4-15 15-22 28-22s24 7 28 22" fill="#a1a1aa" />
          </svg>
          <p className="mt-3 text-xs font-bold text-white tracking-wide">ALUMNO, ITEC</p>
          <p className="text-[10px] text-zinc-400">Tecnicatura en Desarrollo de Software</p>
        </div>

        <nav className="flex-1 py-2" onClick={onCerrar}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 text-sm ${isActive ? "bg-itec-700 text-white" : "hover:text-white hover:bg-white/5"}`
            }
          >
            <span className="w-4 text-center">🏠</span> Inicio
          </NavLink>

          {MENU_SITEC.slice(0, 2).map((item) => (
            <div key={item} className="flex items-center justify-between px-4 py-2.5 text-sm opacity-70" title="Disponible en SITEC">
              <span className="flex items-center gap-3"><span className="w-4 text-center">▤</span>{item}</span>
              <span>›</span>
            </div>
          ))}

          {/* Módulo nuevo: Estado Cursada */}
          <div className="flex items-center justify-between px-4 py-2.5 text-sm bg-itec-700 text-white font-semibold">
            <span className="flex items-center gap-3"><span className="w-4 text-center">📦</span>Estado Cursada</span>
            <span>⌄</span>
          </div>
          <div className="bg-sitec-side-2 py-1">
            <NavLink to="/cursada" className={subLink}>
              Seguimiento de cursada <Contador valor={cursada.length} color="bg-sky-700" />
            </NavLink>
            <NavLink to="/materias" className={subLink}>
              <span>✦ Plan de Estudio</span>
              <span className="bg-itec-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NUEVO</span>
            </NavLink>
            <NavLink to="/favoritos" className={subLink}>
              Materias favoritas <Contador valor={favoritas.length} color="bg-violet-600" />
            </NavLink>
            <NavLink to="/agregar" className={subLink}>
              Cargar plan
            </NavLink>
          </div>

          {MENU_SITEC.slice(2).map((item) => (
            <div key={item} className="flex items-center justify-between px-4 py-2.5 text-sm opacity-70" title="Disponible en SITEC">
              <span className="flex items-center gap-3"><span className="w-4 text-center">▤</span>{item}</span>
              <span>›</span>
            </div>
          ))}
        </nav>

        <div className="border-t border-sitec-line text-sm">
          <p className="px-4 py-3 opacity-70">Ayuda</p>
          <p className="px-4 py-3 opacity-70 border-t border-sitec-line">Descarga de Archivos</p>
        </div>
      </aside>
    </>
  )
}
