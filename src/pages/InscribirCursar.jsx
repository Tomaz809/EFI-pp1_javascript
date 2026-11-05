import { useContext, useMemo, useState } from "react"
import { useOutletContext } from "react-router-dom"
import BarraMateria from "../components/BarraMateria"
import PageHeader from "../components/PageHeader"
import Panel from "../components/Panel"
import { PlanContext } from "../context/PlanContext"
import { destrabaDe, previasDe } from "../utils/correlativas"
import { estadoInscripcion } from "../utils/mensajes"

<<<<<<< Updated upstream
// Subruta /inscripciones/cursar (fiel a Boceto 1)
=======
// Subruta /inscripciones/cursar: 3 columnas de años con colores diferenciados, leyenda y separación
>>>>>>> Stashed changes
export default function InscribirCursar() {
  const { materias, grafo } = useOutletContext()
  const { cursada, toggleCursada, anioActual, setAnioActual, condiciones } =
    useContext(PlanContext)

  const [hoveredId, setHoveredId] = useState(null)

  const anios = [1, 2, 3]

  // Cantidad de inscriptas en el año actual
  const inscriptasDelAnio = materias.filter(
    (m) => m.anio === anioActual && cursada.includes(m.id)
  ).length

  const totalInscriptas = materias.filter((m) => cursada.includes(m.id)).length

  const resumen =
    inscriptasDelAnio === 0
      ? `( Sin materias a cursar en ${anioActual}° año )`
      : `( ${inscriptasDelAnio} ${inscriptasDelAnio === 1 ? "materia inscripta" : "materias inscriptas"} en ${anioActual}° año )`

<<<<<<< Updated upstream
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
=======
  // Resaltado de conexiones por hover (hacia adelante y hacia atrás)
  const idsResaltados = useMemo(() => {
    if (!hoveredId) return new Set()
    const destraba = destrabaDe(hoveredId, grafo)
    const previas = previasDe(hoveredId, grafo)
    return new Set([...destraba, ...previas])
  }, [hoveredId, grafo])
>>>>>>> Stashed changes

  return (
    <main>
      <PageHeader
        titulo="Inscripciones Para Cursar"
        subtitulo={`Carrera :DESARROLLO DE SOFTWARE _ ${resumen}`}
      />

<<<<<<< Updated upstream
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
=======
      <Panel className="p-4 sm:p-6 lg:p-8">
        {/* Barra superior de control y selección de año */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-zinc-50 border border-zinc-200">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <label htmlFor="anio-select" className="font-semibold text-zinc-800">
              Año que cursás:
            </label>
            <select
              id="anio-select"
              value={anioActual}
              onChange={(e) => {
                setAnioActual(Number(e.target.value))
                setHoveredId(null)
              }}
              className="border border-zinc-300 rounded px-3 py-1.5 bg-white font-semibold text-zinc-900 shadow-2xs focus:ring-2 focus:ring-sitec-rojo outline-hidden cursor-pointer"
            >
              {anios.map((a) => (
                <option key={a} value={a}>
                  {a}° Año {a === anioActual ? "(Activo)" : ""}
                </option>
              ))}
            </select>

            <span className="text-xs text-zinc-500">
              Inscripción activa habilitada únicamente en tu columna de{" "}
              <strong className="text-zinc-800">{anioActual}° Año</strong>.
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-medium text-zinc-700">Total inscriptas:</span>
            <span className="bg-sitec-rojo text-white font-bold px-2.5 py-0.5 rounded-full">
              {totalInscriptas}
            </span>
          </div>
        </div>

        {/* LEYENDA DE COLORES */}
        <div className="bg-white border border-zinc-200 p-4 mb-8 shadow-2xs">
          <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>🎨 Leyenda de colores del mapa curricular</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-[#1d4ed8] border border-sky-300 shadow-2xs shrink-0" />
              <span className="text-zinc-800 font-medium">Cursando actualmente</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-amber-400 border border-amber-600 shadow-2xs shrink-0" />
              <span className="text-zinc-800 font-medium">Correlativa destrabada</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-[#64748b] border border-zinc-400 shadow-2xs shrink-0" />
              <span className="text-zinc-800 font-medium">Sin correlativa (OJO)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-[#2a2f35] border border-zinc-600 shadow-2xs shrink-0" />
              <span className="text-zinc-800 font-medium">Pendiente / Bloqueada</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded ring-2 ring-sky-400 bg-sky-100 shadow-2xs shrink-0" />
              <span className="text-zinc-800 font-medium">Conectada (Hover)</span>
            </div>
          </div>
        </div>

        {/* COLUMNAS DE LOS 3 AÑOS (Separadas con gap generoso) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 items-start">
          {anios.map((anio) => {
            const materiasDelAnio = materias
              .filter((m) => m.anio === anio)
              .sort((a, b) => a.codigo - b.codigo)
            const esAnioActivo = anio === anioActual
            const inscriptasEnEsteAnio = materiasDelAnio.filter((m) => cursada.includes(m.id)).length

            return (
              <div
                key={anio}
                className={`flex flex-col border shadow-xs transition-all duration-200 ${
                  esAnioActivo
                    ? "border-sitec-rojo bg-white shadow-md ring-1 ring-sitec-rojo/30"
                    : "border-zinc-300/80 bg-zinc-50/60"
                }`}
              >
                {/* Encabezado de la columna */}
                <div
                  className={`p-4 border-b flex items-center justify-between gap-2 ${
                    esAnioActivo
                      ? "bg-sitec-rojo text-white"
                      : "bg-zinc-200 text-zinc-800 border-zinc-300"
                  }`}
                >
                  <div>
                    <h2 className="text-[16px] font-bold tracking-wide flex items-center gap-2">
                      <span>{anio}° Año</span>
                      <span className="text-xs font-normal opacity-90">
                        ({materiasDelAnio.length} materias)
                      </span>
                    </h2>
                    <p className={`text-[11px] mt-0.5 ${esAnioActivo ? "text-zinc-200" : "text-zinc-600"}`}>
                      {esAnioActivo
                        ? `Tu año en curso · ${inscriptasEnEsteAnio} inscriptas`
                        : anio < anioActual
                          ? "Ciclo anterior"
                          : "Ciclo siguiente"}
                    </p>
                  </div>

                  {!esAnioActivo ? (
                    <button
                      type="button"
                      onClick={() => {
                        setAnioActual(anio)
                        setHoveredId(null)
                      }}
                      className="text-xs bg-white/95 hover:bg-white text-zinc-800 font-semibold px-2.5 py-1 rounded shadow-2xs cursor-pointer transition-colors"
                      title={`Cambiar a ${anio}° año como tu ciclo activo`}
                    >
                      Cursar {anio}°
                    </button>
                  ) : (
                    <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded text-white">
                      Activo ✓
                    </span>
                  )}
                </div>

                {/* Listado de materias con separación generosa entre tarjetas */}
                <ul className="p-4 sm:p-5 flex flex-col gap-4">
                  {materiasDelAnio.map((materia) => {
                    const inscripta = cursada.includes(materia.id)
                    const { mensaje, aviso, habilitaNombres, tieneCorrelativas } =
                      estadoInscripcion(materia, materias, grafo, condiciones)

                    // Requisitos previos de esta materia
                    const reqs = grafo.requisitos[materia.id] ?? []
                    const reqsInscriptos =
                      reqs.length > 0 && reqs.every((rid) => cursada.includes(rid))

                    const requisitosDetalle = reqs.map((rid) => {
                      const mat = materias.find((m) => m.id === rid || m.codigo === rid)
                      return {
                        id: rid,
                        nombre: mat ? mat.nombre_materia : `Materia #${rid}`,
                        inscripto: cursada.includes(rid) || (mat && cursada.includes(mat.id)),
                      }
                    })

                    // Determinar el estado y color de la materia:
                    let estadoFinal = "libre"
                    if (esAnioActivo) {
                      if (inscripta) {
                        estadoFinal = tieneCorrelativas ? "cursando" : "sin_correlativa"
                      } else {
                        estadoFinal = "libre"
                      }
                    } else {
                      if (reqs.length === 0) {
                        estadoFinal = "libre"
                      } else if (reqsInscriptos) {
                        estadoFinal = "correlativa_destrabada"
                      } else {
                        estadoFinal = "bloqueada"
                      }
                    }

                    return (
                      <BarraMateria
                        key={materia.id}
                        materia={materia}
                        estado={estadoFinal}
                        mensaje={mensaje}
                        aviso={aviso}
                        onToggle={toggleCursada}
                        textoBoton={inscripta ? "Dar de baja" : "Inscribirse"}
                        esDelAnioActual={esAnioActivo}
                        anioActual={anioActual}
                        estaResaltada={idsResaltados.has(materia.id)}
                        habilitaNombres={habilitaNombres}
                        requisitosDetalle={requisitosDetalle}
                        requisitosInscriptos={reqsInscriptos}
                        onHover={(id) => setHoveredId(id)}
                        onLeave={() => setHoveredId(null)}
                      />
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
>>>>>>> Stashed changes
      </Panel>
    </main>
  )
}
