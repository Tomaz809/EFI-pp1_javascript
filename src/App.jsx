import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import FavoritosModal from './components/FavoritosModal'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import { PlanProvider } from './context/PlanContext'
import AgregarMateria from './pages/AgregarMateria'
import Condicion from './pages/Condicion'
import CorrelativasPrevias from './pages/CorrelativasPrevias'
import Home from './pages/Home'
import InscribirCursar from './pages/InscribirCursar'
import Inscripciones from './pages/Inscripciones'
import MateriaDetalle from './pages/MateriaDetalle'
import Materias from './pages/Materias'
import MateriasQueDestraba from './pages/MateriasQueDestraba'
import NotFound from './pages/NotFound'
import PlanAnio from './pages/PlanAnio'
import PlanCompleto from './pages/PlanCompleto'
import VerInscripciones from './pages/VerInscripciones'

function App() {
  // Menú lateral desplegable en celulares
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <PlanProvider>
      <div className="min-h-screen bg-sitec-bg text-zinc-800">
        <Topbar onToggleMenu={() => setMenuAbierto((v) => !v)} />

        <div className="flex">
          <Sidebar abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />

          <div className="flex-1 min-w-0 px-4 sm:px-10 py-8">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Home />} />

                {/* Rutas anidadas: Inscripciones > Cursar / Ver Inscripciones */}
                <Route path="/inscripciones" element={<Inscripciones />}>
                  <Route index element={<Navigate to="cursar" replace />} />
                  <Route path="cursar" element={<InscribirCursar />} />
                  <Route path="ver" element={<VerInscripciones />} />
                </Route>

                <Route path="/estado-cursada" element={<Condicion />} />

                {/* Rutas anidadas: plan completo y filtro por año */}
                <Route path="/materias" element={<Materias />}>
                  <Route index element={<PlanCompleto />} />
                  <Route path="anio/:anio" element={<PlanAnio />} />
                </Route>

                {/* Ruta dinámica con subrutas: correlativas y lo que destraba */}
                <Route path="/materia/:id" element={<MateriaDetalle />}>
                  <Route index element={<CorrelativasPrevias />} />
                  <Route path="destraba" element={<MateriasQueDestraba />} />
                </Route>

                <Route path="/agregar" element={<AgregarMateria />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>

        {/* Panel de favoritos (se abre desde la barra superior) */}
        <FavoritosModal />
      </div>
    </PlanProvider>
  )
}

export default App
