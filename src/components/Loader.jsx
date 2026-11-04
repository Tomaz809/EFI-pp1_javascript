export default function Loader({ texto = "Cargando..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <div className="w-8 h-8 border-4 border-zinc-400 border-t-transparent rounded-full animate-spin" />
      <p className="text-zinc-500 text-sm">{texto}</p>
    </div>
  )
}
