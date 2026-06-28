import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'
import { fetchData } from '../../../helpers/axiosHelpers'
import './incidentsDashboard.css'

const TYPE_LABEL = {
  leak: 'Goma rota',
  clogged_dripper: 'Gotero roto',
  low_pressure: 'Baja presión',
  other: 'Otros',
}

const STATUS_LABEL = {
  pending: 'Pendiente',
  in_progress: 'En proceso',
  resolved: 'Resuelto',
}

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pendiente' },
  { value: 'in_progress', label: 'En proceso' },
  { value: 'resolved', label: 'Resuelto' },
]

const IncidentsDashboard = () => {
  const { token, user, setCurrentFarmId } = useContext(AuthContext)
  const { farm_id } = useParams()
  const navigate = useNavigate()

  const [incidents, setIncidents] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ status: '', resolution_notes: '', resolved_at: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setCurrentFarmId(farm_id)
  }, [farm_id, setCurrentFarmId])

  useEffect(() => {
    if (!token || !farm_id) return
    const fetchIncidents = async () => {
      try {
        const res = await fetchData(`incidents/farm/${farm_id}/farmIncidents`, 'GET', null, token)
        setIncidents(res.data.incidents)
      } catch (error) {
        console.error('fetchIncidents error:', error)
      }
    }
    fetchIncidents()
  }, [farm_id, token])

  const openEdit = (inc) => {
    setEditingId(inc.incident_id)
    setEditForm({
      status: inc.status,
      resolution_notes: inc.resolution_notes || '',
      resolved_at: inc.resolved_at ? inc.resolved_at.split('T')[0] : '',
    })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetchData(`incidents/${editingId}/updateIncident`, 'PUT', editForm, token)
      const res = await fetchData(`incidents/farm/${farm_id}/farmIncidents`, 'GET', null, token)
      setIncidents(res.data.incidents)
      setEditingId(null)
    } catch (error) {
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="inc-dash">
      <div className="inc-dash-header">
        <h1>⚠️ Averías</h1>
        <button
          className="inc-dash-new-btn"
          onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm_id}/incidentRegister`)}
        >
          + Nueva avería
        </button>
      </div>

      {incidents.length === 0 ? (
        <p className="inc-dash-empty">No hay averías registradas</p>
      ) : (
        <div className="inc-table-wrap">
          <table className="inc-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Zona</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Ubicación</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((inc) => (
                <tr key={inc.incident_id}>
                  <td>{new Date(inc.date).toLocaleDateString('es-ES')}</td>
                  <td>{inc.zone_name}</td>
                  <td>{TYPE_LABEL[inc.type] ?? inc.type}</td>
                  <td className="inc-td-desc">{inc.description}</td>
                  <td>{inc.zone_location || '—'}</td>
                  <td>
                    <span className={`inc-badge inc-badge-${inc.status}`}>
                      {STATUS_LABEL[inc.status] ?? inc.status}
                    </span>
                  </td>
                  <td>
                    <button className="inc-edit-btn" onClick={() => openEdit(inc)}>
                      Actualizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── MODAL ACTUALIZACIÓN ── */}
      {editingId && (
        <div className="inc-modal-overlay" onClick={() => setEditingId(null)}>
          <div className="inc-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Actualizar avería</h2>

            <div className="inc-modal-field">
              <label>Estado</label>
              <select
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <div className="inc-modal-field">
              <label>Notas de resolución</label>
              <textarea
                rows={3}
                value={editForm.resolution_notes}
                onChange={(e) => setEditForm({ ...editForm, resolution_notes: e.target.value })}
                placeholder="Describe cómo se resolvió..."
              />
            </div>

            {editForm.status === 'resolved' && (
              <div className="inc-modal-field">
                <label>Fecha de resolución</label>
                <input
                  type="date"
                  value={editForm.resolved_at}
                  onChange={(e) => setEditForm({ ...editForm, resolved_at: e.target.value })}
                />
              </div>
            )}

            <div className="inc-modal-actions">
              <button className="inc-cancel-btn" onClick={() => setEditingId(null)}>Cancelar</button>
              <button className="inc-submit-btn" onClick={handleSave} disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IncidentsDashboard
