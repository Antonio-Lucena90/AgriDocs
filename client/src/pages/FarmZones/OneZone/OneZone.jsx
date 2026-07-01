import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'
import { fetchData } from '../../../helpers/axiosHelpers'
import './oneZone.css'

const QUALITY_LABEL = {
  extra: 'Extra',
  first: 'Primera',
  second: 'Segunda',
  waste: 'Descarte',
}

const OneZone = () => {
  const { zones, setZones, user, token } = useContext(AuthContext)
  const { farm_id, zone_id } = useParams()
  const navigate = useNavigate()

  const zone = zones?.find((z) => String(z.zone_id) === zone_id)

  const [zoneName, setZoneName] = useState(zone?.name ?? '')
  const [errorMsg, setErrorMsg] = useState('')
  const [harvests, setHarvests] = useState([])

  useEffect(() => {
    if (!token || !zone_id) return
    const fetchHarvests = async () => {
      try {
        const res = await fetchData(`harvest/${zone_id}/zoneHarvests`, 'GET', null, token)
        setHarvests(res.data.harvests)
      } catch (error) {
        console.error('fetchHarvests error:', error)
      }
    }
    fetchHarvests()
  }, [zone_id, token])

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

  const kgByFruit = harvests.reduce((acc, h) => {
    const key = h.variety ? `${h.fruit_type} · ${h.variety}` : h.fruit_type
    acc[key] = (acc[key] || 0) + Number(h.kg)
    return acc
  }, {})

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
          <div className="zone-action-cards" onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm_id}/farmZones/${zone_id}/harvestRegister`)}>
            <div className="zone-action-card">
              <span className="zone-action-icon">🌾</span>
              <span className="zone-action-label">Registra Nueva Cosecha</span>
              <span className="zone-action-desc">Anota la cosecha y producción obtenida</span>
            </div>
          </div>
        </div>

        {/* ── COSECHAS DE LA ZONA ── */}
        <div className="zone-harvest-section">
          <div className="zone-harvest-head">
            <p className="zone-actions-title">Cosechas registradas</p>
            {harvests.length > 0 && (
              <div className="zone-harvest-totals">
                {Object.entries(kgByFruit).map(([fruit, kg]) => (
                  <span key={fruit} className="zone-harvest-total">
                    {fruit}: <strong>{kg.toLocaleString('es-ES')} kg</strong>
                  </span>
                ))}
              </div>
            )}
          </div>

          {harvests.length === 0 ? (
            <p className="zone-harvest-empty">Sin cosechas registradas en esta zona</p>
          ) : (
            <div className="zone-harvest-list">
              {harvests.map((h) => (
                <div className="zone-harvest-row" key={h.harvest_id}>
                  <div className="zone-harvest-date">
                    {new Date(h.date).toLocaleDateString('es-ES')}
                  </div>
                  <div className="zone-harvest-info">
                    <span className="zone-harvest-fruit">
                      {h.fruit_type}{h.variety ? ` · ${h.variety}` : ''}
                    </span>
                    <span className="zone-harvest-kg">{Number(h.kg).toLocaleString('es-ES')} kg</span>
                  </div>
                  {h.quality && (
                    <span className={`zone-harv-badge zone-harv-badge-${h.quality}`}>
                      {QUALITY_LABEL[h.quality]}
                    </span>
                  )}
                  {h.price_per_kg && (
                    <span className="zone-harvest-price">
                      {(Number(h.price_per_kg) * Number(h.kg)).toFixed(2)} €
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
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
