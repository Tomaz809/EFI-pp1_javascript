import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { PlanContext } from "../context/PlanContext"
import usePlanEstudios from "../hooks/usePlanEstudios"
import ErrorMessage from "./ErrorMessage"
import Loader from "./Loader"

// Contenido del panel: se monta solo cuando está abierto, así pide los datos actualizados
function ContenidoFavoritos() {
  const { materias, grafo, loading, error, recargar } = usePlanEstudios()
  const { favoritas, toggleFavorita, cerrarFavoritos } = useContext(PlanContext)

  if (loading) return <Loader />
  if (error) return <ErrorMessage mensaje={error} onReintentar={recargar} />

  const materiasFavoritas = materias.filter((m) => favoritas.includes(m.id))

  if (materiasFavoritas.length === 0) {
    return (
      <p className="text-zinc-600">
        No tenés materias favoritas. Marcalas con ★ en{" "}
        <Link to="/estado-cursada" onClick={cerrarFavoritos} className="text-sitec-rojo hover:underline">
          Estado de Cursada
        </Link>{" "}
        o en el{" "}
        <Link to="/materias" onClick={cerrarFavoritos} className="text-sitec-rojo hover:underline">
          Plan de Estudio
        </Link>
        .
      </p>
    )
  }

  return (
    <ul className="grid sm:grid-cols-2 gap-6">
      {materiasFavoritas.map((materia) => {
        const previas = materias.filter((m) => (grafo.requisitos[materia.id] ?? []).includes(m.id))
        return (
          <li key={materia.id}>
            <div className="flex items-center justify-between bg-sitec-barra text-white px-5 py-3">
              <Link to={`/materia/${materia.id}`} onClick={cerrarFavoritos} className="text-[17px] hover:underline">
                {materia.nombre_materia}
              </Link>
              <button
                onClick={() => toggleFavorita(materia.id)}
                className="text-xl text-white hover:text-zinc-400 cursor-pointer"
                aria-label="Quitar de favoritos"
                title="Quitar de favoritos"
              >
                ★
              </button>
            </div>
            <div className="mx-4 bg-sitec-barra/95 text-white px-5 py-6 min-h-32">
              <p className="text-xs text-zinc-400 mb-3 uppercase tracking-wide">Correlativas para rendir</p>
              {previas.length === 0 ? (
                <p className="text-[15px] text-zinc-300">Sin correlativas</p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {previas.map((p) => (
                    <li key={p.id}>
                      <p className="text-[15px]">{p.nombre_materia}</p>
                      <p className="text-xs text-zinc-400">
                        Cód. {p.codigo} · {p.anio}° año · {p.cuatrimestral ? "Cuatrimestral" : "Anual"}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

// Panel de favoritos que se abre desde la barra superior, sin cambiar de página
export default function FavoritosModal() {
  const { favoritosAbierto, cerrarFavoritos } = useContext(PlanContext)

  // Cerrar con la tecla Escape
  useEffect(() => {
    if (!favoritosAbierto) return
    const alPresionar = (e) => e.key === "Escape" && cerrarFavoritos()
    window.addEventListener("keydown", alPresionar)
    return () => window.removeEventListener("keydown", alPresionar)
  }, [favoritosAbierto, cerrarFavoritos])

  if (!favoritosAbierto) return null

  return (
    <div className="fixed inset-0 top-11 z-50 bg-black/50 flex justify-center items-start p-4 overflow-y-auto" onClick={cerrarFavoritos}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Favoritos"
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl mt-6"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-300">
          <h2 className="text-xl text-zinc-800">Favoritos</h2>
          <button onClick={cerrarFavoritos} className="text-zinc-500 hover:text-zinc-800 text-xl cursor-pointer" aria-label="Cerrar">
            ✕
          </button>
        </div>
        <div className="px-6 py-6">
          <ContenidoFavoritos />
        </div>
      </div>
    </div>
  )
}
