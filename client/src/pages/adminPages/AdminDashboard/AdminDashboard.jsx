import { useNavigate } from 'react-router'
import './adminDashboard.css'

const AdminDashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="admin-dash">
      <div className="admin-dash-header">
        <h1>Panel de administración</h1>
        <p className="admin-dash-sub">Gestión general de AgriDocs</p>
      </div>

      <div className="admin-dash-cards">
        <div className="admin-card" onClick={() => navigate('/admin/allUsers')}>
          <span className="admin-card-icon">👥</span>
          <div className="admin-card-info">
            <span className="admin-card-title">Usuarios</span>
            <span className="admin-card-desc">Ver todos los usuarios registrados</span>
          </div>
          <span className="admin-card-arrow">→</span>
        </div>
        <div className="admin-card" onClick={() => navigate('/admin/inviteCodes')}>
          <span className="admin-card-icon">🔑</span>
          <div className="admin-card-info">
            <span className="admin-card-title">Códigos de invitación</span>
            <span className="admin-card-desc">Genera y gestiona los códigos de acceso</span>
          </div>
          <span className="admin-card-arrow">→</span>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
