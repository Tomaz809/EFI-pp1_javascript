import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { PlanContext } from "../context/PlanContext"

// Ítems del SITEC que NO forman parte de este módulo: solo se muestran como referencia
const MENU_SITEC_ARRIBA = ["Mis Datos", "Inscripciones"]
const MENU_SITEC_ABAJO = ["Llamado a Examen", "Institucional"]

const TITULO_MUESTRA = "Solo muestra del SITEC: no forma parte de este módulo"

const subLink = ({ isActive }) =>
  `flex items-center justify-between pl-11 pr-4 py-2 text-sm transition-colors
  ${isActive ? "bg-itec-700 text-white font-semibold" : "text-sitec-text hover:text-white hover:bg-white/5"}`

function Contador({ valor, color }) {
  if (!valor) return null
  return <span className={`${color} text-white text-[10px] font-bold px-1.5 py-0.5 rounded`}>{valor}</span>
}

// Ítem del menú original de SITEC, deshabilitado
function ItemMuestra({ texto, borde = false }) {
  return (
    <div
      title={TITULO_MUESTRA}
      aria-disabled="true"
      className={`flex items-center justify-between px-4 py-2.5 text-sm opacity-45 cursor-not-allowed select-none
        ${borde ? "border-t border-sitec-line" : ""}`}
    >
      <span className="flex items-center gap-3">
        <span className="w-4 text-center">▤</span>
        {texto}
      </span>
      <span className="text-[9px] uppercase tracking-wide border border-sitec-text/50 rounded px-1">muestra</span>
    </div>
  )
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
        {/* Perfil del alumno (genérico) */}
        <div className="flex flex-col items-center py-5 border-b border-sitec-line">
          <svg viewBox="0 0 80 80" className="w-20 h-20 rounded-full border-4 border-zinc-500" aria-hidden="true">
            <circle cx="40" cy="40" r="40" fill="#e4e4e7" />
            <circle cx="40" cy="31" r="14" fill="#a1a1aa" />
            <path d="M12 72c4-15 15-22 28-22s24 7 28 22" fill="#a1a1aa" />
          </svg>
          <p className="mt-3 text-xs font-bold text-white tracking-wide">ALUMNO, ITEC</p>
          <p className="text-[10px] text-zinc-400">Tecnicatura en Desarrollo de Software</p>
        </div>

        <nav className="flex-1 py-2">
          {MENU_SITEC_ARRIBA.map((item) => (
            <ItemMuestra key={item} texto={item} />
          ))}

          {/* Módulo desarrollado en el EFI: Estado Cursada */}
          <div className="mt-1 flex items-center justify-between px-4 py-2.5 text-sm bg-itec-700 text-white font-semibold">
            <span className="flex items-center gap-3"><span className="w-4 text-center">📦</span>Estado Cursada</span>
            <span>⌄</span>
          </div>
          <div className="bg-sitec-side-2 py-1 mb-1" onClick={onCerrar}>
            <NavLink to="/" end className={subLink}>
              Inicio del módulo
            </NavLink>
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

          {MENU_SITEC_ABAJO.map((item) => (
            <ItemMuestra key={item} texto={item} />
          ))}

          <p className="mx-4 mt-4 text-[11px] leading-snug text-zinc-400 border border-dashed border-sitec-line rounded p-2">
            Prototipo: solo <strong className="text-white">Estado Cursada</strong> es funcional. El resto del menú
            reproduce el SITEC como referencia.
          </p>
        </nav>

        <div className="mt-4">
          <ItemMuestra texto="Ayuda" borde />
          <ItemMuestra texto="Descarga de Archivos" borde />
        </div>
      </aside>
    </>
  )
}
