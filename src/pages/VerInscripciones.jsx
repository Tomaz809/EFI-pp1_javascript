import { useContext } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { Printer, ArrowRight } from "lucide-react"
import BarraMateria from "../components/BarraMateria"
import PageHeader from "../components/PageHeader"
import Panel from "../components/Panel"
import { PlanContext } from "../context/PlanContext"
import { estadoInscripcion } from "../utils/mensajes"

// Subruta /inscripciones/ver: materias a las que el alumno se inscribió y comprobante imprimible
export default function VerInscripciones() {
  const { materias, grafo } = useOutletContext()
  const { cursada, toggleCursada, limpiarCursada, condiciones } = useContext(PlanContext)

  const inscriptas = materias
    .filter((m) => cursada.includes(m.id))
    .sort((a, b) => a.anio - b.anio || a.codigo - b.codigo)

  return (
    <main>
      {/* Encabezado en pantalla */}
      <div className="no-print">
        <PageHeader
          titulo="Ver Inscripciones"
          subtitulo="Carrera :DESARROLLO DE SOFTWARE _ Inscripciones activas a cursar"
        >
          {inscriptas.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-black text-white px-3.5 py-1.5 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
                title="Imprimir o guardar como PDF el comprobante de inscripción oficial"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir Comprobante</span>
              </button>

              <button
                onClick={limpiarCursada}
                className="text-xs text-zinc-500 hover:text-sitec-rojo font-medium cursor-pointer transition-colors"
              >
                Dar de baja todas
              </button>
            </div>
          )}
        </PageHeader>
      </div>

      {/* Contenido en pantalla */}
      <div className="no-print">
        <Panel>
          {inscriptas.length === 0 ? (
            <div className="py-6 text-center sm:text-left">
              <p className="text-zinc-600 mb-3">
                No tenés inscripciones activas para este cuatrimestre.
              </p>
              <Link
                to="/inscripciones/cursar"
                className="inline-flex items-center gap-2 bg-sitec-barra hover:bg-sitec-rojo text-white px-5 py-2 text-sm font-medium transition-colors"
              >
                <span>Ir a Inscripciones Para Cursar</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              <p className="text-xs text-zinc-500 mb-4">
                Listado oficial de materias en las que estás registrado como estudiante regular. Podés emitir tu comprobante tocando el botón de arriba.
              </p>
              <ul className="flex flex-col gap-3.5 max-w-xl">
                {inscriptas.map((materia) => {
                  const { estado, mensaje, aviso } = estadoInscripcion(
                    materia,
                    materias,
                    grafo,
                    condiciones
                  )
                  return (
                    <BarraMateria
                      key={materia.id}
                      materia={materia}
                      estado={estado}
                      mensaje={mensaje}
                      aviso={aviso}
                      onToggle={toggleCursada}
                      textoBoton="Dar de baja de la cursada"
                    />
                  )
                })}
              </ul>
            </>
          )}
        </Panel>
      </div>

      {/* COMPROBANTE OFICIAL IMPRIMIBLE (Solo se muestra al presionar Imprimir o exportar PDF) */}
      <div className="hidden print:block font-sans text-zinc-900 p-4">
        {/* Encabezado con logos institucionales */}
        <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-4 mb-6">
          <div className="flex items-center gap-3.5">
            <img src="/iteclogo.jpg" alt="ITEC" className="h-16 w-auto object-contain" />
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">ITEC RÍO CUARTO</h1>
              <p className="text-xs text-zinc-600 font-medium">
                Instituto Técnico de Río Cuarto · Sistema SITEC de Autogestión
              </p>
            </div>
          </div>
          <div className="text-right text-xs">
            <span className="inline-block bg-zinc-100 border border-zinc-400 font-bold px-2 py-0.5 rounded text-[11px] uppercase">
              Comprobante Oficial
            </span>
            <p className="text-zinc-500 mt-1 font-mono">
              Fecha: {new Date().toLocaleDateString("es-AR")}
            </p>
          </div>
        </div>

        {/* Datos del estudiante y carrera */}
        <div className="bg-zinc-50 border border-zinc-300 p-4 mb-6 rounded text-xs grid grid-cols-2 gap-4">
          <div>
            <p className="mb-1">
              <strong className="text-zinc-700">Estudiante:</strong> ALUMNO, ITEC (CASTELO, TOMÁS)
            </p>
            <p>
              <strong className="text-zinc-700">Carrera:</strong> Tecnicatura Superior en Desarrollo de Software
            </p>
          </div>
          <div>
            <p className="mb-1">
              <strong className="text-zinc-700">Ciclo Lectivo:</strong> 2026
            </p>
            <p>
              <strong className="text-zinc-700">Total Materias Inscriptas:</strong> {inscriptas.length}
            </p>
          </div>
        </div>

        {/* Tabla formal de materias inscriptas */}
        <table className="w-full text-xs border border-zinc-300 border-collapse mb-8">
          <thead>
            <tr className="bg-zinc-100 text-left border-b border-zinc-300 font-semibold">
              <th className="p-2.5 border-r border-zinc-300 w-16">Cód.</th>
              <th className="p-2.5 border-r border-zinc-300">Asignatura</th>
              <th className="p-2.5 border-r border-zinc-300 w-20">Año</th>
              <th className="p-2.5 border-r border-zinc-300 w-28">Régimen</th>
              <th className="p-2.5 w-32">Estado</th>
            </tr>
          </thead>
          <tbody>
            {inscriptas.map((m) => (
              <tr key={m.id} className="border-b border-zinc-200">
                <td className="p-2.5 border-r border-zinc-200 font-mono font-bold text-center">
                  {m.codigo}
                </td>
                <td className="p-2.5 border-r border-zinc-200 font-medium">
                  {m.nombre_materia}
                </td>
                <td className="p-2.5 border-r border-zinc-200 text-center">
                  {m.anio}° Año
                </td>
                <td className="p-2.5 border-r border-zinc-200 text-center">
                  {m.cuatrimestral ? "Cuatrimestral" : "Anual"}
                </td>
                <td className="p-2.5 font-semibold text-emerald-800 text-center">
                  Inscripto a Cursada
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Firmas oficiales de Secretaría y Estudiante */}
        <div className="flex justify-between items-end pt-14 mt-10 border-t border-zinc-300 text-[11px] text-zinc-600 text-center">
          <div>
            <div className="w-52 border-b border-zinc-500 mb-2" />
            <p className="font-semibold text-zinc-800">Firma del Estudiante</p>
            <p className="text-[10px] text-zinc-400">DNI / Matrícula</p>
          </div>
          <div>
            <div className="w-52 border-b border-zinc-500 mb-2" />
            <p className="font-semibold text-zinc-800">Sello de Secretaría Académica</p>
            <p className="text-[10px] text-zinc-400">ITEC Río Cuarto</p>
          </div>
        </div>
      </div>
    </main>
  )
}
