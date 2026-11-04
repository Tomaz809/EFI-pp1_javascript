import { destrabaDe } from "./correlativas"

// Une nombres en español: "A", "A y B", "A, B y C"
function unir(nombres) {
  if (nombres.length <= 1) return nombres.join("")
  return `${nombres.slice(0, -1).join(", ")} y ${nombres[nombres.length - 1]}`
}

// Según si la materia es correlativa de otras, define el color de la barra
// y el mensaje que se muestra al inscribirse.
// Además, si alguna correlativa previa no figura como "aprobada" en la
// condición simulada, devuelve un aviso.
export function estadoInscripcion(materia, materias, grafo, condiciones = {}) {
  const nombre = (id) => materias.find((m) => m.id === id)?.nombre_materia

  const previasSinAprobar = (grafo.requisitos[materia.id] ?? [])
    .filter((id) => condiciones[id] !== "aprobada")
    .map(nombre)
    .filter(Boolean)

  const aviso =
    previasSinAprobar.length > 0
      ? `Atención: para cursar ${materia.nombre_materia} tenés que aprobar antes ${unir(previasSinAprobar)}.`
      : null

  const destraba = destrabaDe(materia.id, grafo)

  if (destraba.size === 0) {
    return {
      estado: "sin_correlativa",
      mensaje: "OJO! Si no tenés tiempo para cursar todo el año, priorizá otra materia con correlativa.",
      aviso,
    }
  }

  const nombres = (grafo.habilita[materia.id] ?? []).map(nombre).filter(Boolean)

  return {
    estado: "con_correlativa",
    mensaje: `Cuenta con correlativa: es requisito de ${unir(nombres)}.`,
    aviso,
  }
}
