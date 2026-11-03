// Contenedor de un campo de formulario: label + mensaje de error + input
export default function CampoForm({ label, error, children }) {
  return (
    <div className="mt-4">
      <label className="block text-sm mb-1 text-zinc-300">{label}</label>
      {children}
      {error && <p className="text-sm text-red-400 mt-1 animate-pulse">{error}</p>}
    </div>
  )
}

export const inputStyle =
  "w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700 focus:border-blue-500 outline-none"
