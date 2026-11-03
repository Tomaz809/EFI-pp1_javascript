import { useState } from "react"
import { createMateria } from "../services/api"
import CampoForm, { inputStyle } from "./CampoForm"

const FORM_INICIAL = {
  nombre_materia: "",
  codigo: "",
  anio: "",
  cuatrimestral: "false",
  carrera_id: "",
}

// Letras (con tildes y ñ), números, espacios, puntos y guiones
const FORMATO_NOMBRE = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9 .-]+$/

export default function FormMateria({ materias, carreras, onCreada }) {
  const [form, setForm] = useState(FORM_INICIAL)
  const [errors, setErrors] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [mensaje, setMensaje] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    const nombre = form.nombre_materia.trim()

    if (!nombre) newErrors.nombre_materia = "El nombre es obligatorio"
    else if (nombre.length < 3) newErrors.nombre_materia = "Debe tener al menos 3 caracteres"
    else if (nombre.length > 50) newErrors.nombre_materia = "Puede tener como máximo 50 caracteres"
    else if (!FORMATO_NOMBRE.test(nombre)) newErrors.nombre_materia = "Solo letras, números, espacios, puntos y guiones"

    if (form.codigo === "") newErrors.codigo = "El código es obligatorio"
    else if (!Number.isInteger(Number(form.codigo)) || Number(form.codigo) < 0 || Number(form.codigo) > 9999)
      newErrors.codigo = "Debe ser un número entero entre 0 y 9999"
    else if (materias.some((m) => m.codigo === Number(form.codigo)))
      newErrors.codigo = "Ya existe una materia con ese código"

    if (!form.anio) newErrors.anio = "Elegí el año"

    if (carreras.length > 0 && !form.carrera_id) newErrors.carrera_id = "Elegí la carrera"

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
      const creada = await createMateria({
        nombre_materia: form.nombre_materia.trim(),
        codigo: Number(form.codigo),
        anio: Number(form.anio),
        cuatrimestral: form.cuatrimestral === "true",
        carrera_id: form.carrera_id ? Number(form.carrera_id) : null,
      })
      setMensaje({ tipo: "ok", texto: `Materia "${creada.nombre_materia}" creada` })
      setForm(FORM_INICIAL)
      onCreada()
    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-zinc-800 p-6 rounded-lg">
      <h2 className="text-xl font-bold">Nueva materia</h2>

      <CampoForm label="Nombre" error={errors.nombre_materia}>
        <input
          type="text"
          name="nombre_materia"
          value={form.nombre_materia}
          onChange={handleChange}
          maxLength={50}
          placeholder="Ej: Programación 2"
          className={inputStyle}
        />
        <p className="text-xs text-zinc-500 mt-1 text-right">{form.nombre_materia.length}/50</p>
      </CampoForm>

      <CampoForm label="Código" error={errors.codigo}>
        <input
          type="number"
          name="codigo"
          value={form.codigo}
          onChange={handleChange}
          placeholder="Ej: 201"
          className={inputStyle}
        />
      </CampoForm>

      <div className="grid grid-cols-2 gap-4">
        <CampoForm label="Año" error={errors.anio}>
          <select name="anio" value={form.anio} onChange={handleChange} className={inputStyle}>
            <option value="">Elegir...</option>
            <option value="1">1° año</option>
            <option value="2">2° año</option>
            <option value="3">3° año</option>
          </select>
        </CampoForm>

        <CampoForm label="Duración">
          <select name="cuatrimestral" value={form.cuatrimestral} onChange={handleChange} className={inputStyle}>
            <option value="false">Anual</option>
            <option value="true">Cuatrimestral</option>
          </select>
        </CampoForm>
      </div>

      {carreras.length > 0 && (
        <CampoForm label="Carrera" error={errors.carrera_id}>
          <select name="carrera_id" value={form.carrera_id} onChange={handleChange} className={inputStyle}>
            <option value="">Elegir...</option>
            {carreras.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </CampoForm>
      )}

      {mensaje && (
        <p className={`mt-4 text-sm ${mensaje.tipo === "ok" ? "text-emerald-400" : "text-red-400"}`}>
          {mensaje.texto}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="bg-blue-600 hover:bg-blue-500 w-full mt-6 rounded-lg py-3 cursor-pointer disabled:opacity-50"
      >
        {enviando ? "Guardando..." : "Guardar materia"}
      </button>
    </form>
  )
}
