import { Link } from "react-router-dom"

const ACCESOS = [
  { texto: "Inscripciones Para Cursar", to: "/inscripciones/cursar" },
  { texto: "Estado de Cursada", to: "/estado-cursada" },
  { texto: "Plan de Estudio", to: "/materias" },
]

// Pantalla de bienvenida, como la portada del SITEC
export default function Home() {
  return (
    <main className="text-center pt-10">
      <h1 className="text-5xl text-zinc-800">Bienvenido/a</h1>
      <p className="text-zinc-600 mt-6">
        Módulo de Inscripciones y Correlativas · Tecnicatura Superior en Desarrollo de Software
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-10">
        {ACCESOS.map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="bg-sitec-barra hover:bg-sitec-rojo text-white px-6 py-3 transition-colors"
          >
            {a.texto}
          </Link>
        ))}
      </div>

      <div className="text-xs text-zinc-500 mt-16 space-y-1">
        <p>Campus: ITEC Río Cuarto</p>
        <p>Prototipo desarrollado en el EFI de PP1. Solo las secciones Inscripciones y Estado Cursada son funcionales.</p>
      </div>
    </main>
  )
}
