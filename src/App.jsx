import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import { PlanProvider } from './context/PlanContext'
import AgregarMateria from './pages/AgregarMateria'
import CorrelativasPrevias from './pages/CorrelativasPrevias'
import Cursada from './pages/Cursada'
import Favoritos from './pages/Favoritos'
import Home from './pages/Home'
import MateriaDetalle from './pages/MateriaDetalle'
import Materias from './pages/Materias'
import MateriasQueDestraba from './pages/MateriasQueDestraba'
import NotFound from './pages/NotFound'
import PlanAnio from './pages/PlanAnio'
import PlanCompleto from './pages/PlanCompleto'

function App() {
  // Menú lateral desplegable en celulares
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <PlanProvider>
      <div className="min-h-screen bg-sitec-bg text-zinc-800">
        <Topbar onToggleMenu={() => setMenuAbierto((v) => !v)} />

        <div className="flex">
          <Sidebar abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />

          <div className="flex-1 min-w-0 flex flex-col min-h-[calc(100vh-3rem)]">
            <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 py-8">
              <Routes>
                <Route path="/" element={<Home />} />

                {/* Ruta con subrutas anidadas: plan completo y filtro por año */}
                <Route path="/materias" element={<Materias />}>
                  <Route index element={<PlanCompleto />} />
                  <Route path="anio/:anio" element={<PlanAnio />} />
                </Route>

                {/* Ruta dinámica con subrutas: previas y lo que destraba */}
                <Route path="/materia/:id" element={<MateriaDetalle />}>
                  <Route index element={<CorrelativasPrevias />} />
                  <Route path="destraba" element={<MateriasQueDestraba />} />
                </Route>

                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/cursada" element={<Cursada />} />
                <Route path="/agregar" element={<AgregarMateria />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </PlanProvider>
  )
}

export default App
