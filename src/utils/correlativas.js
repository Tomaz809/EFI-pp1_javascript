// Lógica del plan de estudios: arma un "grafo" con las correlativas
// y permite saber qué materias son previas o cuáles se destraban.

// A partir de la lista de la API arma dos mapas:
//  requisitos[id] -> materias que necesito para cursar "id"
//  habilita[id]   -> materias que "id" destraba directamente
export function construirGrafo(correlativas) {
  const requisitos = {}
  const habilita = {}

  for (const { materia_id, correlativa_id } of correlativas) {
    if (!requisitos[materia_id]) requisitos[materia_id] = []
    requisitos[materia_id].push(correlativa_id)

    if (!habilita[correlativa_id]) habilita[correlativa_id] = []
    habilita[correlativa_id].push(materia_id)
  }

  return { requisitos, habilita }
}

// Recorre el mapa en cadena (directas e indirectas) sin repetir materias.
function recorrer(id, mapa) {
  const visitadas = new Set()
  const pendientes = [...(mapa[id] ?? [])]

  while (pendientes.length > 0) {
    const actual = pendientes.pop()
    if (visitadas.has(actual)) continue
    visitadas.add(actual)
    pendientes.push(...(mapa[actual] ?? []))
  }

  return visitadas
}

// Todas las materias que hay que aprobar antes (toda la cadena hacia atrás)
export const previasDe = (id, grafo) => recorrer(id, grafo.requisitos)

// Todas las materias que se destraban (toda la cadena hacia adelante)
export const destrabaDe = (id, grafo) => recorrer(id, grafo.habilita)

// Estado visual de una materia cuando hay una materia en "Modo Enfoque"
export function estadoEnEnfoque(id, enfocada, grafo) {
  if (enfocada === null) return "normal"
  if (id === enfocada) return "enfocada"
  if (previasDe(enfocada, grafo).has(id)) return "previa"
  if (destrabaDe(enfocada, grafo).has(id)) return "destraba"
  return "apagada"
}

// Asistente de cursada:
// recibe las materias marcadas para cursar y las ordena por cuántas materias destraban.
// En cada año, la que más destraba es el "cuello de botella" (cursarla sí o sí).
// Si no destraba nada es "postergable".
export function analizarCursada(seleccionadas, grafo) {
  const analisis = seleccionadas.map((materia) => {
    const destraba = destrabaDe(materia.id, grafo)
    const directas = grafo.habilita[materia.id] ?? []
    return { materia, totalDestraba: destraba.size, directas: directas.length }
  })

  const maximoPorAnio = {}
  for (const item of analisis) {
    const anio = item.materia.anio
    maximoPorAnio[anio] = Math.max(maximoPorAnio[anio] ?? 0, item.totalDestraba)
  }

  return analisis
    .map((item) => {
      let prioridad = "recomendada"
      if (item.totalDestraba === 0) prioridad = "postergable"
      else if (item.totalDestraba === maximoPorAnio[item.materia.anio]) prioridad = "cuello"
      return { ...item, prioridad }
    })
    .sort((a, b) => a.materia.anio - b.materia.anio || b.totalDestraba - a.totalDestraba)
}

// Ids de materias que son cuello de botella dentro de la cursada elegida
export function idsCuelloDeBotella(materias, cursada, grafo) {
  const seleccionadas = materias.filter((m) => cursada.includes(m.id))
  return new Set(
    analizarCursada(seleccionadas, grafo)
      .filter((item) => item.prioridad === "cuello")
      .map((item) => item.materia.id)
  )
}
