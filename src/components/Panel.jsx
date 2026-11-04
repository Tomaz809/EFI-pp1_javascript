// Recuadro blanco donde va el contenido de cada vista
export default function Panel({ children, className = "" }) {
  return <section className={`bg-white px-6 sm:px-10 py-8 ${className}`}>{children}</section>
}
