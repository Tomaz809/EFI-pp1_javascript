const ITEMS = [
  { color: "bg-blue-500", texto: "Materia enfocada" },
  { color: "bg-amber-500", texto: "Correlativa previa (hay que aprobarla antes)" },
  { color: "bg-emerald-500", texto: "Materia que destraba" },
  { color: "bg-violet-500", texto: "Favorita / objetivo" },
  { color: "bg-rose-600", texto: "Cuello de botella de tu cursada" },
]

export default function Leyenda() {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-400">
      {ITEMS.map((item) => (
        <li key={item.texto} className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${item.color}`} />
          {item.texto}
        </li>
      ))}
    </ul>
  )
}
