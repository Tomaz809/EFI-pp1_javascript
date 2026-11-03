import { useEffect, useState } from "react"
import ErrorMessage from "../components/ErrorMessage"
import FormCorrelativa from "../components/FormCorrelativa"
import FormMateria from "../components/FormMateria"
import Loader from "../components/Loader"
import usePlanEstudios from "../hooks/usePlanEstudios"
import { getCarreras } from "../services/api"

export default function AgregarMateria() {
  const { materias, correlativas, loading, error, recargar } = usePlanEstudios()
  const [carreras, setCarreras] = useState([])

  // Las carreras se usan para el select del formulario
  useEffect(() => {
    getCarreras()
      .then(setCarreras)
      .catch(() => setCarreras([]))
  }, [])

  if (loading) return <Loader />
  if (error) return <ErrorMessage mensaje={error} onReintentar={recargar} />

  return (
    <main className="max-w-5xl mx-auto w-full pt-6 px-4">
      <h1 className="text-3xl font-bold">Cargar plan de estudios</h1>
      <p className="text-zinc-400 text-sm mt-1 mb-6">
        Agregá materias y sus correlativas. Se guardan en la API.
      </p>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <FormMateria materias={materias} carreras={carreras} onCreada={recargar} />
        <FormCorrelativa materias={materias} correlativas={correlativas} onCreada={recargar} />
      </div>
    </main>
  )
}
