import { useContext, useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import Leyenda from "../components/Leyenda"
import Loader from "../components/Loader"
import PageHeader from "../components/PageHeader"
import StatCard from "../components/StatCard"
import { PlanContext } from "../context/PlanContext"
import usePlanEstudios from "../hooks/usePlanEstudios"
import { idsCuelloDeBotella } from "../utils/correlativas"

const pillStyle = ({ isActive }) =>
  `px-3 py-1.5 rounded text-sm border transition-colors
  ${isActive ? "bg-itec-700 border-itec-700 text-white font-semibold" : "bg-white border-zinc-300 text-zinc-700 hover:border-itec-600"}`

// Ruta padre /materias: trae los datos y los pasa a las subrutas con <Outlet context>
export default function Materias() {
  const { materias, grafo, loading, error, recargar } = usePlanEstudios()
  const { enfocada, salirDeEnfoque, favoritas, cursada } = useContext(PlanContext)
  const [busqueda, setBusqueda] = useState("")

  if (loading) return <Loader texto="Cargando plan de estudios..." />
  if (error) return <ErrorMessage mensaje={error} onReintentar={recargar} />

  const anios = [...new Set(materias.map((m) => m.anio))].sort((a, b) => a - b)
  const materiaEnfocada = materias.find((m) => m.id === enfocada)

  // Filtro por nombre o código
  const texto = busqueda.trim().toLowerCase()
  const filtradas = texto
    ? materias.filter(
        (m) => m.nombre_materia.toLowerCase().includes(texto) || String(m.codigo).includes(texto)
      )
    : materias

  const sinCorrelativas = materias.filter((m) => !(grafo.requisitos[m.id]?.length)).length
  const cuellos = idsCuelloDeBotella(materias, cursada, grafo).size

  return (
    <main>
      <PageHeader
        nuevo
        titulo="Plan de Estudio y Calculador de Correlativas"
        subtitulo="Tecnicatura Superior en Desarrollo de Software · Diseño curricular de 1° a 3° año"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        <StatCard icono="📚" titulo="Materias del plan" valor={materias.length} detalle={`${anios.length} años de cursada`} color="text-itec-700" />
        <StatCard icono="✓" titulo="Sin correlativas" valor={sinCorrelativas} detalle="Se cursan sin requisitos" color="text-emerald-700" />
        <StatCard icono="★" titulo="Favoritas" valor={favoritas.length} detalle="Materias objetivo" color="text-violet-700" />
        <StatCard icono="⏱" titulo="En mi cursada" valor={cursada.length} detalle={`${cuellos} cuello(s) de botella`} color="text-sky-700" />
      </div>

      <Leyenda />

      {materiaEnfocada && (
        <div className="flex flex-wrap items-center justify-between gap-2 mt-4 bg-sky-50 border border-sky-300 text-sky-900 px-4 py-3 rounded-lg text-sm">
          <p>
            ◎ Modo enfoque: <strong>{materiaEnfocada.nombre_materia}</strong> — en amarillo sus previas, en
            verde lo que destraba.
          </p>
          <button onClick={salirDeEnfoque} className="font-semibold hover:underline cursor-pointer">
            Salir ✕
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-zinc-200 rounded-lg px-4 py-3 mt-4 mb-8">
        <nav className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-zinc-500 mr-1">⛃ Año:</span>
          <NavLink to="" end className={pillStyle}>
            Todos los años ({materias.length})
          </NavLink>
          {anios.map((anio) => (
            <NavLink key={anio} to={`anio/${anio}`} className={pillStyle}>
              {anio}° año ({materias.filter((m) => m.anio === anio).length})
            </NavLink>
          ))}
        </nav>

        <input
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="🔍 Buscar por nombre o código..."
          className="w-full sm:w-64 px-3 py-1.5 text-sm rounded border border-zinc-300 focus:border-itec-600 outline-none"
        />
      </div>

      <Outlet context={{ materias: filtradas, todas: materias, grafo }} />
    </main>
  )
}
