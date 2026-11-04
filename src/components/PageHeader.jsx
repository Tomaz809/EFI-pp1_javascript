// Encabezado de cada vista, con el formato del módulo de SITEC
export default function PageHeader({ titulo, subtitulo, nuevo = false, children }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 pb-5 mb-6 border-b border-zinc-200">
      <div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
          {nuevo && (
            <span className="bg-itec-700 text-white font-bold px-2 py-0.5 rounded uppercase text-[10px]">
              Nuevo módulo
            </span>
          )}
          SITEC · Gestión Académica
        </div>
        <h1 className="text-3xl font-light text-zinc-800">{titulo}</h1>
        {subtitulo && <p className="text-sm text-zinc-500 mt-1">{subtitulo}</p>}
      </div>
      {children}
    </div>
  )
}
