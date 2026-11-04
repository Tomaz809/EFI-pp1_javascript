import { useOutletContext } from "react-router-dom"
import PlanGrid from "../components/PlanGrid"

// Subruta index de /materias: muestra todos los años
export default function PlanCompleto() {
  const { materias, todas, grafo } = useOutletContext()
  return <PlanGrid materias={materias} todasLasMaterias={todas} grafo={grafo} />
}
