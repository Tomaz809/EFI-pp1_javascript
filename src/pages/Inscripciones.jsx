import { Outlet } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import Loader from "../components/Loader"
import usePlanEstudios from "../hooks/usePlanEstudios"

// Ruta padre /inscripciones: trae el plan de la API y lo comparte con
// las subrutas "cursar" y "ver" mediante <Outlet context>
export default function Inscripciones() {
  const { materias, grafo, loading, error, recargar } = usePlanEstudios()

  if (loading) return <Loader texto="Cargando materias..." />
  if (error) return <ErrorMessage mensaje={error} onReintentar={recargar} />

  return <Outlet context={{ materias, grafo }} />
}
