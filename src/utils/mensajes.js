import { destrabaDe } from "./correlativas"

// Según si la materia es correlativa de otras, define el color de la barra
// y el mensaje que se muestra al inscribirse
export function estadoInscripcion(materia, materias, grafo) {
  const destraba = destrabaDe(materia.id, grafo)

  if (destraba.size === 0) {
    return {
      estado: "sin_correlativa",
      mensaje: "OJO! Si no tenés tiempo para cursar todo el año, priorizá otra materia con correlativa.",
    }
  }

  const nombres = materias
    .filter((m) => (grafo.habilita[materia.id] ?? []).includes(m.id))
    .map((m) => m.nombre_materia)

  return {
    estado: "con_correlativa",
    mensaje: `Cuenta con correlativa: es requisito de ${nombres.join(", ")}.`,
  }
}
