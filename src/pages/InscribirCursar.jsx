import { useContext } from "react"
import { useOutletContext } from "react-router-dom"
import BarraMateria from "../components/BarraMateria"
import PageHeader from "../components/PageHeader"
import Panel from "../components/Panel"
import { PlanContext } from "../context/PlanContext"
import { estadoInscripcion } from "../utils/mensajes"

// Subruta /inscripciones/cursar (fiel a Boceto 1)
export default function InscribirCursar() {
  const { materias, grafo } = useOutletContext()
  const { cursada, toggleCursada, anioActual, setAnioActual, condiciones } =
    useContext(PlanContext)

  const anios = [...new Set(materias.map((m) => m.anio))].sort((a, b) => a - b)
  const anioSiguiente = anios.includes(anioActual + 1) ? anioActual + 1 : null

  const inscriptas = materias.filter((m) => cursada.includes(m.id)).length
  const resumen =
    inscriptas === 0
      ? "( Sin materias A Cursar Para Este Cuatrimestre )"
      : `( ${inscriptas} ${inscriptas === 1 ? "materia" : "materias"} A Cursar Para Este Cuatrimestre )`

  const renderBarra = (materia) => {
    const inscripta = cursada.includes(materia.id)
    const { estado, mensaje, aviso } = estadoInscripcion(
      materia,
      materias,
      grafo,
      condiciones
    )
    return (
      <BarraMateria
        key={materia.id}
        materia={materia}
        estado={inscripta ? estado : "libre"}
        mensaje={mensaje}
        aviso={aviso}
        onToggle={toggleCursada}
        textoBoton={inscripta ? "Cancelar inscripción" : "Inscribirse"}
      />
    )
  }

  return (
    <main>
      <PageHeader
        titulo="Inscripciones Para Cursar"
        subtitulo={`Carrera :DESARROLLO DE SOFTWARE _ ${resumen}`}
      />

      <Panel>
        <div className="flex flex-wrap items-center gap-3 mb-6 p-3 bg-zinc-50 border border-zinc-200 text-sm">
          <label htmlFor="anio" className="font-medium text-zinc-700">
            Año que cursás:
          </label>
          <select
            id="anio"
            value={anioActual}
            onChange={(e) => setAnioActual(Number(e.target.value))}
            className="border border-zinc-300 rounded px-2.5 py-1 bg-white font-medium text-zinc-800 shadow-2xs focus:outline-hidden focus:border-sitec-rojo"
          >
            {anios.map((a) => (
              <option key={a} value={a}>
                {a}° año
              </option>
            ))}
          </select>
          <span className="text-xs text-zinc-500 sm:ml-auto">
            Hacé clic en el círculo de la derecha para inscribirte o cancelar.
          </span>
        </div>

        <h2 className="text-[15px] font-semibold text-zinc-700 mb-3 flex items-center gap-2">
          <span>Materias de {anioActual}° año</span>
          <span className="text-xs font-normal text-zinc-500">
            ({materias.filter((m) => m.anio === anioActual).length} materias)
          </span>
        </h2>
        <ul className="flex flex-col gap-3.5 max-w-xl">
          {materias.filter((m) => m.anio === anioActual).map(renderBarra)}
        </ul>

        {anioSiguiente && (
          <div className="mt-10 pt-6 border-t border-zinc-200">
            <h2 className="text-[15px] font-semibold text-zinc-700 mb-3 flex items-center gap-2">
              <span>Materias de {anioSiguiente}° año</span>
              <span className="text-xs font-normal text-zinc-500">
                (Siguiente ciclo)
              </span>
            </h2>
            <ul className="flex flex-col gap-3.5 max-w-xl">
              {materias.filter((m) => m.anio === anioSiguiente).map(renderBarra)}
            </ul>
          </div>
        )}
      </Panel>
    </main>
  )
}
