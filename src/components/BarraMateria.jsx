// Barra de una materia, siguiendo fielmente el boceto de "Inscripciones Para Cursar"
// estado: "libre" (sin inscribir), "sin_correlativa" (gris) o "con_correlativa" (amarillo)
const ESTILOS = {
  libre: "bg-sitec-barra text-white shadow-xs",
  sin_correlativa: "bg-sitec-gris text-white shadow-xs",
  con_correlativa: "bg-sitec-amarillo text-zinc-900 shadow-xs font-medium",
}

export default function BarraMateria({
  materia,
  estado = "libre",
  mensaje,
  aviso,
  onToggle,
  textoBoton,
}) {
  const inscripta = estado !== "libre"

  return (
    <li className="list-none">
      <div
        className={`flex items-center justify-between gap-4 pl-6 sm:pl-8 pr-4 py-3.5 transition-colors duration-150 ${ESTILOS[estado]}`}
      >
        <div className="flex-1 min-w-0 pr-2">
          <span className="text-[16px] sm:text-[17px] tracking-wide block truncate">
            {materia.nombre_materia}
          </span>
          <span className="text-[11px] opacity-75 block">
            Cód. {materia.codigo} · {materia.anio}° año · {materia.cuatrimestral ? "Cuatrimestral" : "Anual"}
          </span>
        </div>

        <button
          onClick={() => onToggle(materia.id)}
          title={textoBoton}
          aria-label={`${textoBoton} ${materia.nombre_materia}`}
          aria-pressed={inscripta}
          className={`w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full cursor-pointer transition-all duration-150 flex items-center justify-center text-lg shadow-sm
            ${
              inscripta
                ? "bg-white text-zinc-900 font-bold scale-105 ring-2 ring-black/20"
                : "bg-zinc-600/80 hover:bg-zinc-500 text-transparent hover:scale-105"
            }`}
        >
          ✓
        </button>
      </div>

      {/* Alerta de correlativas no aprobadas */}
      {inscripta && aviso && (
        <div
          role="alert"
          className="bg-red-50 border-l-4 border-sitec-rojo text-sitec-rojo text-[13px] font-semibold pl-4 pr-3 py-2 mt-1.5 shadow-xs"
        >
          ⚠ {aviso}
        </div>
      )}

      {/* Mensaje según si tiene o no correlativas (Mockup 1) */}
      {inscripta && mensaje && (
        <div className="bg-zinc-100 border-l-4 border-zinc-400 text-[13px] text-zinc-700 pl-4 pr-3 py-1.5 mt-1">
          {mensaje}
        </div>
      )}
    </li>
  )
}
