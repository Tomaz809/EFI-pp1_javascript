import { useContext } from "react"
import { Link } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import Loader from "../components/Loader"
import PageHeader from "../components/PageHeader"
import Panel from "../components/Panel"
import { PlanContext } from "../context/PlanContext"
import usePlanEstudios from "../hooks/usePlanEstudios"

const CONDICION = {
  sin_nota: { texto: "Sin nota", circulo: "bg-zinc-500" },
  aprobada: { texto: "Aprobada", circulo: "bg-[#3c8d3c]" },
  desaprobada: { texto: "Desaprobada", circulo: "bg-sitec-rojo-2" },
}

// /estado-cursada: condición de las materias inscriptas, con botón de simulación
export default function Condicion() {
  const { materias, loading, error, recargar } = usePlanEstudios()
  const { cursada, condiciones, simularCondicion, favoritas, toggleFavorita } = useContext(PlanContext)

  if (loading) return <Loader />
  if (error) return <ErrorMessage mensaje={error} onReintentar={recargar} />

  const inscriptas = materias.filter((m) => cursada.includes(m.id)).sort((a, b) => a.anio - b.anio)

  return (
    <main>
      <PageHeader titulo="Estado de Cursada" subtitulo="Condición de las materias inscriptas" />

      <Panel>
        {inscriptas.length === 0 ? (
          <p className="text-zinc-600">
            Todavía no te inscribiste a ninguna materia.{" "}
            <Link to="/inscripciones/cursar" className="text-sitec-rojo hover:underline">
              Ir a Inscripciones Para Cursar
            </Link>
          </p>
        ) : (
          <>
            <p className="text-xs text-zinc-500 mb-6">
              El círculo es una simulación: cada toque cambia la condición como si el docente hubiera cargado la nota.
            </p>
            <ul className="grid sm:grid-cols-2 gap-4 max-w-3xl">
              {inscriptas.map((materia) => {
                const condicion = CONDICION[condiciones[materia.id] ?? "sin_nota"]
                const esFavorita = favoritas.includes(materia.id)
                return (
                  <li key={materia.id} className="relative bg-sitec-barra text-white text-center px-6 pt-5 pb-6">
                    <button
                      onClick={() => toggleFavorita(materia.id)}
                      className={`absolute top-2 right-3 text-3xl leading-none cursor-pointer ${esFavorita ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                      aria-label={esFavorita ? "Quitar de favoritos" : "Agregar a favoritos"}
                      title={esFavorita ? "Quitar de favoritos" : "Agregar a favoritos"}
                    >
                      ★
                    </button>
                    <p className="text-[17px] px-6">{materia.nombre_materia}</p>
                    <p className="text-[15px] text-zinc-300">{materia.anio}° año</p>

                    <div className="flex items-center justify-center gap-4 mt-5">
                      <span className="text-[15px]">
                        Condición: <strong>{condicion.texto}</strong>
                      </span>
                      <button
                        onClick={() => simularCondicion(materia.id)}
                        className={`w-8 h-8 rounded-full cursor-pointer ${condicion.circulo}`}
                        aria-label={`Simular carga de nota de ${materia.nombre_materia}`}
                        title="Simular carga de nota"
                      />
                    </div>
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </Panel>
    </main>
  )
}
