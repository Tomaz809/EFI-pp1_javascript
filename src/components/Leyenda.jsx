const ITEMS = [
  { clase: "bg-sky-50 text-sky-700 border-sky-300", texto: "◎ Enfocada" },
  { clase: "bg-amber-100 text-amber-800 border-amber-300", texto: "Previa" },
  { clase: "bg-emerald-100 text-emerald-800 border-emerald-300", texto: "Destraba" },
  { clase: "bg-violet-50 text-violet-700 border-violet-300", texto: "★ Favorita" },
  { clase: "bg-itec-50 text-itec-700 border-itec-200", texto: "Cursar sí o sí" },
]

// Recuadro informativo con el régimen y los colores, como el aviso de SITEC
export default function Leyenda() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 bg-white border border-zinc-200 rounded-lg px-4 py-3 text-xs text-zinc-600">
      <p className="flex-1 min-w-64">
        <span className="text-itec-700 font-bold">ⓘ Régimen Académico ITeC:</span> para{" "}
        <strong>rendir</strong> una materia hay que tener <em>aprobadas</em> sus correlativas.
        Tildá <strong className="text-sky-700">Enfocar</strong> en una materia para ver su cadena.
      </p>
      <ul className="flex flex-wrap gap-2">
        {ITEMS.map((item) => (
          <li key={item.texto} className={`border px-2 py-0.5 rounded-full font-semibold ${item.clase}`}>
            {item.texto}
          </li>
        ))}
      </ul>
    </div>
  )
}
