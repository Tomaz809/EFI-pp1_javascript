export default function ErrorMessage({ mensaje, onReintentar }) {
  return (
    <div className="max-w-xl mx-auto my-10 bg-red-50 border border-red-200 text-red-800 p-6 rounded-lg text-center">
      <p className="font-bold text-lg">No se pudieron cargar los datos</p>
      <p className="text-sm mt-1">{mensaje}</p>
      {onReintentar && (
        <button
          onClick={onReintentar}
          className="mt-4 bg-itec-700 hover:bg-itec-600 text-white text-sm px-4 py-2 rounded cursor-pointer"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}
