import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'
import { fetchData } from '../../../helpers/axiosHelpers'
import './adminAllUsers.css'

const ROLE_LABEL = { 1: 'Usuario', 2: 'Admin' }

const AdminAllUsers = () => {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (!token) return
    const fetchUsers = async () => {
      try {
        const res = await fetchData('admin/allUsers', 'GET', null, token)
        setUsers(res.data.users)
      } catch (error) {
        console.error('fetchUsers error:', error)
      }
    }
    fetchUsers()
  }, [token])

  return (
    <div className="admin-users">
      <div className="admin-users-header">
        <button className="admin-back-btn" onClick={() => navigate('/admin/adminDashboard')}>
          ← Volver
        </button>
        <h1>👥 Usuarios registrados</h1>
        <span className="admin-users-count">{users.length} usuarios</span>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Finca</th>
              <th>Rol</th>
              <th>Registro</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.user_id}>
                <td className="admin-td-muted">{u.user_id}</td>
                <td>{u.name} {u.last_name}</td>
                <td className="admin-td-muted">@{u.user_name}</td>
                <td>{u.farm_name || '—'}</td>
                <td>
                  <span className={`admin-role-badge admin-role-${u.role}`}>
                    {ROLE_LABEL[u.role] ?? u.role}
                  </span>
                </td>
                <td className="admin-td-muted">
                  {new Date(u.created_at).toLocaleDateString('es-ES')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminAllUsers
