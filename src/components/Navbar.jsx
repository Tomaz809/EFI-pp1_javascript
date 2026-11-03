import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { PlanContext } from "../context/PlanContext"

export default function Navbar() {
  const { favoritas, cursada } = useContext(PlanContext)

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-400 font-bold"
      : "text-zinc-300 hover:text-blue-400 transition-colors"

  return (
    <nav className="flex flex-wrap gap-4 justify-between items-center bg-slate-900 px-6 py-4 shadow-2xl">
      <Link to="/" className="text-xl font-extrabold text-blue-500">
        Plan<span className="text-zinc-100">ITEC</span>
      </Link>

      <ul className="flex flex-wrap gap-6 text-sm items-center">
        <li><NavLink to="/" end className={linkStyle}>Inicio</NavLink></li>
        <li><NavLink to="/materias" className={linkStyle}>Plan de estudios</NavLink></li>
        <li>
          <NavLink to="/favoritos" className={linkStyle}>
            Favoritas
            {favoritas.length > 0 && (
              <span className="ml-1 bg-violet-600 text-white text-xs px-2 rounded-full">{favoritas.length}</span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/cursada" className={linkStyle}>
            Mi cursada
            {cursada.length > 0 && (
              <span className="ml-1 bg-blue-600 text-white text-xs px-2 rounded-full">{cursada.length}</span>
            )}
          </NavLink>
        </li>
        <li><NavLink to="/agregar" className={linkStyle}>Agregar</NavLink></li>
      </ul>
    </nav>
  )
}
