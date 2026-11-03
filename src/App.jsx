import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
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
  return (
    <div className="min-h-screen flex flex-col justify-between bg-zinc-900 text-zinc-100">
      <PlanProvider>
        <Navbar />

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

        <Footer />
      </PlanProvider>
    </div>
  )
}

export default App
