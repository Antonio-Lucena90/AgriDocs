import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { AuthContext } from "../../../contexts/AuthContext/AuthContext"
import { fetchData } from "../../../helpers/axiosHelpers"
import "./fertilizationRecord.css"

const initialValue = {
  date: new Date().toISOString().split('T')[0],
  fertilizer_name: '',
  amount: '',
  unit: 'kg',
  notes: '',
}

const FertilizationRecord = () => {
  const { token, user, setFertilizations } = useContext(AuthContext)
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
      if (!form.date || !form.fertilizer_name || !form.amount) {
        setErrorMsg('La fecha, el producto y la cantidad son obligatorios')
        return
      }
      await fetchData(`fertilized/${farm_id}/createFertilization`, 'POST', form, token)

      const res = await fetchData(`fertilized/${farm_id}/fertilizations`, 'GET', null, token)
      setFertilizations(res.data.fertilizations)

      navigate(`/userPage/${user?.user_id}/farms/${farm_id}/farmDashboard`)
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Error al guardar el abonado')
    }
  }

  const today = new Date()
  const monthName = today.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })

  return (
    <div className="fert-page">
      <div className="fert-card">

        <div className="fert-header">
          <div className="fert-icon">🌿</div>
          <h1>Registrar abonado</h1>
          <p>Añade los datos del tratamiento fertilizante</p>
        </div>

        {/* ── FECHA ── */}
        <div className="fert-calendar-wrap">
          <p className="fert-month-label">{monthName.charAt(0).toUpperCase() + monthName.slice(1)}</p>
          <input
            type="date"
            name="date"
            className="fert-date-input"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        {/* ── CAMPOS ── */}
        <div className="fert-fields">

          <div className="form-group">
            <label>Producto / Fertilizante <span className="fert-required">*</span></label>
            <input
              type="text"
              name="fertilizer_name"
              className="fert-input"
              placeholder="Ej: Nitrato amónico, Fosfato..."
              value={form.fertilizer_name}
              onChange={handleChange}
            />
          </div>

          <div className="fert-row">
            <div className="form-group">
              <label>Cantidad <span className="fert-required">*</span></label>
              <input
                type="number"
                name="amount"
                className="fert-input"
                placeholder="Ej: 25"
                step="0.001"
                min="0"
                value={form.amount}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Unidad</label>
              <select
                name="unit"
                className="fert-input fert-select"
                value={form.unit}
                onChange={handleChange}
              >
                <option value="kg">kg</option>
                <option value="liters">litros</option>
                <option value="grams">gramos</option>
                <option value="tons">toneladas</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Notas</label>
            <textarea
              name="notes"
              className="fert-input fert-textarea"
              placeholder="Observaciones del abonado..."
              rows={3}
              value={form.notes}
              onChange={handleChange}
            />
          </div>

        </div>

        {errorMsg && <p className="fert-error">{errorMsg}</p>}

        <div className="fert-actions">
          <button className="fert-submit-btn" onClick={onSubmit}>
            Guardar abonado
          </button>
          <button className="fert-cancel-btn" onClick={() => navigate(-1)}>
            Cancelar
          </button>
        </div>

      </div>
    </div>
  )
}

export default FertilizationRecord
