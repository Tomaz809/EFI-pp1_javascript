import { CheckCircle2, Star, Info, AlertTriangle, X } from "lucide-react"

// Componente Toast flotante para notificaciones sutiles y no invasivas
export default function Toast({ toast, onCerrar }) {
  if (!toast) return null

  const { mensaje, tipo } = toast

  const iconos = {
    ok: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
    star: <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />,
    warn: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />,
    info: <Info className="w-4 h-4 text-sky-400 shrink-0" />,
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-zinc-900/95 text-white shadow-2xl rounded-lg border border-zinc-700/80 backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-3 max-w-sm">
      {iconos[tipo] ?? iconos.info}
      <span className="text-xs font-medium text-zinc-100 flex-1 leading-snug">
        {mensaje}
      </span>
      <button
        onClick={onCerrar}
        className="text-zinc-400 hover:text-white cursor-pointer ml-1"
        aria-label="Cerrar notificación"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
