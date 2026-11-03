import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col justify-center items-center gap-4 py-20">
      <h1 className="text-6xl font-extrabold text-blue-500">404</h1>
      <p className="text-zinc-400">La página que buscás no existe.</p>
      <Link to="/" className="text-indigo-400 hover:underline">← Volver al inicio</Link>
    </main>
  )
}
