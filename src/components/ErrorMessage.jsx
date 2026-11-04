export default function ErrorMessage({ mensaje, onReintentar }) {
  return (
    <div className="max-w-xl mx-auto my-10 bg-white border border-zinc-300 border-l-4 border-l-sitec-rojo p-5">
      <p className="text-zinc-800">No se pudieron cargar los datos</p>
      <p className="text-sm text-zinc-500 mt-1">{mensaje}</p>
      {onReintentar && (
        <button
          onClick={onReintentar}
          className="mt-4 bg-sitec-rojo hover:bg-sitec-rojo-2 text-white text-sm px-4 py-1.5 cursor-pointer"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}
