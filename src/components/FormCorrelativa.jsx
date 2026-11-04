import { useState } from "react"
import { createCorrelativa } from "../services/api"
import CampoForm, { inputStyle } from "./CampoForm"

const FORM_INICIAL = { materia_id: "", correlativa_id: "" }

export default function FormCorrelativa({ materias, correlativas, onCreada }) {
  const [form, setForm] = useState(FORM_INICIAL)
  const [errors, setErrors] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [mensaje, setMensaje] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const buscar = (id) => materias.find((m) => m.id === Number(id))

  const validate = () => {
    const newErrors = {}
    const materia = buscar(form.materia_id)
    const previa = buscar(form.correlativa_id)

    if (!materia) newErrors.materia_id = "Elegí la materia"
    if (!previa) newErrors.correlativa_id = "Elegí la correlativa"

    if (materia && previa) {
      if (materia.id === previa.id) {
        newErrors.correlativa_id = "Una materia no puede ser correlativa de sí misma"
      } else if (previa.anio > materia.anio) {
        newErrors.correlativa_id = "La correlativa no puede ser de un año posterior"
      } else if (
        correlativas.some((c) => c.materia_id === materia.id && c.correlativa_id === previa.id)
      ) {
        newErrors.correlativa_id = "Esa correlatividad ya existe"
      }
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje(null)

    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setEnviando(true)
    try {
      await createCorrelativa({
        materia_id: Number(form.materia_id),
        correlativa_id: Number(form.correlativa_id),
      })
      setMensaje({
        tipo: "ok",
        texto: `Ahora ${buscar(form.materia_id).nombre_materia} requiere ${buscar(form.correlativa_id).nombre_materia}`,
      })
      setForm(FORM_INICIAL)
      onCreada()
    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message })
    } finally {
      setEnviando(false)
    }
  }

  const ordenadas = [...materias].sort((a, b) => a.anio - b.anio || a.nombre_materia.localeCompare(b.nombre_materia))

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white border border-zinc-200 p-6 rounded-lg">
      <h2 className="text-xl font-bold">Nueva correlativa</h2>
      <p className="text-sm text-zinc-500 mt-1">Para cursar la materia hay que tener aprobada la correlativa.</p>

      <CampoForm label="Materia" error={errors.materia_id}>
        <select name="materia_id" value={form.materia_id} onChange={handleChange} className={inputStyle}>
          <option value="">Elegir...</option>
          {ordenadas.map((m) => (
            <option key={m.id} value={m.id}>{m.anio}° - {m.nombre_materia}</option>
          ))}
        </select>
      </CampoForm>

      <CampoForm label="Requiere (correlativa)" error={errors.correlativa_id}>
        <select name="correlativa_id" value={form.correlativa_id} onChange={handleChange} className={inputStyle}>
          <option value="">Elegir...</option>
          {ordenadas.map((m) => (
            <option key={m.id} value={m.id}>{m.anio}° - {m.nombre_materia}</option>
          ))}
        </select>
      </CampoForm>

      {mensaje && (
        <p className={`mt-4 text-sm ${mensaje.tipo === "ok" ? "text-emerald-700" : "text-red-600"}`}>
          {mensaje.texto}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando || materias.length < 2}
        className="bg-itec-700 hover:bg-itec-600 text-white font-semibold w-full mt-6 rounded-lg py-3 cursor-pointer disabled:opacity-50"
      >
        {enviando ? "Guardando..." : "Guardar correlativa"}
      </button>
    </form>
  )
}
