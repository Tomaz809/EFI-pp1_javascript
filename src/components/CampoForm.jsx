// Contenedor de un campo de formulario: label + input + mensaje de error
export default function CampoForm({ label, error, children }) {
  return (
    <div className="mt-4">
      <label className="block text-[13px] mb-1 text-zinc-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-700 mt-1">{error}</p>}
    </div>
  )
}

export const inputStyle =
  "w-full px-2 py-1.5 bg-white border border-zinc-300 outline-none focus:border-zinc-500"
