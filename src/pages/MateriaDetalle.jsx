import { useContext, useEffect, useState } from "react"
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import Loader from "../components/Loader"
import { PlanContext } from "../context/PlanContext"
import usePlanEstudios from "../hooks/usePlanEstudios"
import { deleteMateria, getMateria } from "../services/api"

const tabStyle = ({ isActive }) =>
  `pb-2 font-medium border-b-2 transition-colors
  ${isActive ? "border-indigo-500 text-indigo-400" : "border-transparent text-zinc-400 hover:text-zinc-200"}`

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
    <main className="max-w-3xl mx-auto pt-6 px-4 w-full">
      <Link to="/materias" className="text-sm text-indigo-400 hover:underline">
        ← Volver al plan
      </Link>

      <div className="mt-4 bg-zinc-800 p-6 rounded-lg">
        <div className="flex flex-wrap justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{materia.nombre_materia}</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Código {materia.codigo} · {materia.anio}° año ·{" "}
              {materia.cuatrimestral ? "Cuatrimestral" : "Anual"}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <button
              onClick={() => toggleFavorita(materia.id)}
              className={`px-4 py-2 rounded cursor-pointer ${esFavorita ? "bg-violet-600 hover:bg-violet-500" : "bg-zinc-700 hover:bg-zinc-600"}`}
            >
              {esFavorita ? "★ Favorita" : "☆ Marcar favorita"}
            </button>
            <button
              onClick={() => toggleCursada(materia.id)}
              className={`px-4 py-2 rounded cursor-pointer ${enCursada ? "bg-rose-600 hover:bg-rose-500" : "bg-zinc-700 hover:bg-zinc-600"}`}
            >
              {enCursada ? "✓ En mi cursada" : "+ Agregar a mi cursada"}
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-700 text-sm">
          {!confirmarBorrado ? (
            <button
              onClick={() => setConfirmarBorrado(true)}
              className="text-zinc-400 hover:text-red-400 cursor-pointer"
            >
              Eliminar materia
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-red-300">¿Seguro? Se borran también sus correlativas.</span>
              <button
                onClick={handleBorrar}
                disabled={borrando}
                className="bg-red-700 hover:bg-red-600 px-3 py-1 rounded cursor-pointer disabled:opacity-50"
              >
                {borrando ? "Eliminando..." : "Sí, eliminar"}
              </button>
              <button
                onClick={() => setConfirmarBorrado(false)}
                className="text-zinc-400 hover:text-zinc-200 cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>

      <nav className="flex gap-4 border-b border-zinc-700 mt-8 mb-4">
        <NavLink to="" end className={tabStyle}>Correlativas previas</NavLink>
        <NavLink to="destraba" className={tabStyle}>Qué destraba</NavLink>
      </nav>

      <Outlet context={{ materia, plan, recargar }} />
    </main>
  )
}
