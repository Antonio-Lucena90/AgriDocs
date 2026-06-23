import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'
import './farmZoneDashboard.css'

const FarmZoneDashboard = () => {
  const { zones, user } = useContext(AuthContext)
  const { farm_id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="zones-dash">

      <div className="zones-dash-header">
        <button
          className="zones-back-btn"
          onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm_id}/farmDashboard`)}
        >
          ← Volver
        </button>
        <div>
          <h1>Zonas de la finca</h1>
          <p className="zones-dash-subtitle">{zones.length} zona{zones.length !== 1 ? 's' : ''} registrada{zones.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="zones-dash-body">

        <div className="zones-list-section">
          {zones.length > 0 ? (
            <div className="zones-list">
              {zones.map((zone) => (
                <div
                  className="zone-list-card"
                  key={zone.zone_id}
                  onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm_id}/farmZones/${zone.zone_id}`)}
                >
                  <div className="zone-list-icon">🗺️</div>
                  <div className="zone-list-info">
                    <span className="zone-list-name">{zone.name}</span>
                  </div>
                  <span className="zone-list-arrow">→</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="zones-empty">
              <span className="zones-empty-icon">🌱</span>
              <p>No tienes zonas registradas aún</p>
            </div>
          )}
        </div>

        <button
          className="zones-register-btn"
          onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm_id}/farmZones/farmZonesRegister`)}
        >
          + Añadir zona
        </button>

      </div>
    </div>
  )
}

export default FarmZoneDashboard
