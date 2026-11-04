import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col justify-center items-center gap-4 py-20">
      <h1 className="text-6xl font-extrabold text-itec-700">404</h1>
      <p className="text-zinc-500">La página que buscás no existe.</p>
      <Link to="/" className="text-itec-700 hover:underline">← Volver al inicio</Link>
    </main>
  )
}
