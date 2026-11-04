import { useContext } from "react"
import { Link } from "react-router-dom"
import PageHeader from "../components/PageHeader"
import { PlanContext } from "../context/PlanContext"

const FUNCIONES = [
  {
    icono: "◎",
    titulo: "Modo Enfoque",
    texto: "Tildá Enfocar en cualquier materia y se atenúa el resto: quedan resaltadas sus correlativas previas y las materias que destraba.",
    color: "border-t-sky-600",
    link: "/materias",
    accion: "Ver plan de estudio",
  },
  {
    icono: "★",
    titulo: "Materias favoritas",
    texto: "Marcá con ★ las materias que son tu objetivo. Se destacan en toda la app y te mostramos el camino de previas para llegar.",
    color: "border-t-violet-600",
    link: "/favoritos",
    accion: "Ver favoritas",
  },
  {
    icono: "⏱",
    titulo: "Seguimiento de cursada",
    texto: "Elegí las materias que vas a cursar este cuatrimestre y te indicamos cuál cursar sí o sí porque es cuello de botella.",
    color: "border-t-itec-700",
    link: "/cursada",
    accion: "Abrir asistente",
  },
]

export default function Home() {
  const { favoritas, cursada } = useContext(PlanContext)

  return (
    <main>
      <PageHeader
        nuevo
        titulo="Bienvenido al módulo Plan de Estudio"
        subtitulo="Consultá el plan de la Tecnicatura Superior en Desarrollo de Software, sus correlativas y planificá tu cursada."
      />

      <section className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-xl font-bold text-zinc-800">¿Qué materias puedo cursar y cuáles me conviene priorizar?</h2>
          <p className="text-sm text-zinc-600 mt-2">
            Este módulo muestra el diseño curricular completo de 1° a 3° año con su régimen de
            correlatividades, para que cada alumno pueda ver de un vistazo qué necesita aprobar antes
            y qué materias se le destraban.
          </p>
          <p className="text-xs text-zinc-500 mt-3">
            ★ {favoritas.length} favoritas · {cursada.length} materias en tu cursada
          </p>
        </div>
        <Link
          to="/materias"
          className="bg-itec-700 hover:bg-itec-600 text-white font-semibold px-6 py-3 rounded transition-colors"
        >
          Ver plan de estudio →
        </Link>
      </section>

      <section className="grid md:grid-cols-3 gap-5 mt-6">
        {FUNCIONES.map((f) => (
          <Link
            key={f.titulo}
            to={f.link}
            className={`bg-white border border-zinc-200 border-t-4 ${f.color} rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col`}
          >
            <h3 className="font-bold text-zinc-800 flex items-center gap-2">
              <span className="text-zinc-500">{f.icono}</span>
              {f.titulo}
            </h3>
            <p className="text-sm text-zinc-600 mt-2 flex-1">{f.texto}</p>
            <span className="text-sm text-itec-700 font-semibold mt-4">{f.accion} →</span>
          </Link>
        ))}
      </section>

      <p className="text-center text-xs text-zinc-500 mt-10">
        Campus ITEC Río Cuarto · Prototipo de módulo para SITEC desarrollado en el EFI de PP1
      </p>
    </main>
  )
}
