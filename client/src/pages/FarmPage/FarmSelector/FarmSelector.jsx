import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'
import './farmSelector.css'

const FARM_ICONS = ['🌾', '🫒', '🍊', '🍋', '🌽', '🍇', '🫑', '🥬']

const FarmSelector = () => {
  const { user, farms, logOut } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSelectFarm = (farm) => {
    navigate(`/userPage/${user?.user_id}/farms/${farm.farm_id}/farmDashboard`)
  }

  return (
    <div className="farm-selector">

      <span className="fs-brand">🌾 AgriDocs</span>

      <div className="fs-header">
        <h1>¿Con qué finca trabajamos hoy?</h1>
        <p>Selecciona una finca para empezar a documentar</p>
      </div>

      <div className="fs-grid">
        {farms?.map((farm, i) => (
          <div
            className="fs-card"
            key={farm.farm_id}
            onClick={() => handleSelectFarm(farm)}
          >
            <span className="fs-card-icon">{FARM_ICONS[i % FARM_ICONS.length]}</span>
            <span className="fs-card-name">{farm.name}</span>
            <div className="fs-card-meta">
              {farm.location && <span>📍 {farm.location}</span>}
              {farm.hectares && <span>📐 {farm.hectares} ha</span>}
            </div>
          </div>
        ))}

        <div
          className="fs-card-new"
          onClick={() => navigate(`/userPage/${user?.user_id}/farms/newFarm`)}
        >
          <span className="fs-new-icon">+</span>
          <span>Nueva finca</span>
        </div>
      </div>

      <button className="fs-logout" onClick={logOut}>
        Cerrar sesión
      </button>

    </div>
  )
}

export default FarmSelector
