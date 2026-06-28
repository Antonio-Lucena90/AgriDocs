import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'
import { fetchData } from '../../../helpers/axiosHelpers'
import './oneZone.css'

const OneZone = () => {
  const { zones, setZones, user, token } = useContext(AuthContext)
  const { farm_id, zone_id } = useParams()
  const navigate = useNavigate()

  const zone = zones?.find((z) => String(z.zone_id) === zone_id)

  const [zoneName, setZoneName] = useState(zone?.name ?? '')
  const [errorMsg, setErrorMsg] = useState('')

  const handleUpdate = async () => {
    try {
      setErrorMsg('')
      await fetchData(`farmZone/${zone_id}/updateZone`, 'PUT', { name: zoneName }, token)
      const res = await fetchData(`farmZone/${farm_id}/zones`, 'GET', null, token)
      setZones(res.data.zones)
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Error al actualizar el nombre')
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(`¿Estás seguro de que quieres eliminar la zona "${zone?.name}"? Esta acción no se puede deshacer.`)
    if (!confirmed) return
    try {
      setErrorMsg('')
      await fetchData(`farmZone/${zone_id}/deleteZone`, 'DELETE', null, token)
      const res = await fetchData(`farmZone/${farm_id}/zones`, 'GET', null, token)
      setZones(res.data.zones)
      navigate(`/userPage/${user?.user_id}/farms/${farm_id}/farmZones/farmZonesDashboard`)
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Error al eliminar la zona')
    }
  }

  return (
    <div className="zone-dash">

      <div className="zone-dash-header">
        <button
          className="zone-back-btn"
          onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm_id}/farmZones/farmZonesDashboard`)}
        >
          ← Volver
        </button>
        <h1>🗺️ {zone?.name ?? 'Zona'}</h1>
      </div>

      <div className="zone-dash-body">

        {/* ── EDITAR NOMBRE ── */}
        <div className="zone-edit-section">
          <h2>Nombre de la zona</h2>
          <div className="zone-edit-row">
            <input
              type="text"
              className="zone-name-input"
              value={zoneName}
              onChange={(e) => setZoneName(e.target.value)}
              placeholder="Nombre de la zona"
            />
            <button className="zone-save-btn" onClick={handleUpdate}>
              Editar Nombre
            </button>
          </div>
        </div>

        {/* ── ACCIONES ── */}
        <div>
          <p className="zone-actions-title">Gestión de la zona</p>
          <div className="zone-action-cards">
            <div className="zone-action-card">
              <span className="zone-action-icon">🌾</span>
              <span className="zone-action-label">Cosecha</span>
              <span className="zone-action-desc">Anota la cosecha y producción obtenida</span>
            </div>
          </div>
        </div>

        {errorMsg && <p className="zone-error">{errorMsg}</p>}

        {/* ── ZONA DE PELIGRO ── */}
        <div className="zone-danger-section">
          <div className="zone-danger-info">
            <h3>Eliminar zona</h3>
            <p>Esta acción no se puede deshacer</p>
          </div>
          <button className="zone-delete-btn" onClick={handleDelete}>
            Eliminar zona
          </button>
        </div>

      </div>
    </div>
  )
}

export default OneZone
