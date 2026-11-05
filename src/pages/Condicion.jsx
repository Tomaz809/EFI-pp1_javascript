import { useContext } from "react"
import { Link } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import Loader from "../components/Loader"
import PageHeader from "../components/PageHeader"
import Panel from "../components/Panel"
import { PlanContext } from "../context/PlanContext"
import usePlanEstudios from "../hooks/usePlanEstudios"

const CONDICION = {
  sin_nota: {
    texto: "Sin nota",
    circulo: "bg-zinc-500 hover:bg-zinc-400 ring-2 ring-zinc-400/40",
    badge: "bg-zinc-600/80 text-zinc-100",
  },
  aprobada: {
    texto: "Aprobada",
    circulo: "bg-[#2e7d32] hover:bg-[#388e3c] ring-2 ring-green-300/40",
    badge: "bg-green-700 text-white font-medium",
  },
  desaprobada: {
    texto: "Desaprobada",
    circulo: "bg-sitec-rojo-2 hover:bg-red-600 ring-2 ring-red-400/40",
    badge: "bg-red-800 text-white font-medium",
  },
}

// /estado-cursada: condición de las materias inscriptas (fiel a Boceto 2)
export default function Condicion() {
  const { materias, loading, error, recargar } = usePlanEstudios()
  const { cursada, condiciones, simularCondicion, favoritas, toggleFavorita } =
    useContext(PlanContext)

  if (loading) return <Loader />
  if (error) return <ErrorMessage mensaje={error} onReintentar={recargar} />

  const inscriptas = materias
    .filter((m) => cursada.includes(m.id))
    .sort((a, b) => a.anio - b.anio)

  return (
    <main>
      <PageHeader
        titulo="Estado de Cursada"
        subtitulo="Condición académica de las materias inscriptas"
      />

      <Panel>
        {inscriptas.length === 0 ? (
          <div className="py-8 text-center sm:text-left">
            <p className="text-zinc-700 text-base mb-3">
              Todavía no te inscribiste a ninguna materia para este cuatrimestre.
            </p>
            <Link
              to="/inscripciones/cursar"
              className="inline-block bg-sitec-barra hover:bg-sitec-rojo text-white px-5 py-2.5 text-sm font-medium transition-colors"
            >
              ➔ Ir a Inscripciones Para Cursar
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-zinc-100 border-l-4 border-zinc-400 p-3 mb-6 text-xs text-zinc-600">
              <span className="font-semibold text-zinc-800">Simulación académica:</span> Al hacer
              clic sobre el círculo de color, se simula la carga de notas del docente alternando
              entre <em>Sin nota</em>, <em>Aprobada</em> y <em>Desaprobada</em>.
            </div>

            <ul className="grid sm:grid-cols-2 gap-5 max-w-3xl">
              {inscriptas.map((materia) => {
                const cond = CONDICION[condiciones[materia.id] ?? "sin_nota"]
                const esFavorita = favoritas.includes(materia.id)

                return (
                  <li
                    key={materia.id}
                    className="relative bg-sitec-barra text-white text-center px-6 pt-5 pb-6 shadow-sm border border-black/10 transition-shadow hover:shadow-md"
                  >
                    {/* Botón de favoritos / prioritaria */}
                    <button
                      onClick={() => toggleFavorita(materia.id)}
                      className={`absolute top-2.5 right-3.5 text-3xl leading-none cursor-pointer transition-colors ${
                        esFavorita ? "text-amber-400 scale-110" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                      aria-label={esFavorita ? "Quitar de favoritos" : "Marcar como prioritaria"}
                      title={esFavorita ? "Materia prioritaria (marcada)" : "Marcar como prioritaria"}
                    >
                      ★
                    </button>

                    <h2 className="text-[17px] font-medium px-6 leading-snug">
                      {materia.nombre_materia}
                    </h2>
                    <p className="text-[13px] text-zinc-300 mt-1">
                      {materia.anio}° año · Cód. {materia.codigo}
                    </p>

                    <div className="flex items-center justify-center gap-3 mt-5 pt-3 border-t border-white/10">
                      <span className="text-[14px]">
                        Condición:{" "}
                        <span className={`inline-block px-2 py-0.5 rounded text-xs ml-1 ${cond.badge}`}>
                          {cond.texto}
                        </span>
                      </span>

                      {/* Botón circular de simulación (Boceto 2) */}
                      <button
                        onClick={() => simularCondicion(materia.id)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full cursor-pointer transition-transform hover:scale-110 active:scale-95 shadow-sm ${cond.circulo}`}
                        aria-label={`Simular carga de nota de ${materia.nombre_materia}`}
                        title="Hacé clic para cambiar la condición (simular carga de nota)"
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
