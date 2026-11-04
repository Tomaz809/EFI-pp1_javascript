// Encabezado de cada vista, como los títulos del SITEC
export default function PageHeader({ titulo, subtitulo, children }) {
  return (
    <div className="mb-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-2xl text-zinc-800">{titulo}</h1>
        {children}
      </div>
      {subtitulo && (
        <p className="text-[17px] text-zinc-700 mt-4 pb-2 border-b border-zinc-300">{subtitulo}</p>
      )}
    </div>
  )
}
