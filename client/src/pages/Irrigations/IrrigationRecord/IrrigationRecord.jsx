import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { AuthContext } from "../../../contexts/AuthContext/AuthContext"
import { fetchData } from "../../../helpers/axiosHelpers"
import "./irrigationRecord.css"

const initialValue = {
  date: new Date().toISOString().split('T')[0],
  start_time: '',
  duration_minutes: '',
  total_liters: '',
  pressure_bar: '',
  notes: '',
}

const IrrigationRecord = () => {
  const { token, user, setIrrigations } = useContext(AuthContext)
  const { farm_id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState(initialValue)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const onSubmit = async () => {
    try {
      setErrorMsg('')
      if (!form.date) {
        setErrorMsg('La fecha es obligatoria')
        return
      }
      await fetchData(`irrigation/${farm_id}/irrigationRecord`, 'POST', form, token)

      const res = await fetchData(`irrigation/${farm_id}/irrigations`, 'GET', null, token)
      setIrrigations(res.data.irrigations)

      navigate(`/userPage/${user?.user_id}/farms/${farm_id}/farmDashboard`)
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Error al guardar el riego')
    }
  }

  const today = new Date()
  const monthName = today.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })

  return (
    <div className="irr-page">
      <div className="irr-card">

        <div className="irr-header">
          <div className="irr-icon">💧</div>
          <h1>Registrar riego</h1>
          <p>Selecciona el día y los datos del riego</p>
        </div>

        {/* ── CALENDARIO ── */}
        <div className="irr-calendar-wrap">
          <p className="irr-month-label">{monthName.charAt(0).toUpperCase() + monthName.slice(1)}</p>
          <input
            type="date"
            name="date"
            className="irr-date-input"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        {/* ── CAMPOS ── */}
        <div className="irr-fields">

          <div className="irr-row">
            <div className="form-group">
              <label>Hora de inicio</label>
              <input
                type="time"
                name="start_time"
                className="irr-input"
                value={form.start_time}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Duración (min)</label>
              <input
                type="number"
                name="duration_minutes"
                className="irr-input"
                placeholder="Ej: 90"
                min="0"
                value={form.duration_minutes}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="irr-row">
            <div className="form-group">
              <label>Total litros</label>
              <input
                type="number"
                name="total_liters"
                className="irr-input"
                placeholder="Ej: 1200"
                step="0.01"
                min="0"
                value={form.total_liters}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Presión (bar)</label>
              <input
                type="number"
                name="pressure_bar"
                className="irr-input"
                placeholder="Ej: 2.5"
                step="0.01"
                min="0"
                value={form.pressure_bar}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Notas</label>
            <textarea
              name="notes"
              className="irr-input irr-textarea"
              placeholder="Observaciones del riego..."
              rows={3}
              value={form.notes}
              onChange={handleChange}
            />
          </div>

        </div>

        {errorMsg && <p className="irr-error">{errorMsg}</p>}

        <div className="irr-actions">
          <button className="irr-submit-btn" onClick={onSubmit}>
            Guardar riego
          </button>
          <button className="irr-cancel-btn" onClick={() => navigate(-1)}>
            Cancelar
          </button>
        </div>

      </div>
    </div>
  )
}

export default IrrigationRecord
