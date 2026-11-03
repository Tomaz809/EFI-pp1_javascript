import { useContext } from "react"
import { NavLink, Outlet } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import Leyenda from "../components/Leyenda"
import Loader from "../components/Loader"
import { PlanContext } from "../context/PlanContext"
import usePlanEstudios from "../hooks/usePlanEstudios"

const tabStyle = ({ isActive }) =>
  `pb-2 font-medium border-b-2 transition-colors
  ${isActive ? "border-indigo-500 text-indigo-400" : "border-transparent text-zinc-400 hover:text-zinc-200"}`

// Ruta padre /materias: trae los datos y los pasa a las subrutas con <Outlet context>
export default function Materias() {
  const { materias, grafo, loading, error, recargar } = usePlanEstudios()
  const { enfocada, salirDeEnfoque } = useContext(PlanContext)

  if (loading) return <Loader texto="Cargando plan de estudios..." />
  if (error) return <ErrorMessage mensaje={error} onReintentar={recargar} />

  const anios = [...new Set(materias.map((m) => m.anio))].sort((a, b) => a - b)
  const materiaEnfocada = materias.find((m) => m.id === enfocada)

  return (
    <main className="max-w-6xl mx-auto w-full pt-6 px-4">
      <h1 className="text-3xl font-bold">Plan de estudios</h1>
      <p className="text-zinc-400 text-sm mt-1 mb-4">
        Tildá una materia para activar el <strong>Modo Enfoque</strong> y ver sus correlativas.
      </p>

      <Leyenda />

      {materiaEnfocada && (
        <div className="flex flex-wrap items-center justify-between gap-2 mt-4 bg-blue-950 border border-blue-700 px-4 py-3 rounded-lg text-sm">
          <p>
            Modo enfoque: <strong>{materiaEnfocada.nombre_materia}</strong>
          </p>
          <button onClick={salirDeEnfoque} className="text-blue-300 hover:text-white cursor-pointer">
            Salir del modo enfoque ✕
          </button>
        </div>
      )}

      <nav className="flex gap-6 border-b border-zinc-700 mt-6 mb-6">
        <NavLink to="" end className={tabStyle}>Todos los años</NavLink>
        {anios.map((anio) => (
          <NavLink key={anio} to={`anio/${anio}`} className={tabStyle}>
            {anio}° año
          </NavLink>
        ))}
      </nav>

      <Outlet context={{ materias, grafo }} />
    </main>
  )
}
