import { NavLink, useLocation } from "react-router-dom"

// Menú lateral del SITEC.
// Solo "Inscripciones" (Cursar / Ver Inscripciones) y "Estado Cursada" son funcionales;
// el resto se muestra como referencia del sistema real.
const MENU = [
  { titulo: "Mis Datos", icono: "▤", muestra: true },
  {
    titulo: "Inscripciones",
    icono: "👤",
    base: "/inscripciones",
    items: [
      { texto: "Cursar", to: "/inscripciones/cursar" },
      { texto: "Rendir", muestra: true },
      { texto: "Ver Inscripciones", to: "/inscripciones/ver" },
    ],
  },
  {
    titulo: "Estado Cursada",
    icono: "⬡",
    base: ["/estado-cursada", "/materias", "/materia", "/agregar"],
    items: [
      { texto: "Condición", to: "/estado-cursada" },
      { texto: "Plan de Estudio", to: "/materias" },
      { texto: "Cargar plan", to: "/agregar" },
    ],
  },
  { titulo: "Llamado a Examen", icono: "▤", muestra: true },
  { titulo: "Institucional", icono: "▤", muestra: true },
]

const MUESTRA = "Solo muestra del SITEC: no forma parte de este módulo"

const subLink = ({ isActive }) =>
  `block pl-10 pr-4 py-2 text-xs border-b border-sitec-line
  ${isActive ? "bg-sitec-line text-white font-bold" : "text-sitec-text hover:text-white"}`

export default function Sidebar({ abierto, onCerrar }) {
  const { pathname } = useLocation()

  const estaActivo = (base) =>
    [].concat(base ?? []).some((b) => pathname === b || pathname.startsWith(b + "/"))

  return (
    <>
      {abierto && (
        <div onClick={onCerrar} className="fixed inset-0 bg-black/40 z-30 lg:hidden" aria-hidden="true" />
      )}

      <aside
        className={`fixed lg:sticky top-11 left-0 z-40 h-[calc(100vh-2.75rem)] w-44 shrink-0 bg-sitec-side text-sitec-text
          flex flex-col overflow-y-auto transition-transform
          ${abierto ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Foto y nombre del alumno (genérico) */}
        <div className="pt-4 pb-2 border-b border-sitec-line">
          <svg viewBox="0 0 80 80" className="w-24 h-24 mx-auto rounded-full border-2 border-zinc-500" aria-hidden="true">
            <circle cx="40" cy="40" r="40" fill="#f2f2f2" />
            <circle cx="40" cy="31" r="14" fill="#9a9a9a" />
            <path d="M12 72c4-15 15-22 28-22s24 7 28 22" fill="#9a9a9a" />
          </svg>
          <p className="text-[10px] text-right px-3 mt-3 uppercase">Alumno, ITEC</p>
        </div>

        <nav className="flex-1 text-[13px]" onClick={onCerrar}>
          {MENU.map((grupo) => {
            if (grupo.muestra) {
              return (
                <div
                  key={grupo.titulo}
                  title={MUESTRA}
                  className="flex items-center justify-between px-4 py-2.5 bg-sitec-item border-b border-sitec-line opacity-50 cursor-not-allowed"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-4 text-center text-xs">{grupo.icono}</span>
                    {grupo.titulo}
                  </span>
                  <span className="text-[10px]">▾</span>
                </div>
              )
            }

            const activo = estaActivo(grupo.base)
            return (
              <div key={grupo.titulo}>
                <div
                  className={`flex items-center justify-between px-4 py-2.5 border-b border-sitec-line text-white
                    ${activo ? "bg-sitec-rojo" : "bg-sitec-item"}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-4 text-center text-xs">{grupo.icono}</span>
                    {grupo.titulo}
                  </span>
                  <span className="text-[10px]">▸</span>
                </div>
                <div className="bg-sitec-sub">
                  {grupo.items.map((item) =>
                    item.muestra ? (
                      <span
                        key={item.texto}
                        title={MUESTRA}
                        className="block pl-10 pr-4 py-2 text-xs border-b border-sitec-line opacity-50 cursor-not-allowed"
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

        <div className="text-xs mt-6">
          <p title={MUESTRA} className="px-4 py-3 border-t border-sitec-line opacity-50 cursor-not-allowed">Ayuda</p>
          <p title={MUESTRA} className="px-4 py-3 border-t border-sitec-line opacity-50 cursor-not-allowed">Descarga de Archivos</p>
        </div>
      </aside>
    </>
  )
}
