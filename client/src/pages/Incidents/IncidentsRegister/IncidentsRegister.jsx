import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'
import { fetchData } from '../../../helpers/axiosHelpers'
import './incidentsRegister.css'

const TYPE_OPTIONS = [
  { value: 'leak', label: 'Goma rota' },
  { value: 'clogged_dripper', label: 'Gotero roto' },
  { value: 'low_pressure', label: 'Baja presión' },
  { value: 'other', label: 'Otros' },
]

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pendiente' },
  { value: 'in_progress', label: 'En proceso' },
  { value: 'resolved', label: 'Resuelto' },
]

const today = () => new Date().toISOString().split('T')[0]

const IncidentsRegister = () => {
  const { token, user, zones } = useContext(AuthContext)
  const { farm_id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    zone_id: '',
    date: today(),
    type: 'leak',
    description: '',
    zone_location: '',
    status: 'pending',
  })
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.zone_id) {
      setErrorMsg('Selecciona una zona')
      return
    }
    if (!form.description.trim()) {
      setErrorMsg('La descripción es obligatoria')
      return
    }
    setLoading(true)
    setErrorMsg('')
    try {
      await fetchData(`incidents/${form.zone_id}/createIncident`, 'POST', {
        date: form.date,
        type: form.type,
        description: form.description,
        zone_location: form.zone_location,
        status: form.status,
      }, token)
      navigate(`/userPage/${user?.user_id}/farms/${farm_id}/farmDashboard`)
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Error al registrar la incidencia')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="inc-reg">
      <div className="inc-reg-header">
        <button
          className="inc-back-btn"
          onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm_id}/farmDashboard`)}
        >
          ← Volver
        </button>
        <h1>⚠️ Registro de Avería</h1>
      </div>

      <form className="inc-reg-form" onSubmit={handleSubmit}>

        <div className="inc-field">
          <label>Zona afectada</label>
          <select name="zone_id" value={form.zone_id} onChange={handleChange}>
            <option value="" disabled>
              {zones.length === 0 ? 'Sin zonas registradas' : 'Seleccione una zona de la finca'}
            </option>
            {zones.map((z) => (
              <option key={z.zone_id} value={z.zone_id}>{z.name}</option>
            ))}
          </select>
        </div>

        <div className="inc-field">
          <label>Fecha</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inc-field">
          <label>Tipo de avería</label>
          <select name="type" value={form.type} onChange={handleChange}>
            {TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="inc-field">
          <label>Descripción <span className="inc-required">*</span></label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe el problema con detalle..."
            rows={4}
          />
        </div>

        <div className="inc-field">
          <label>Ubicación dentro de la zona <span className="inc-optional">(opcional)</span></label>
          <input
            type="text"
            name="zone_location"
            value={form.zone_location}
            onChange={handleChange}
            placeholder="Ej: sector norte, fila 3..."
          />
        </div>

        <div className="inc-field">
          <label>Estado</label>
          <select name="status" value={form.status} onChange={handleChange}>
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {errorMsg && <p className="inc-error">{errorMsg}</p>}

        <div className="inc-actions">
          <button
            type="button"
            className="inc-cancel-btn"
            onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm_id}/farmDashboard`)}
          >
            Cancelar
          </button>
          <button type="submit" className="inc-submit-btn" disabled={loading || zones.length === 0}>
            {loading ? 'Registrando...' : 'Registrar avería'}
          </button>
        </div>

      </form>
    </div>
  )
}

export default IncidentsRegister
