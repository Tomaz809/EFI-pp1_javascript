import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <main className="text-center py-20">
      <h1 className="text-5xl text-zinc-800">404</h1>
      <p className="text-zinc-500 mt-4">La página que buscás no existe.</p>
      <Link to="/" className="inline-block mt-4 text-sitec-rojo hover:underline">Volver al inicio</Link>
    </main>
  )
}
