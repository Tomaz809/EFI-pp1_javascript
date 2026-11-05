import { Link } from "react-router-dom"

const ACCESOS = [
  { texto: "Inscripciones Para Cursar", to: "/inscripciones/cursar", desc: "Inscribite a materias con control de correlativas" },
  { texto: "Estado de Cursada", to: "/estado-cursada", desc: "Consultá tu condición y simulá carga de notas" },
  { texto: "Plan de Estudio", to: "/materias", desc: "Explorá el mapa de materias y dependencias" },
]

// Pantalla de bienvenida institucional del SITEC (ITEC Río Cuarto)
export default function Home() {
  return (
    <main className="max-w-3xl mx-auto pt-6 text-center">
      {/* Encabezado con logos institucionales */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <img
          src="/iteclogo.jpg"
          alt="ITEC Río Cuarto"
          className="h-14 sm:h-16 w-auto object-contain rounded shadow-xs"
          onError={(e) => {
            e.currentTarget.style.display = "none"
          }}
        />
        <img
          src="/logo22.png"
          alt="SITEC"
          className="h-12 sm:h-14 w-auto object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none"
          }}
        />
      </div>

      <div className="bg-white p-8 sm:p-10 shadow-sm border border-zinc-200">
        <span className="text-xs font-semibold tracking-wider uppercase text-zinc-500 bg-zinc-100 px-3 py-1 rounded">
          Sistema de Autogestión Académica
        </span>
        <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-800 mt-4">Bienvenido/a al SITEC</h1>
        <p className="text-zinc-600 mt-2 text-base">
          Módulo de Inscripciones y Planificación de Correlatividades
        </p>
        <p className="text-xs text-zinc-500 font-medium mt-1">
          Tecnicatura Superior en Desarrollo de Software · ITEC Río Cuarto
        </p>

        {/* Accesos rápidos a los módulos funcionales */}
        <div className="grid sm:grid-cols-3 gap-4 mt-8 text-left">
          {ACCESOS.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="group block p-4 bg-sitec-barra text-white transition-all duration-150 hover:bg-sitec-rojo shadow-xs hover:shadow-md"
            >
              <p className="text-[15px] font-semibold flex items-center justify-between">
                <span>{a.texto}</span>
                <span className="opacity-70 group-hover:translate-x-1 transition-transform">➔</span>
              </p>
              <p className="text-[12px] text-zinc-300 group-hover:text-zinc-100 mt-1 leading-snug">
                {a.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="text-xs text-zinc-500 mt-8 space-y-1">
        <p>Instituto Técnico de Río Cuarto (ITEC) — Ciclo Lectivo 2026</p>
        <p className="opacity-80">
          Desarrollado para el Examen Final Integrador (EFI) de Práctica Profesionalizante 1.
        </p>
      </div>
    </main>
  )
}
