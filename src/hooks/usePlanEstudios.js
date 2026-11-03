import { useCallback, useEffect, useMemo, useState } from "react"
import { getCorrelativas, getMaterias } from "../services/api"
import { construirGrafo } from "../utils/correlativas"

// Hook que trae materias y correlativas de la API.
// Maneja con useState los datos, el indicador de carga y el error.
export default function usePlanEstudios() {
  const [materias, setMaterias] = useState([])
  const [correlativas, setCorrelativas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [recargas, setRecargas] = useState(0)

  // Permite volver a pedir los datos (por ejemplo después de borrar algo)
  const recargar = useCallback(() => setRecargas((n) => n + 1), [])

  useEffect(() => {
    let cancelado = false

    async function cargar() {
      setLoading(true)
      setError(null)
      try {
        // Las dos peticiones se hacen en paralelo
        const [dataMaterias, dataCorrelativas] = await Promise.all([
          getMaterias(),
          getCorrelativas(),
        ])
        if (!cancelado) {
          setMaterias(dataMaterias)
          setCorrelativas(dataCorrelativas)
        }
      } catch (err) {
        if (!cancelado) setError(err.message)
      } finally {
        if (!cancelado) setLoading(false)
      }
    }

    cargar()
    // Si el componente se desmonta antes de que llegue la respuesta, no actualizamos el estado
    return () => {
      cancelado = true
    }
  }, [recargas])

  const grafo = useMemo(() => construirGrafo(correlativas), [correlativas])

  return { materias, correlativas, grafo, loading, error, recargar }
}
