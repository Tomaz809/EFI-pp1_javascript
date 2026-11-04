// Contenedor de un campo de formulario: label + mensaje de error + input
export default function CampoForm({ label, error, children }) {
  return (
    <div className="mt-4">
      <label className="block text-sm mb-1 font-semibold text-zinc-700">{label}</label>
      {children}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}

export const inputStyle =
  "w-full px-3 py-2 rounded bg-white border border-zinc-300 focus:border-itec-600 focus:ring-2 focus:ring-itec-100 outline-none"
