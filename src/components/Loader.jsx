export default function Loader({ texto = "Cargando..." }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-zinc-400">{texto}</p>
    </div>
  )
}
