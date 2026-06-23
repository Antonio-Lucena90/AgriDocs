import { useContext } from "react"
import { useNavigate } from "react-router"
import { AuthContext } from "../../../contexts/AuthContext/AuthContext"
import "./UserDashboard.css"


const FARM_ICONS = ["🌾", "🫒", "🍊", "🍋", "🌽", "🍇", "🫑", "🥬"]


const today = new Date().toLocaleDateString("es-ES", {
  weekday: "long", day: "numeric", month: "long"
})

const UserDashboard = () => {
  const { user, farms } = useContext(AuthContext);
  const navigate = useNavigate();
  



  return (
    <div className="dashboard">

      {/* ── HEADER ── */}
      <div className="dash-header">
        <div className="dash-greeting">
          <h1>Hola, <span>{user?.name}</span> 👋</h1>
          <p>{today.charAt(0).toUpperCase() + today.slice(1)}</p>
        </div>
        <div className="dash-farm-badge">
          🌾 {farms?.length ?? 0} finca{farms?.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* ── KPIs ── */}
      <div className="dash-kpis">
        <div className="kpi-card">
          <div className="kpi-icon">🌾</div>
          <div className="kpi-value">{farms?.length ?? 0}</div>
          <div className="kpi-label">Fincas activas</div>
        </div>
      </div>

      {/* ── FINCAS ── */}
      <div className="dash-farms">
        <p className="section-title">Mis fincas</p>
        <div className="farms-grid">
          {farms?.map((farm, i) => (
            <div className="farm-card" key={farm.farm_id} onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm.farm_id}/farmDashboard`)}>
              <div className="farm-card-icon">{FARM_ICONS[i % FARM_ICONS.length]}</div>
              <div className="farm-card-name">{farm.name}</div>
              <div className="farm-card-meta">
                {farm.location && <span>Ubicación: <b>{farm.location}</b></span>}
                {farm.hectares && <span>Superficie: <b>{farm.hectares} ha</b></span>}
                {farm.description && <span>{farm.description}</span>}
              </div>
              <div className="farm-card-footer">
                <span className="farm-tag">Activa</span>
                <span className="farm-arrow">→</span>
              </div>
            </div>
          ))}

          {/* Card nueva finca */}
          <div className="farm-card-new" 
               onClick={() => navigate(`/userPage/${user?.user_id}/farms/newFarm`)}>
            <div className="farm-new-icon">+</div>
            <span>Nueva finca</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default UserDashboard
