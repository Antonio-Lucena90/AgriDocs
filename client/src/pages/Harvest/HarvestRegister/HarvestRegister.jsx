import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'
import { fetchData } from '../../../helpers/axiosHelpers'
import './harvestRegister.css'

const today = () => new Date().toISOString().split('T')[0]

const HarvestRegister = () => {
  const { token, user } = useContext(AuthContext)
  const { farm_id, zone_id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    date: today(),
    fruit_type: '',
    variety: '',
    kg: '',
    notes: '',
  })
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.fruit_type.trim()) {
      setErrorMsg('El tipo de fruto es obligatorio')
      return
    }
    if (!form.kg || Number(form.kg) <= 0) {
      setErrorMsg('Indica los kg recogidos')
      return
    }
    setLoading(true)
    setErrorMsg('')
    try {
      await fetchData(`harvest/${zone_id}/createHarvest`, 'POST', form, token)
      navigate(`/userPage/${user?.user_id}/farms/${farm_id}/farmZones/${zone_id}`)
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Error al registrar la cosecha')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="harv-reg">
      <div className="harv-reg-header">
        <button
          className="harv-back-btn"
          onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm_id}/farmZones/${zone_id}`)}
        >
          ← Volver
        </button>
        <h1>🌾 Registro de Cosecha</h1>
      </div>

      <form className="harv-reg-form" onSubmit={handleSubmit}>

        <div className="harv-field">
          <label>Fecha</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="harv-field">
          <label>Tipo de fruto <span className="harv-required">*</span></label>
          <input
            type="text"
            name="fruit_type"
            value={form.fruit_type}
            onChange={handleChange}
            placeholder="Ej: Aguacates, Mangos..."
          />
        </div>

        <div className="harv-field">
          <label>Variedad <span className="harv-optional">(opcional)</span></label>
          <input
            type="text"
            name="variety"
            value={form.variety}
            onChange={handleChange}
            placeholder="Ej: Hass, Fuerte, Osteen..."
          />
        </div>

        <div className="harv-field">
          <label>Kilogramos recogidos <span className="harv-required">*</span></label>
          <input
            type="number"
            name="kg"
            value={form.kg}
            onChange={handleChange}
            placeholder="0.000"
            min="0.001"
            step="0.001"
          />
        </div>

        <div className="harv-field">
          <label>Notas <span className="harv-optional">(opcional)</span></label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Observaciones sobre la cosecha..."
            rows={3}
          />
        </div>

        {errorMsg && <p className="harv-error">{errorMsg}</p>}

        <div className="harv-actions">
          <button
            type="button"
            className="harv-cancel-btn"
            onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm_id}/farmZones/${zone_id}`)}
          >
            Cancelar
          </button>
          <button type="submit" className="harv-submit-btn" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrar cosecha'}
          </button>
        </div>

      </form>
    </div>
  )
}

export default HarvestRegister
