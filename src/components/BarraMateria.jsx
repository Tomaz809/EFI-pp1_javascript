<<<<<<< Updated upstream
// Barra de una materia, siguiendo fielmente el boceto de "Inscripciones Para Cursar"
// estado: "libre" (sin inscribir), "sin_correlativa" (gris) o "con_correlativa" (amarillo)
const ESTILOS = {
  libre: "bg-sitec-barra text-white shadow-xs",
  sin_correlativa: "bg-sitec-gris text-white shadow-xs",
  con_correlativa: "bg-sitec-amarillo text-zinc-900 shadow-xs font-medium",
=======
import { useState } from "react"

// Estilos de la barra con colores bien diferenciados:
// - cursando: Azul Institucional SITEC (#1d4ed8)
// - correlativa_destrabada: Amarillo/Dorado Mostaza (bg-amber-400 text-zinc-950)
// - sin_correlativa: Gris Pizarra (#64748b text-white con aviso OJO)
// - libre: Gris Oscuro SITEC (#343a40 text-white)
// - bloqueada: Carbón mate (#2a2f35 text-zinc-300)
const ESTILOS = {
  cursando: "bg-[#1d4ed8] text-white shadow-md font-medium border-l-4 border-sky-300",
  correlativa_destrabada: "bg-amber-400 text-zinc-950 shadow-md font-semibold border-l-4 border-amber-600",
  sin_correlativa: "bg-[#64748b] text-white shadow-xs border-l-4 border-zinc-400 font-medium",
  libre: "bg-sitec-barra text-white shadow-xs border-l-4 border-transparent hover:bg-sitec-barra/90",
  bloqueada: "bg-[#2a2f35] text-zinc-300 shadow-xs border-l-4 border-zinc-600 opacity-95",
>>>>>>> Stashed changes
}

export default function BarraMateria({
  materia,
  estado = "libre",
  mensaje,
  aviso,
  onToggle,
  textoBoton,
<<<<<<< Updated upstream
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
=======
  esDelAnioActual = true,
  anioActual = 1,
  estaResaltada = false,
  habilitaNombres = [],
  requisitosDetalle = [],
  requisitosInscriptos = false,
  onHover,
  onLeave,
}) {
  const [alertaBloqueo, setAlertaBloqueo] = useState(false)
  const inscripta = estado === "cursando" || (esDelAnioActual && estado === "sin_correlativa")

  const handleBotonClick = () => {
    if (!esDelAnioActual) {
      setAlertaBloqueo(true)
      setTimeout(() => setAlertaBloqueo(false), 3500)
      return
    }
    if (onToggle) onToggle(materia.id)
  }

  const faltantes = requisitosDetalle.filter((r) => !r.inscripto)
  const cumplidos = requisitosDetalle.filter((r) => r.inscripto)

  return (
    <li
      className="list-none transition-all duration-200"
      onMouseEnter={() => onHover && onHover(materia.id)}
      onMouseLeave={() => onLeave && onLeave()}
    >
      <div
        className={`relative flex items-center justify-between gap-3 pl-4 sm:pl-5 pr-3.5 py-3.5 transition-all duration-200 ${
          ESTILOS[estado] ?? ESTILOS.libre
        } ${
          estaResaltada
            ? "ring-3 ring-sky-400 shadow-xl scale-[1.02] z-10"
            : ""
        }`}
      >
        <div className="flex-1 min-w-0 pr-1">
          <span className="text-[14px] sm:text-[15px] tracking-wide font-medium block truncate">
            {materia.nombre_materia}
          </span>
          <span className="text-[11px] opacity-80 block mt-0.5">
>>>>>>> Stashed changes
            Cód. {materia.codigo} · {materia.anio}° año · {materia.cuatrimestral ? "Cuatrimestral" : "Anual"}
          </span>
        </div>

        {/* Botón circular de inscripción / candado informativo */}
        <button
          type="button"
          onClick={handleBotonClick}
          title={
            esDelAnioActual
              ? textoBoton
              : `Materia de ${materia.anio}° año (Solo podés inscribirte a materias de tu año actual: ${anioActual}° año)`
          }
          aria-label={`${textoBoton} ${materia.nombre_materia}`}
          aria-pressed={inscripta}
<<<<<<< Updated upstream
          className={`w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full cursor-pointer transition-all duration-150 flex items-center justify-center text-lg shadow-sm
            ${
              inscripta
                ? "bg-white text-zinc-900 font-bold scale-105 ring-2 ring-black/20"
                : "bg-zinc-600/80 hover:bg-zinc-500 text-transparent hover:scale-105"
            }`}
=======
          className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full cursor-pointer transition-all duration-150 flex items-center justify-center text-sm sm:text-base shadow-sm ${
            !esDelAnioActual
              ? "bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 border border-zinc-600/50"
              : inscripta
                ? "bg-white text-blue-900 font-bold scale-105 ring-2 ring-black/25 shadow-md"
                : "bg-zinc-600/80 hover:bg-zinc-500 text-transparent hover:scale-105"
          }`}
>>>>>>> Stashed changes
        >
          {!esDelAnioActual ? (
            <span className="text-xs select-none" title="Materia de otro ciclo lectivo">
              🔒
            </span>
          ) : inscripta ? (
            <span className="select-none font-bold">✓</span>
          ) : (
            "✓"
          )}
        </button>
      </div>

<<<<<<< Updated upstream
      {/* Alerta de correlativas no aprobadas */}
      {inscripta && aviso && (
        <div
          role="alert"
          className="bg-red-50 border-l-4 border-sitec-rojo text-sitec-rojo text-[13px] font-semibold pl-4 pr-3 py-2 mt-1.5 shadow-xs"
=======
      {/* Alerta si intenta inscribirse en una materia de otro año */}
      {alertaBloqueo && (
        <div className="bg-amber-100 border-l-4 border-amber-600 text-amber-950 text-xs px-3.5 py-2 mt-2 shadow-sm animate-in slide-in-from-top-1 duration-150 flex items-center justify-between">
          <span>
            ⚠️ <strong>Año bloqueado:</strong> Estás cursando <strong>{anioActual}° año</strong>. Solo podés inscribirte a materias de tu año en curso.
          </span>
          <button
            onClick={() => setAlertaBloqueo(false)}
            className="text-amber-800 hover:text-black font-bold ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Alerta de correlativas previas no aprobadas */}
      {inscripta && aviso && (
        <div
          role="alert"
          className="bg-red-50 border-l-4 border-sitec-rojo text-sitec-rojo text-[12px] font-semibold pl-3.5 pr-3 py-2 mt-2 shadow-2xs"
>>>>>>> Stashed changes
        >
          ⚠ {aviso}
        </div>
      )}

<<<<<<< Updated upstream
      {/* Mensaje según si tiene o no correlativas (Mockup 1) */}
      {inscripta && mensaje && (
        <div className="bg-zinc-100 border-l-4 border-zinc-400 text-[13px] text-zinc-700 pl-4 pr-3 py-1.5 mt-1">
          {mensaje}
=======
      {/* Si está inscripta: detalles de materias que destraba o advertencia OJO */}
      {inscripta && (
        <div className="mt-2 space-y-1">
          {habilitaNombres.length > 0 ? (
            <div className="bg-blue-50 border border-blue-200 p-2.5 text-xs text-blue-950 flex flex-wrap items-center gap-1.5 shadow-2xs">
              <span className="font-semibold text-blue-900">
                ⚡ Destraba en años superiores:
              </span>
              <div className="flex flex-wrap gap-1 mt-0.5 sm:mt-0">
                {habilitaNombres.map((nom) => (
                  <span
                    key={nom}
                    className="bg-blue-100 text-blue-900 font-semibold px-2 py-0.5 rounded text-[11px] border border-blue-300"
                  >
                    {nom}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-zinc-100 border-l-4 border-zinc-500 text-[12px] text-zinc-800 pl-3.5 pr-3 py-2 font-medium shadow-2xs">
              ⚠ {mensaje}
            </div>
          )}
        </div>
      )}

      {/* Si es materia de otro año: desglose exacto de qué correlativas tiene inscriptas y cuáles faltan */}
      {!esDelAnioActual && requisitosDetalle.length > 0 && (
        <div className="bg-zinc-50 border border-zinc-200/90 p-2.5 mt-2 text-[11px] text-zinc-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between gap-1 border-b border-zinc-200 pb-1">
            <span className="font-semibold text-zinc-600">Requisitos previos:</span>
            {requisitosInscriptos ? (
              <span className="text-emerald-700 font-bold bg-emerald-100 border border-emerald-300 px-1.5 py-0.2 rounded text-[10px]">
                ✓ Habilitada al 100%
              </span>
            ) : (
              <span className="text-amber-800 font-semibold bg-amber-100 border border-amber-300 px-1.5 py-0.2 rounded text-[10px]">
                Pendiente ({cumplidos.length}/{requisitosDetalle.length})
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1 pt-0.5">
            {cumplidos.map((r) => (
              <span
                key={r.id}
                className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 px-1.5 py-0.2 rounded text-[10px] font-medium"
                title="Correlativa inscripta"
              >
                ✓ {r.nombre}
              </span>
            ))}
            {faltantes.map((r) => (
              <span
                key={r.id}
                className="inline-flex items-center gap-0.5 bg-zinc-200/80 text-zinc-700 border border-zinc-300 px-1.5 py-0.2 rounded text-[10px]"
                title="Falta inscribirte a esta correlativa"
              >
                ⏳ Falta: {r.nombre}
              </span>
            ))}
          </div>
>>>>>>> Stashed changes
        </div>
      )}
    </li>
  )
}
