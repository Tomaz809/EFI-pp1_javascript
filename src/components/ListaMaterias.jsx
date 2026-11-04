import { Link } from "react-router-dom"

// Lista simple de materias con link al detalle y una acción opcional
export default function ListaMaterias({ materias, color = "bg-sitec-barra text-white", vacio, accion }) {
  if (materias.length === 0) {
    return <p className="text-zinc-500 text-sm py-2">{vacio}</p>
  }

  return (
    <ul className="flex flex-col gap-2">
      {materias.map((m) => (
        <li key={m.id} className={`flex justify-between items-center gap-4 px-5 py-3 ${color}`}>
          <Link to={`/materia/${m.id}`} className="hover:underline">
            {m.nombre_materia}
            <span className="text-xs opacity-75 ml-2">{m.anio}° año</span>
          </Link>
          {accion && accion(m)}
        </li>
      ))}
    </ul>
  )
}
