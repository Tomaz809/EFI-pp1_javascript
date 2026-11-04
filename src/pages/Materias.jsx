import { useContext, useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import Loader from "../components/Loader"
import PageHeader from "../components/PageHeader"
import Panel from "../components/Panel"
import { PlanContext } from "../context/PlanContext"
import usePlanEstudios from "../hooks/usePlanEstudios"

const tabStyle = ({ isActive }) =>
  `px-3 py-1.5 text-xs border ${isActive ? "bg-sitec-rojo border-sitec-rojo text-white" : "bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-100"}`

// Ruta padre /materias: trae los datos y los pasa a las subrutas con <Outlet context>
export default function Materias() {
  const { materias, grafo, loading, error, recargar } = usePlanEstudios()
  const { enfocada, salirDeEnfoque } = useContext(PlanContext)
  const [busqueda, setBusqueda] = useState("")

  if (loading) return <Loader texto="Cargando plan de estudio..." />
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

  return (
    <main>
      <PageHeader titulo="Plan de Estudio" subtitulo="Carrera :DESARROLLO DE SOFTWARE _ Diseño curricular" />

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <nav className="flex flex-wrap gap-1">
            <NavLink to="" end className={tabStyle}>Todos los años</NavLink>
            {anios.map((anio) => (
              <NavLink key={anio} to={`anio/${anio}`} className={tabStyle}>
                {anio}° año
              </NavLink>
            ))}
          </nav>
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o código"
            className="w-full sm:w-60 px-2 py-1.5 text-xs border border-zinc-300 outline-none focus:border-zinc-500"
          />
        </div>

        <p className="text-xs text-zinc-500 mb-6">
          {materiaEnfocada ? (
            <>
              Viendo correlativas de <strong className="text-zinc-800">{materiaEnfocada.nombre_materia}</strong>:
              en amarillo las que hay que aprobar antes y en gris las que destraba.{" "}
              <button onClick={salirDeEnfoque} className="text-sitec-rojo hover:underline cursor-pointer">
                Quitar selección
              </button>
            </>
          ) : (
            <>Tildá "Ver correlativas" en una materia para resaltar las que necesitás antes y las que destraba.</>
          )}
        </p>

        <Outlet context={{ materias: filtradas, todas: materias, grafo }} />
      </Panel>
    </main>
  )
}
