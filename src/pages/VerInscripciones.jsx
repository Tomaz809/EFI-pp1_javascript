import { useContext } from "react"
import { Link, useOutletContext } from "react-router-dom"
import BarraMateria from "../components/BarraMateria"
import PageHeader from "../components/PageHeader"
import Panel from "../components/Panel"
import { PlanContext } from "../context/PlanContext"
import { estadoInscripcion } from "../utils/mensajes"

// Subruta /inscripciones/ver: materias a las que el alumno se inscribió
export default function VerInscripciones() {
  const { materias, grafo } = useOutletContext()
  const { cursada, toggleCursada, limpiarCursada, condiciones } = useContext(PlanContext)

  const inscriptas = materias
    .filter((m) => cursada.includes(m.id))
    .sort((a, b) => a.anio - b.anio)

  return (
    <main>
      <PageHeader titulo="Ver Inscripciones" subtitulo="Carrera :DESARROLLO DE SOFTWARE _ Inscripciones a cursar">
        {inscriptas.length > 0 && (
          <button onClick={limpiarCursada} className="text-xs text-zinc-500 hover:text-sitec-rojo cursor-pointer">
            Dar de baja todas
          </button>
        )}
      </PageHeader>

      <Panel>
        {inscriptas.length === 0 ? (
          <p className="text-zinc-600">
            No tenés inscripciones para este cuatrimestre.{" "}
            <Link to="/inscripciones/cursar" className="text-sitec-rojo hover:underline">
              Ir a Inscripciones Para Cursar
            </Link>
          </p>
        ) : (
          <ul className="flex flex-col gap-4 max-w-xl">
            {inscriptas.map((materia) => {
              const { estado, mensaje, aviso } = estadoInscripcion(materia, materias, grafo, condiciones)
              return (
                <BarraMateria
                  key={materia.id}
                  materia={materia}
                  estado={estado}
                  mensaje={mensaje}
                  aviso={aviso}
                  onToggle={toggleCursada}
                  textoBoton="Dar de baja"
                />
              )
            })}
          </ul>
        )}
      </Panel>
    </main>
  )
}
