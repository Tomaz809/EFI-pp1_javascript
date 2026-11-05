import { useContext, useEffect, useState } from "react"
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router-dom"
import { Star, ArrowLeft } from "lucide-react"
import ErrorMessage from "../components/ErrorMessage"
import Loader from "../components/Loader"
import Panel from "../components/Panel"
import { PlanContext } from "../context/PlanContext"
import usePlanEstudios from "../hooks/usePlanEstudios"
import { deleteMateria, getMateria } from "../services/api"

const tabStyle = ({ isActive }) =>
  `px-4 py-1.5 text-sm -mb-px border ${isActive ? "bg-white border-zinc-300 border-b-white text-zinc-800" : "border-transparent text-zinc-500 hover:text-zinc-800"}`

// Ruta dinámica /materia/:id
export default function MateriaDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { favoritas, cursada, toggleFavorita, toggleCursada, quitarMateria } = useContext(PlanContext)

  const [materia, setMateria] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [recargas, setRecargas] = useState(0)
  const [confirmarBorrado, setConfirmarBorrado] = useState(false)
  const [borrando, setBorrando] = useState(false)

  // El resto del plan se usa para calcular lo que destraba esta materia
  const plan = usePlanEstudios()

  // Cada vez que cambia el id de la URL se vuelve a pedir la materia
  useEffect(() => {
    let cancelado = false

    async function cargar() {
      setLoading(true)
      setError(null)
      setConfirmarBorrado(false)
      try {
        const data = await getMateria(id)
        if (!cancelado) setMateria(data)
      } catch (err) {
        if (!cancelado) setError(err.message)
      } finally {
        if (!cancelado) setLoading(false)
      }
    }

    cargar()
    return () => {
      cancelado = true
    }
  }, [id, recargas])

  const recargar = () => {
    setRecargas((n) => n + 1)
    plan.recargar()
  }

  const handleBorrar = async () => {
    setBorrando(true)
    try {
      await deleteMateria(materia.id)
      quitarMateria(materia.id)
      navigate("/materias")
    } catch (err) {
      setError(err.message)
      setBorrando(false)
    }
  }

  if (loading) return <Loader texto="Cargando materia..." />
  if (error) return <ErrorMessage mensaje={error} onReintentar={recargar} />

  const esFavorita = favoritas.includes(materia.id)
  const enCursada = cursada.includes(materia.id)

  return (
    <main className="max-w-3xl">
      <Link to="/materias" className="text-sm text-sitec-rojo hover:underline inline-flex items-center gap-1.5">
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al Plan de Estudio</span>
      </Link>

      <div className="mt-4 bg-sitec-barra text-white px-6 py-5">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl">{materia.nombre_materia}</h1>
            <p className="text-zinc-300 text-sm mt-1">
              Cód. {materia.codigo} · {materia.anio}° año · {materia.cuatrimestral ? "Cuatrimestral" : "Anual"}
            </p>
          </div>
          <button
            onClick={() => toggleFavorita(materia.id)}
            className="cursor-pointer transition-transform hover:scale-110"
            aria-label={esFavorita ? "Quitar de favoritos" : "Agregar a favoritos"}
            title={esFavorita ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <Star className={`w-7 h-7 transition-colors ${esFavorita ? "fill-amber-400 text-amber-400" : "text-zinc-500 hover:text-zinc-300 fill-transparent"}`} />
          </button>
        </div>
      </div>

      <Panel className="!py-5">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <button
            onClick={() => toggleCursada(materia.id)}
            className={`px-4 py-1.5 cursor-pointer ${enCursada ? "bg-zinc-200 hover:bg-zinc-300 text-zinc-800" : "bg-sitec-rojo hover:bg-sitec-rojo-2 text-white"}`}
          >
            {enCursada ? "Dar de baja la inscripción" : "Inscribirse para cursar"}
          </button>

          {!confirmarBorrado ? (
            <button onClick={() => setConfirmarBorrado(true)} className="text-zinc-500 hover:text-sitec-rojo cursor-pointer">
              Eliminar materia
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-zinc-700">¿Seguro? Se borran también sus correlativas.</span>
              <button
                onClick={handleBorrar}
                disabled={borrando}
                className="bg-sitec-rojo hover:bg-sitec-rojo-2 text-white px-3 py-1 cursor-pointer disabled:opacity-50"
              >
                {borrando ? "Eliminando..." : "Sí, eliminar"}
              </button>
              <button onClick={() => setConfirmarBorrado(false)} className="text-zinc-500 hover:text-zinc-800 cursor-pointer">
                Cancelar
              </button>
            </div>
          )}
        </div>

        <nav className="flex gap-1 mt-6 mb-4 border-b border-zinc-300">
          <NavLink to="" end className={tabStyle}>Correlativas</NavLink>
          <NavLink to="destraba" className={tabStyle}>Qué destraba</NavLink>
        </nav>

        <Outlet context={{ materia, plan, recargar }} />
      </Panel>
    </main>
  )
}
