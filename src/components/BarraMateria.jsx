// Barra de una materia, como en el boceto de "Inscripciones Para Cursar".
// estado: "libre" (sin inscribir), "sin_correlativa" (gris) o "con_correlativa" (amarillo)
const ESTILOS = {
  libre: "bg-sitec-barra text-white",
  sin_correlativa: "bg-sitec-gris text-white",
  con_correlativa: "bg-sitec-amarillo text-zinc-900",
}

export default function BarraMateria({ materia, estado = "libre", mensaje, aviso, onToggle, textoBoton }) {
  const inscripta = estado !== "libre"

  return (
    <li>
      <div className={`flex items-center justify-between gap-4 pl-8 pr-4 py-3.5 transition-colors ${ESTILOS[estado]}`}>
        <span className="text-[17px]">{materia.nombre_materia}</span>

        <button
          onClick={() => onToggle(materia.id)}
          title={textoBoton}
          aria-label={`${textoBoton} ${materia.nombre_materia}`}
          aria-pressed={inscripta}
          className={`w-11 h-11 shrink-0 rounded-full cursor-pointer transition-colors flex items-center justify-center text-lg
            ${inscripta ? "bg-white text-zinc-800" : "bg-zinc-500 hover:bg-zinc-400 text-transparent"}`}
        >
          ✓
        </button>
      </div>

      {inscripta && aviso && (
        <p role="alert" className="text-[13px] text-sitec-rojo font-bold pl-8 pt-1.5">
          ⚠ {aviso}
        </p>
      )}
      {inscripta && mensaje && <p className="text-[13px] text-zinc-700 pl-8 pt-1.5 pb-1">{mensaje}</p>}
    </li>
  )
}
