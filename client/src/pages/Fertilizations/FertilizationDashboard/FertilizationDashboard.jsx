import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'
import './fertilizationDashboard.css'

const WEEKDAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']
const MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']

const toDateKey = (date) => {
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const FertilizationDashboard = () => {
  const { fertilizations, user, setCurrentFarmId } = useContext(AuthContext)
  const { farm_id } = useParams()
  const navigate = useNavigate()

  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDay, setSelectedDay] = useState(null)

  useEffect(() => {
    setCurrentFarmId(farm_id)
  }, [farm_id, setCurrentFarmId])

  const fertilizationsByDate = fertilizations.reduce((acc, fert) => {
    const key = toDateKey(fert.date)
    if (!acc[key]) acc[key] = []
    acc[key].push(fert)
    return acc
  }, {})

  const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstWeekDay = new Date(viewYear, viewMonth, 1).getDay()
  const offset = firstWeekDay === 0 ? 6 : firstWeekDay - 1

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
    setSelectedDay(null)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
    setSelectedDay(null)
  }

  const handleDayClick = (day) => {
    const key = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    setSelectedDay(prev => prev === key ? null : key)
  }

  const todayKey = toDateKey(today)
  const monthPrefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`
  const monthKeys = Object.keys(fertilizationsByDate).filter(k => k.startsWith(monthPrefix))
  const totalFertMes = monthKeys.reduce((sum, k) => sum + fertilizationsByDate[k].length, 0)

  const selectedFertilizations = selectedDay ? fertilizationsByDate[selectedDay] : null

  return (
    <div className="fert-dash">

      <div className="fert-dash-header">
        <button className="fert-back-btn" onClick={() => navigate(-1)}>← Volver</button>
        <h1>🌿 Abonados</h1>
      </div>

      <div className="fert-dash-body">

        {/* ── CALENDARIO ── */}
        <div className="fcal-card">
          <div className="fcal-nav">
            <button className="fcal-nav-btn" onClick={prevMonth}>‹</button>
            <span className="fcal-month-label">{MONTHS[viewMonth]} {viewYear}</span>
            <button className="fcal-nav-btn" onClick={nextMonth}>›</button>
          </div>

          <div className="fcal-weekdays">
            {WEEKDAYS.map(d => <div className="fcal-weekday" key={d}>{d}</div>)}
          </div>

          <div className="fcal-grid">
            {Array.from({ length: offset }).map((_, i) => (
              <div className="fcal-day empty" key={`e-${i}`} />
            ))}

            {Array.from({ length: totalDays }).map((_, i) => {
              const day = i + 1
              const key = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              const hasFert = !!fertilizationsByDate[key]
              const count = fertilizationsByDate[key]?.length ?? 0
              const isToday = key === todayKey
              const isSelected = key === selectedDay

              return (
                <div
                  key={day}
                  className={`fcal-day ${hasFert ? 'has-fertilization' : ''} ${isToday ? 'is-today' : ''} ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                  {hasFert && <span className="fcal-leaf">🌿</span>}
                  {count > 1 && <span className="fcal-count">×{count}</span>}
                </div>
              )
            })}
          </div>

          <div className="fert-stats">
            <div className="fert-stat">
              <span className="fert-stat-label">Abonados este mes</span>
              <span className="fert-stat-value">{totalFertMes}</span>
            </div>
            <div className="fert-stat">
              <span className="fert-stat-label">Días con abonado</span>
              <span className="fert-stat-value">{monthKeys.length}</span>
            </div>
          </div>
        </div>

        {/* ── PANEL DETALLE ── */}
        <div className="fert-detail-panel">
          <p className="fert-detail-title">
            {selectedDay
              ? new Date(selectedDay + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
              : 'Selecciona un día'}
          </p>

          {!selectedDay && (
            <div className="fert-empty-detail">
              Pulsa cualquier día para ver su información
            </div>
          )}

          {selectedDay && !selectedFertilizations && (
            <div className="fert-empty-detail">Sin abonado registrado este día</div>
          )}

          {selectedFertilizations && (
            selectedFertilizations.map((fert) => (
              <div className="fert-detail-card" key={fert.fertilization_id}>
                <span className="fert-detail-name">🌿 {fert.fertilizer_name}</span>
                <div className="fert-detail-fields">
                  <div className="fert-dfield">
                    <span className="fert-dfield-label">Cantidad</span>
                    <span className="fert-dfield-value">{fert.amount} {fert.unit}</span>
                  </div>
                  {fert.notes && (
                    <div className="fert-dfield fert-dfield-notes">
                      <span className="fert-dfield-label">Notas</span>
                      <span className="fert-dfield-value">{fert.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          <button
            className="fert-new-btn"
            onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm_id}/fertilizationRecord`)}
          >
            + Registrar abonado
          </button>
        </div>

      </div>
    </div>
  )
}

export default FertilizationDashboard
