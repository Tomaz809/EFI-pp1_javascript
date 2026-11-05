import { NavLink, useLocation } from "react-router-dom"
import {
  FileText,
  UserCheck,
  Layers,
  Award,
  Building,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  DownloadCloud,
} from "lucide-react"

// Menú lateral del SITEC (ITEC Río Cuarto) con iconos modernos de Lucide
const MENU = [
  { titulo: "Mis Datos", Icono: FileText, muestra: true },
  {
    titulo: "Inscripciones",
    Icono: UserCheck,
    base: "/inscripciones",
    items: [
      { texto: "Cursar", to: "/inscripciones/cursar" },
      { texto: "Rendir", muestra: true },
      { texto: "Ver Inscripciones", to: "/inscripciones/ver" },
    ],
  },
  {
    titulo: "Estado Cursada",
    Icono: Layers,
    base: ["/estado-cursada", "/materias", "/materia", "/agregar"],
    items: [
      { texto: "Condición", to: "/estado-cursada" },
      { texto: "Plan de Estudio", to: "/materias" },
      { texto: "Cargar plan", to: "/agregar" },
    ],
  },
  { titulo: "LLamado a Examen", Icono: Award, muestra: true },
  { titulo: "Institucional", Icono: Building, muestra: true },
]

const MUESTRA = "Solo muestra del SITEC: no forma parte de este módulo"

const subLink = ({ isActive }) =>
  `block pl-9 pr-4 py-2 text-xs border-b border-sitec-line transition-colors ${
    isActive
      ? "bg-sitec-rojo text-white font-bold tracking-wide"
      : "text-sitec-text hover:text-white hover:bg-sitec-line/40"
  }`

export default function Sidebar({ abierto, onCerrar }) {
  const { pathname } = useLocation()

  const estaActivo = (base) =>
    [].concat(base ?? []).some((b) => pathname === b || pathname.startsWith(b + "/"))

  return (
    <>
      {abierto && (
        <div
          onClick={onCerrar}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-xs"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:sticky top-11 left-0 z-40 h-[calc(100vh-2.75rem)] w-48 shrink-0 bg-sitec-side text-sitec-text
          flex flex-col overflow-y-auto transition-transform duration-200 select-none
          ${abierto ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Foto y datos del alumno (estilo SITEC oficial) */}
        <div className="pt-4 pb-3 border-b border-sitec-line text-center">
          <div className="relative inline-block">
            <svg
              viewBox="0 0 80 80"
              className="w-20 h-20 mx-auto rounded-full border border-zinc-500/60 shadow-inner bg-zinc-200"
              aria-hidden="true"
            >
              <circle cx="40" cy="40" r="40" fill="#e5e7eb" />
              <circle cx="40" cy="30" r="14" fill="#9ca3af" />
              <path d="M14 70c4-14 15-20 26-20s22 6 26 20" fill="#9ca3af" />
            </svg>
          </div>
          <p className="text-[11px] font-semibold text-zinc-300 mt-2 px-3 uppercase tracking-wider">
            ALUMNO, ITEC
          </p>
          <p className="text-[9px] text-zinc-400">Desarrollo de Software</p>
        </div>

        {/* Navegación lateral */}
        <nav className="flex-1 text-[13px]" onClick={onCerrar}>
          {MENU.map((grupo) => {
            const IconoGrupo = grupo.Icono

            if (grupo.muestra) {
              return (
                <div
                  key={grupo.titulo}
                  title={MUESTRA}
                  className="flex items-center justify-between px-3.5 py-2.5 bg-sitec-item border-b border-sitec-line opacity-60 cursor-not-allowed hover:bg-sitec-item/80"
                >
                  <span className="flex items-center gap-2.5">
                    <IconoGrupo className="w-3.5 h-3.5 opacity-75 shrink-0" />
                    <span className="text-[12px]">{grupo.titulo}</span>
                  </span>
                  <ChevronDown className="w-3 h-3 text-zinc-400 opacity-60" />
                </div>
              )
            }

            const activo = estaActivo(grupo.base)
            return (
              <div key={grupo.titulo}>
                <div
                  className={`flex items-center justify-between px-3.5 py-2.5 border-b border-sitec-line text-white transition-colors
                    ${activo ? "bg-sitec-rojo font-medium" : "bg-sitec-item"}`}
                >
                  <span className="flex items-center gap-2.5">
                    <IconoGrupo className="w-3.5 h-3.5 shrink-0 text-zinc-200" />
                    <span className="text-[12px]">{grupo.titulo}</span>
                  </span>
                  {activo ? (
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-200" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  )}
                </div>
                <div className="bg-sitec-sub">
                  {grupo.items.map((item) =>
                    item.muestra ? (
                      <span
                        key={item.texto}
                        title={MUESTRA}
                        className="block pl-9 pr-4 py-2 text-xs border-b border-sitec-line opacity-50 cursor-not-allowed"
                      >
                        {item.texto}
                      </span>
                    ) : (
                      <NavLink key={item.texto} to={item.to} className={subLink}>
                        {item.texto}
                      </NavLink>
                    )
                  )}
                </div>
              </div>
            )
          })}
        </nav>

        {/* Institucional ITEC (Logo oficial en el pie del menú) */}
        <div className="p-3 border-t border-sitec-line bg-black/20 flex items-center justify-center gap-2.5">
          <img
            src="/iteclogo.jpg"
            alt="ITEC Río Cuarto"
            className="h-7 w-auto object-contain rounded opacity-85"
            onError={(e) => {
              e.currentTarget.style.display = "none"
            }}
          />
          <div className="text-[10px] leading-tight text-zinc-400">
            <span className="font-semibold text-zinc-300">ITEC Río Cuarto</span>
            <br />
            <span>Gestión Académica</span>
          </div>
        </div>

        {/* Enlaces de ayuda y archivos */}
        <div className="text-[11px] border-t border-sitec-line bg-sitec-side">
          <p
            title={MUESTRA}
            className="px-4 py-2 border-b border-sitec-line opacity-50 cursor-not-allowed hover:text-white flex items-center gap-2"
          >
            <HelpCircle className="w-3 h-3 text-zinc-400" />
            <span>Ayuda</span>
          </p>
          <p
            title={MUESTRA}
            className="px-4 py-2 opacity-50 cursor-not-allowed hover:text-white flex items-center gap-2"
          >
            <DownloadCloud className="w-3 h-3 text-zinc-400" />
            <span>Descarga de Archivos</span>
          </p>
        </div>
      </aside>
    </>
  )
}
