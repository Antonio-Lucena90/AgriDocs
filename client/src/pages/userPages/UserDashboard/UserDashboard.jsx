import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { AuthContext } from "../../../contexts/AuthContext/AuthContext"
import { fetchData } from "../../../helpers/axiosHelpers"
import "./UserDashboard.css"


const MOCK_KPIS = [
  { icon: "🗺️", label: "Zonas activas",        value: "5"     },
  { icon: "💧", label: "Riegos este mes",       value: "24"    },
  { icon: "⚠️", label: "Incidencias pendientes", value: "2"   },
  { icon: "🌾", label: "Kg recolectados",       value: "1.284" },
]

const FARM_ICONS = ["🌾", "🫒", "🍊", "🍋", "🌽", "🍇", "🫑", "🥬"]

const MOCK_ACTIVITY = [
  { icon: "💧", color: "blue",   text: "Riego goteo — Zona Norte",                time: "Hace 2h"      },
  { icon: "🌿", color: "green",  text: "Abonado mineral — Zona Sur",              time: "Ayer"          },
  { icon: "⚠️", color: "orange", text: "Incidencia: fuga detectada — Zona Este",  time: "Hace 2 días"  },
  { icon: "🌾", color: "teal",   text: "Recolección 340kg naranjas — Zona Norte", time: "Hace 3 días"  },
  { icon: "💧", color: "blue",   text: "Riego aspersión — Zona Oeste",            time: "Hace 4 días"  },
]

const MOCK_ALERTS = [
  { id: 1, zone: "Zona Este",  type: "Fuga detectada", status: "pending",     date: "Hace 2 días" },
  { id: 2, zone: "Zona Norte", type: "Presión baja",   status: "in_progress", date: "Hace 5 días" },
]


const today = new Date().toLocaleDateString("es-ES", {
  weekday: "long", day: "numeric", month: "long"
})

const UserDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    const getFarms = async () => {
      try {
        const res = await fetchData('farm/myFarms', 'GET', null, token)
        setFarms(res.data.farms)
      } catch (error) {
        console.log('Error cargando fincas:', error)
      }
    }
    getFarms()
  }, [token])

  return (
    <div className="dashboard">

      {/* ── HEADER ── */}
      <div className="dash-header">
        <div className="dash-greeting">
          <h1>Hola, <span>{user?.name}</span> 👋</h1>
          <p>{today.charAt(0).toUpperCase() + today.slice(1)}</p>
        </div>
        <div className="dash-farm-badge">
          🌾 {user?.farm_name}
        </div>
      </div>

      {/* ── KPIs ── */}
      <div className="dash-kpis">
        {MOCK_KPIS.map((k) => (
          <div className="kpi-card" key={k.label}>
            <div className="kpi-icon">{k.icon}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      {/* ── FINCAS ── */}
      <div className="dash-farms">
        <p className="section-title">Mis fincas</p>
        <div className="farms-grid">
          {farms?.map((farm, i) => (
            <div className="farm-card" key={farm.farm_id}>
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

      {/* ── ACTIVIDAD + ALERTAS ── */}
      <div className="dash-bottom">

        <div className="dash-activity">
          <p className="section-title">Actividad reciente</p>
          <div className="activity-list">
            {MOCK_ACTIVITY.map((a, i) => (
              <div className="activity-item" key={i}>
                <div className={`activity-dot ${a.color}`}>{a.icon}</div>
                <div className="activity-info">
                  <div className="activity-text">{a.text}</div>
                  <div className="activity-time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-alerts">
          <p className="section-title">Incidencias activas</p>
          {MOCK_ALERTS.length > 0 ? (
            <div className="alerts-list">
              {MOCK_ALERTS.map((alert) => (
                <div className={`alert-item ${alert.status === "in_progress" ? "in-progress" : ""}`} key={alert.id}>
                  <div className="alert-icon">
                    {alert.status === "pending" ? "🔴" : "🔵"}
                  </div>
                  <div className="alert-info">
                    <div className="alert-type">{alert.type}</div>
                    <div className="alert-zone">{alert.zone} · {alert.date}</div>
                  </div>
                  <span className={`alert-badge ${alert.status}`}>
                    {alert.status === "pending" ? "Pendiente" : "En proceso"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-alerts">✅ Sin incidencias activas</div>
          )}
        </div>

      </div>
    </div>
  )
}

export default UserDashboard
