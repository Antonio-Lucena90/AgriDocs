import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'
import './irrigationDashboard.css'

const WEEKDAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']
const MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']

const toDateKey = (date) => {
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const IrrigationDashboard = () => {
  const { irrigations, user, setCurrentFarmId } = useContext(AuthContext)
  const { farm_id } = useParams()
  const navigate = useNavigate()

  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDay, setSelectedDay] = useState(null)

  useEffect(() => {
    setCurrentFarmId(farm_id)
  }, [farm_id, setCurrentFarmId])

  // Agrupar riegos por fecha
  const irrigationsByDate = irrigations.reduce((acc, irr) => {
    const key = toDateKey(irr.date)
    if (!acc[key]) acc[key] = []
    acc[key].push(irr)
    return acc
  }, {})

  // Días del mes y offset inicial (semana empieza en lunes)
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

  // Stats del mes actual
  const monthKeys = Object.keys(irrigationsByDate).filter(k => k.startsWith(`${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`))
  const totalRiegosmes = monthKeys.reduce((sum, k) => sum + irrigationsByDate[k].length, 0)
  const totalLitrosMes = irrigations
    .filter(irr => {
      const k = toDateKey(irr.date)
      return k.startsWith(`${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`) && irr.total_liters
    })
    .reduce((sum, irr) => sum + Number(irr.total_liters), 0)

  const selectedIrrigations = selectedDay ? irrigationsByDate[selectedDay] : null

  return (
    <div className="irr-dash">

      <div className="irr-dash-header">
        <button className="irr-back-btn" onClick={() => navigate(-1)}>← Volver</button>
        <h1>💧 Riegos</h1>
      </div>

      <div className="irr-dash-body">

        {/* ── CALENDARIO ── */}
        <div className="cal-card">
          <div className="cal-nav">
            <button className="cal-nav-btn" onClick={prevMonth}>‹</button>
            <span className="cal-month-label">{MONTHS[viewMonth]} {viewYear}</span>
            <button className="cal-nav-btn" onClick={nextMonth}>›</button>
          </div>

          <div className="cal-weekdays">
            {WEEKDAYS.map(d => <div className="cal-weekday" key={d}>{d}</div>)}
          </div>

          <div className="cal-grid">
            {Array.from({ length: offset }).map((_, i) => (
              <div className="cal-day empty" key={`e-${i}`} />
            ))}

            {Array.from({ length: totalDays }).map((_, i) => {
              const day = i + 1
              const key = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              const hasIrr = !!irrigationsByDate[key]
              const count = irrigationsByDate[key]?.length ?? 0
              const isToday = key === todayKey
              const isSelected = key === selectedDay

              return (
                <div
                  key={day}
                  className={`cal-day ${hasIrr ? 'has-irrigation' : ''} ${isToday ? 'is-today' : ''} ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                  {hasIrr && <span className="cal-drop">💧</span>}
                  {count > 1 && <span className="cal-count">×{count}</span>}
                </div>
              )
            })}
          </div>

          {/* Stats del mes */}
          <div className="irr-stats">
            <div className="irr-stat">
              <span className="irr-stat-label">Riegos este mes</span>
              <span className="irr-stat-value">{totalRiegosmes}</span>
            </div>
            <div className="irr-stat">
              <span className="irr-stat-label">Litros totales</span>
              <span className="irr-stat-value">{totalLitrosMes > 0 ? `${totalLitrosMes} L` : '—'}</span>
            </div>
          </div>
        </div>

        {/* ── PANEL DETALLE ── */}
        <div className="irr-detail-panel">
          <p className="irr-detail-title">
            {selectedDay
              ? new Date(selectedDay + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
              : 'Selecciona un día regado'}
          </p>

          {selectedDay && !selectedIrrigations && (
            <div className="irr-empty-detail">Sin riego registrado este día</div>
          )}

          {selectedIrrigations && (
            selectedIrrigations.map((irr) => (
              <div className="irr-detail-card" key={irr.irrigation_id}>
                <span className="irr-detail-date">💧 Riego</span>
                <div className="irr-detail-fields">
                  <div className="irr-field">
                    <span className="irr-field-label">Hora inicio</span>
                    <span className="irr-field-value">{irr.start_time ?? '—'}</span>
                  </div>
                  <div className="irr-field">
                    <span className="irr-field-label">Duración</span>
                    <span className="irr-field-value">{irr.duration_minutes ? `${irr.duration_minutes} min` : '—'}</span>
                  </div>
                  <div className="irr-field">
                    <span className="irr-field-label">Litros</span>
                    <span className="irr-field-value">{irr.total_liters ? `${irr.total_liters} L` : '—'}</span>
                  </div>
                  <div className="irr-field">
                    <span className="irr-field-label">Presión</span>
                    <span className="irr-field-value">{irr.pressure_bar ? `${irr.pressure_bar} bar` : '—'}</span>
                  </div>
                  {irr.notes && (
                    <div className="irr-field irr-field-notes">
                      <span className="irr-field-label">Notas</span>
                      <span className="irr-field-value">{irr.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {!selectedDay && (
            <div className="irr-empty-detail">
              Pulsa cualquier día para ver su información
            </div>
          )}

          <button
            className="irr-new-btn"
            onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm_id}/irrigationRecord`)}
          >
            + Registrar riego
          </button>
        </div>

      </div>
    </div>
  )
}

export default IrrigationDashboard
