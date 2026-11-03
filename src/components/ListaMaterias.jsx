import { Link } from "react-router-dom"

// Lista simple de materias con link al detalle y una acción opcional
export default function ListaMaterias({ materias, color, vacio, accion }) {
  if (materias.length === 0) {
    return <p className="text-zinc-400 py-4">{vacio}</p>
  }

  return (
    <ul className="flex flex-col gap-2">
      {materias.map((m) => (
        <li
          key={m.id}
          className={`flex justify-between items-center gap-4 bg-zinc-800 p-3 rounded border-l-4 ${color}`}
        >
          <Link to={`/materia/${m.id}`} className="hover:underline">
            {m.nombre_materia}
            <span className="text-zinc-500 text-sm ml-2">{m.anio}° año</span>
          </Link>
          {accion && accion(m)}
        </li>
      ))}
    </ul>
  )
}
