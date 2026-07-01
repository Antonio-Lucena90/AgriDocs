import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'
import { fetchData } from '../../../helpers/axiosHelpers'
import './harvestDashboard.css'

const QUALITY_OPTIONS = [
  { value: '', label: 'Sin clasificar' },
  { value: 'extra', label: 'Extra' },
  { value: 'first', label: 'Primera' },
  { value: 'second', label: 'Segunda' },
  { value: 'waste', label: 'Descarte' },
]

const QUALITY_LABEL = {
  extra: 'Extra',
  first: 'Primera',
  second: 'Segunda',
  waste: 'Descarte',
}

const HarvestDashboard = () => {
  const { token, user, setCurrentFarmId } = useContext(AuthContext)
  const { farm_id } = useParams()
  const navigate = useNavigate()

  const [harvests, setHarvests] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ price_per_kg: '', quality: '', notes: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setCurrentFarmId(farm_id)
  }, [farm_id, setCurrentFarmId])

  useEffect(() => {
    if (!token || !farm_id) return
    const fetchHarvests = async () => {
      try {
        const res = await fetchData(`harvest/farm/${farm_id}/farmHarvests`, 'GET', null, token)
        setHarvests(res.data.harvests)
      } catch (error) {
        console.error('fetchHarvests error:', error)
      }
    }
    fetchHarvests()
  }, [farm_id, token])

  const totalKg = harvests.reduce((acc, h) => acc + Number(h.kg), 0)

  const openEdit = (h) => {
    setEditingId(h.harvest_id)
    setEditForm({
      price_per_kg: h.price_per_kg ?? '',
      quality: h.quality ?? '',
      notes: h.notes ?? '',
    })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetchData(`harvest/${editingId}/updateHarvest`, 'PUT', editForm, token)
      const res = await fetchData(`harvest/farm/${farm_id}/farmHarvests`, 'GET', null, token)
      setHarvests(res.data.harvests)
      setEditingId(null)
    } catch (error) {
      console.error('updateHarvest error:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="harv-dash">
      <div className="harv-dash-header">
        <div>
          <h1>🌾 Cosechas</h1>
          {harvests.length > 0 && (
            <p className="harv-dash-total">Total recogido: <strong>{totalKg.toLocaleString('es-ES')} kg</strong></p>
          )}
        </div>
        <button
          className="harv-dash-new-btn"
          onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm_id}/farmZones/farmZonesDashboard`)}
        >
          + Nueva cosecha
        </button>
      </div>

      {harvests.length === 0 ? (
        <p className="harv-dash-empty">No hay cosechas registradas</p>
      ) : (
        <div className="harv-table-wrap">
          <table className="harv-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Zona</th>
                <th>Fruto</th>
                <th>Variedad</th>
                <th>Kg</th>
                <th>Calidad</th>
                <th>€/kg</th>
                <th>Total €</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {harvests.map((h) => {
                const total = h.price_per_kg && h.kg
                  ? (Number(h.price_per_kg) * Number(h.kg)).toFixed(2)
                  : null
                return (
                  <tr key={h.harvest_id}>
                    <td>{new Date(h.date).toLocaleDateString('es-ES')}</td>
                    <td>{h.zone_name ?? '—'}</td>
                    <td>{h.fruit_type}</td>
                    <td>{h.variety || '—'}</td>
                    <td>{Number(h.kg).toLocaleString('es-ES')} kg</td>
                    <td>
                      {h.quality ? (
                        <span className={`harv-badge harv-badge-${h.quality}`}>
                          {QUALITY_LABEL[h.quality]}
                        </span>
                      ) : '—'}
                    </td>
                    <td>{h.price_per_kg ? `${Number(h.price_per_kg).toFixed(2)} €` : '—'}</td>
                    <td>{total ? `${total} €` : '—'}</td>
                    <td>
                      <button className="harv-edit-btn" onClick={() => openEdit(h)}>
                        Editar
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── MODAL EDICIÓN ── */}
      {editingId && (
        <div className="harv-modal-overlay" onClick={() => setEditingId(null)}>
          <div className="harv-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Editar cosecha</h2>

            <div className="harv-modal-field">
              <label>Calidad</label>
              <select
                value={editForm.quality}
                onChange={(e) => setEditForm({ ...editForm, quality: e.target.value })}
              >
                {QUALITY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <div className="harv-modal-field">
              <label>Precio por kg (€)</label>
              <input
                type="number"
                min="0"
                step="0.0001"
                value={editForm.price_per_kg}
                onChange={(e) => setEditForm({ ...editForm, price_per_kg: e.target.value })}
                placeholder="0.0000"
              />
            </div>

            <div className="harv-modal-field">
              <label>Notas</label>
              <textarea
                rows={3}
                value={editForm.notes}
                onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                placeholder="Observaciones..."
              />
            </div>

            <div className="harv-modal-actions">
              <button className="harv-cancel-btn" onClick={() => setEditingId(null)}>Cancelar</button>
              <button className="harv-submit-btn" onClick={handleSave} disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HarvestDashboard
