// Tarjeta de resumen, como las de "Aprobadas / Regulares / Cursando" de SITEC
export default function StatCard({ icono, titulo, valor, detalle, color = "text-zinc-700" }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm">
      <p className={`text-xs font-semibold flex items-center gap-1.5 ${color}`}>
        <span>{icono}</span>
        {titulo}
      </p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{valor}</p>
      <p className="text-[11px] text-zinc-500 mt-1">{detalle}</p>
    </div>
  )
}
