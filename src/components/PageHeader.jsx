// Encabezado institucional de cada vista
export default function PageHeader({ titulo, subtitulo, children }) {
  return (
    <div className="mb-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-2xl sm:text-[26px] font-semibold text-zinc-800 tracking-tight">
          {titulo}
        </h1>
        {children}
      </div>
      {subtitulo && (
        <p className="text-[16px] sm:text-[17px] text-zinc-700 mt-3 pb-2.5 border-b border-zinc-300 font-normal">
          {subtitulo}
        </p>
      )}
    </div>
  )
}
