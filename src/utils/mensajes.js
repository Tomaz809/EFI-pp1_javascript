import { destrabaDe } from "./correlativas"

// Une nombres en español: "A", "A y B", "A, B y C"
export function unir(nombres) {
  if (!nombres || nombres.length === 0) return ""
  if (nombres.length === 1) return nombres[0]
  return `${nombres.slice(0, -1).join(", ")} y ${nombres[nombres.length - 1]}`
}

// Según si la materia es correlativa de otras, define el color de la barra
// y el mensaje/badges que se muestran al inscribirse.
export function estadoInscripcion(materia, materias, grafo, condiciones = {}) {
  const nombre = (id) => materias.find((m) => m.id === id)?.nombre_materia

  const requisitosIds = grafo.requisitos[materia.id] ?? []
  const requisitosNombres = requisitosIds.map(nombre).filter(Boolean)

  const previasSinAprobar = requisitosIds
    .filter((id) => condiciones[id] !== "aprobada")
    .map(nombre)
    .filter(Boolean)

  const aviso =
    previasSinAprobar.length > 0
      ? `Atención: para cursar ${materia.nombre_materia} tenés que aprobar antes ${unir(previasSinAprobar)}.`
      : null

  const destrabaSet = destrabaDe(materia.id, grafo)
  const destrabaIds = Array.from(destrabaSet)

  const habilitaIds = grafo.habilita[materia.id] ?? []
  const habilitaNombres = habilitaIds.map(nombre).filter(Boolean)

  if (destrabaSet.size === 0) {
    return {
      estado: "sin_correlativa",
      mensaje: "OJO! Si no tenés tiempo para cursar todo el año, priorizá otra materia con correlativa.",
      aviso,
      tieneCorrelativas: false,
      habilitaIds,
      habilitaNombres,
      requisitosIds,
      requisitosNombres,
      previasSinAprobar,
    }
  }

  return {
    estado: "con_correlativa",
    mensaje: `Cuenta con correlativa: es requisito de ${unir(habilitaNombres)}.`,
    aviso,
    tieneCorrelativas: true,
    habilitaIds,
    habilitaNombres,
    requisitosIds,
    requisitosNombres,
    previasSinAprobar,
  }
}
