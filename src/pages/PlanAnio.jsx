import { useOutletContext, useParams } from "react-router-dom"
import PlanGrid from "../components/PlanGrid"

// Subruta anidada /materias/anio/:anio: filtra el plan por año
export default function PlanAnio() {
  const { anio } = useParams()
  const { materias, grafo } = useOutletContext()

  const delAnio = materias.filter((m) => m.anio === Number(anio))

  return <PlanGrid materias={delAnio} todasLasMaterias={materias} grafo={grafo} />
}
