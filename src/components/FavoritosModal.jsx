import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { Star, X } from "lucide-react"
import { PlanContext } from "../context/PlanContext"
import usePlanEstudios from "../hooks/usePlanEstudios"
import ErrorMessage from "./ErrorMessage"
import Loader from "./Loader"

// Contenido del panel de favoritos (fiel a Boceto 3)
function ContenidoFavoritos() {
  const { materias, grafo, loading, error, recargar } = usePlanEstudios()
  const { favoritas, toggleFavorita, cerrarFavoritos } = useContext(PlanContext)

  if (loading) return <Loader />
  if (error) return <ErrorMessage mensaje={error} onReintentar={recargar} />

  const materiasFavoritas = materias.filter((m) => favoritas.includes(m.id))

  if (materiasFavoritas.length === 0) {
    return (
      <div className="py-6 text-center sm:text-left">
        <p className="text-zinc-600 text-sm">
          No tenés materias marcadas como favoritas todavía.
        </p>
        <p className="text-xs text-zinc-500 mt-2">
          Podés marcarlas con la estrella desde{" "}
          <Link
            to="/estado-cursada"
            onClick={cerrarFavoritos}
            className="text-sitec-rojo font-semibold hover:underline"
          >
            Estado de Cursada
          </Link>{" "}
          o desde el{" "}
          <Link
            to="/materias"
            onClick={cerrarFavoritos}
            className="text-sitec-rojo font-semibold hover:underline"
          >
            Plan de Estudio
          </Link>
          .
        </p>
      </div>
    )
  }

  return (
    <ul className="grid sm:grid-cols-2 gap-6">
      {materiasFavoritas.map((materia) => {
        const previas = materias.filter((m) => (grafo.requisitos[materia.id] ?? []).includes(m.id))
        return (
          <li key={materia.id} className="flex flex-col">
            {/* Tarjeta superior: Materia (Boceto 3) */}
            <div className="flex items-center justify-between bg-sitec-barra text-white px-5 py-3.5 shadow-xs">
              <Link
                to={`/materia/${materia.id}`}
                onClick={cerrarFavoritos}
                className="text-[16px] font-medium hover:text-zinc-200 transition-colors truncate pr-2"
              >
                {materia.nombre_materia}
              </Link>
              <button
                onClick={() => toggleFavorita(materia.id)}
                className="cursor-pointer transition-transform hover:scale-110"
                aria-label="Quitar de favoritos"
                title="Quitar de favoritos"
              >
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </button>
            </div>

            {/* Tarjeta inferior escalonada: Materia correlativa / más datos (Boceto 3) */}
            <div className="mx-3 sm:mx-4 bg-[#2f343a] text-white px-5 py-5 min-h-32 shadow-sm border-t border-white/10">
              <p className="text-[11px] text-zinc-400 mb-3 uppercase tracking-wider font-semibold">
                Correlativas requeridas
              </p>
              {previas.length === 0 ? (
                <p className="text-[14px] text-zinc-300 italic">Sin correlativas previas requeridas</p>
              ) : (
                <ul className="flex flex-col gap-2.5">
                  {previas.map((p) => (
                    <li key={p.id} className="border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                      <p className="text-[14px] font-medium leading-snug">{p.nombre_materia}</p>
                      <p className="text-[11px] text-zinc-400">
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

// Modal / Panel de favoritos que abre desde la barra superior sin recargar página
export default function FavoritosModal() {
  const { favoritosAbierto, cerrarFavoritos } = useContext(PlanContext)

  // Cerrar con Escape
  useEffect(() => {
    if (!favoritosAbierto) return
    const alPresionar = (e) => e.key === "Escape" && cerrarFavoritos()
    window.addEventListener("keydown", alPresionar)
    return () => window.removeEventListener("keydown", alPresionar)
  }, [favoritosAbierto, cerrarFavoritos])

  if (!favoritosAbierto) return null

  return (
    <div
      className="fixed inset-0 top-11 z-50 bg-black/60 flex justify-center items-start p-4 overflow-y-auto backdrop-blur-xs"
      onClick={cerrarFavoritos}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Materias Favoritas"
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl mt-6 shadow-2xl border border-zinc-300"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-zinc-50">
          <div>
            <h2 className="text-xl font-semibold text-zinc-800">Materias Favoritas / Prioritarias</h2>
            <p className="text-xs text-zinc-500">
              Vista comparativa de materias seleccionadas y sus correlativas correspondientes
            </p>
          </div>
          <button
            onClick={cerrarFavoritos}
            className="w-8 h-8 rounded-full hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 cursor-pointer flex items-center justify-center transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-6 max-h-[75vh] overflow-y-auto">
          <ContenidoFavoritos />
        </div>
      </div>
    </div>
  )
}
