import { useContext } from "react"
import { Link } from "react-router-dom"
import { PlanContext } from "../context/PlanContext"

const FUNCIONES = [
  {
    titulo: "Modo Enfoque",
    texto: "Tildá cualquier materia y se apaga el resto: quedan encendidas sus correlativas previas y las materias que destraba.",
    color: "border-blue-500",
    link: "/materias",
  },
  {
    titulo: "Materias favoritas",
    texto: "Marcá con ★ las materias que son tu objetivo y se destacan en violeta en toda la app.",
    color: "border-violet-500",
    link: "/favoritos",
  },
  {
    titulo: "Asistente de cursada",
    texto: "Elegí las materias que vas a cursar este cuatri y te decimos cuál conviene cursar sí o sí porque es cuello de botella.",
    color: "border-rose-500",
    link: "/cursada",
  },
]

export default function Home() {
  const { favoritas, cursada } = useContext(PlanContext)

  return (
    <main className="flex-1 flex flex-col items-center px-4 pt-16">
      <h1 className="text-4xl md:text-5xl text-center font-extrabold text-blue-500 mb-4">
        Planificá tu carrera en el ITEC
      </h1>
      <p className="text-zinc-400 text-center max-w-2xl mb-8">
        Mirá todo el plan de estudios de 1° a 3° año, entendé qué correlativas necesitás y decidí
        qué materias te conviene cursar este cuatrimestre.
      </p>

      <Link
        to="/materias"
        className="bg-blue-600 hover:bg-blue-500 font-bold px-6 py-3 rounded-lg transition-colors"
      >
        Ver plan de estudios
      </Link>

      <div className="flex gap-4 mt-6 text-sm text-zinc-400">
        <span>★ {favoritas.length} favoritas</span>
        <span>· {cursada.length} materias en tu cursada</span>
      </div>

      <section className="grid md:grid-cols-3 gap-6 max-w-5xl w-full mt-14">
        {FUNCIONES.map((f) => (
          <Link
            key={f.titulo}
            to={f.link}
            className={`bg-zinc-800 p-6 rounded-lg border-t-4 ${f.color} hover:bg-zinc-700 transition-colors`}
          >
            <h2 className="text-xl font-bold mb-2">{f.titulo}</h2>
            <p className="text-zinc-400 text-sm">{f.texto}</p>
          </Link>
        ))}
      </section>
    </main>
  )
}
