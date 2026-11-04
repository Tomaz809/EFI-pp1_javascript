import PageHeader from "../components/PageHeader"
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
    <main>
      <PageHeader
        titulo="Cargar plan de estudios"
        subtitulo="Agregá materias y sus correlativas. Se guardan en la API."
      />

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <FormMateria materias={materias} carreras={carreras} onCreada={recargar} />
        <FormCorrelativa materias={materias} correlativas={correlativas} onCreada={recargar} />
      </div>
    </main>
  )
}
