// Recuadro blanco institucional donde se presenta el contenido de cada módulo
export default function Panel({ children, className = "" }) {
  return (
    <section className={`bg-white px-6 sm:px-10 py-8 border border-zinc-200/80 shadow-2xs ${className}`}>
      {children}
    </section>
  )
}
