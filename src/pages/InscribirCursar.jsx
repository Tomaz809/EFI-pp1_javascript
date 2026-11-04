import { useContext } from "react"
import { useOutletContext } from "react-router-dom"
import BarraMateria from "../components/BarraMateria"
import PageHeader from "../components/PageHeader"
import Panel from "../components/Panel"
import { PlanContext } from "../context/PlanContext"
import { estadoInscripcion } from "../utils/mensajes"

// Subruta /inscripciones/cursar
export default function InscribirCursar() {
  const { materias, grafo } = useOutletContext()
  const { cursada, toggleCursada, anioActual, setAnioActual, condiciones } = useContext(PlanContext)

  const anios = [...new Set(materias.map((m) => m.anio))].sort((a, b) => a - b)
  const anioSiguiente = anios.includes(anioActual + 1) ? anioActual + 1 : null

  const inscriptas = materias.filter((m) => cursada.includes(m.id)).length
  const resumen =
    inscriptas === 0
      ? "( Sin materias A Cursar Para Este Cuatrimestre )"
      : `( ${inscriptas} ${inscriptas === 1 ? "materia" : "materias"} A Cursar Para Este Cuatrimestre )`

  const renderBarra = (materia) => {
    const inscripta = cursada.includes(materia.id)
    const { estado, mensaje, aviso } = estadoInscripcion(materia, materias, grafo, condiciones)
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
      <PageHeader titulo="Inscripciones Para Cursar" subtitulo={`Carrera :DESARROLLO DE SOFTWARE _ ${resumen}`} />

      <Panel>
        <div className="flex flex-wrap items-center gap-3 mb-8 text-sm">
          <label htmlFor="anio" className="text-zinc-700">Año que cursás:</label>
          <select
            id="anio"
            value={anioActual}
            onChange={(e) => setAnioActual(Number(e.target.value))}
            className="border border-zinc-300 px-2 py-1 bg-white"
          >
            {anios.map((a) => (
              <option key={a} value={a}>{a}° año</option>
            ))}
          </select>
          <span className="text-zinc-500">
            Tocá el círculo de una materia para inscribirte.
          </span>
        </div>

        <h2 className="text-[15px] text-zinc-600 mb-3">Materias de {anioActual}° año</h2>
        <ul className="flex flex-col gap-4 max-w-xl">
          {materias.filter((m) => m.anio === anioActual).map(renderBarra)}
        </ul>

        {anioSiguiente && (
          <>
            <h2 className="text-[15px] text-zinc-600 mt-10 mb-3">Materias de {anioSiguiente}° año</h2>
            <ul className="flex flex-col gap-4 max-w-xl">
              {materias.filter((m) => m.anio === anioSiguiente).map(renderBarra)}
            </ul>
          </>
        )}
      </Panel>
    </main>
  )
}
