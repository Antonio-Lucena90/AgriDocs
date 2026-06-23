import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { AuthContext } from "../../../contexts/AuthContext/AuthContext"
import { fetchData } from "../../../helpers/axiosHelpers"
import "./farmZonesRegister.css"

const FarmZonesRegister = () => {
  const { token, user, zones, setZones } = useContext(AuthContext)
  const { farm_id } = useParams()
  const navigate = useNavigate()

  const [zoneInputs, setZoneInputs] = useState([''])
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (index, value) => {
    const updated = [...zoneInputs]
    updated[index] = value
    setZoneInputs(updated)
  }

  const addZone = () => setZoneInputs([...zoneInputs, ''])

  const removeZone = (index) => {
    if (zoneInputs.length === 1) return
    setZoneInputs(zoneInputs.filter((_, i) => i !== index))
  }

  const onSubmit = async () => {
    try {
      setErrorMsg('')
      const filled = zoneInputs.filter(z => z.trim() !== '')
      if (filled.length === 0) {
        setErrorMsg('Añade al menos una zona')
        return
      }
      await fetchData(`farmZone/${farm_id}/createZones`, 'POST', { zones: filled }, token)

      const res = await fetchData(`farmZone/${farm_id}/zones`, 'GET', null, token)
      setZones(res.data.zones)

      navigate(`/userPage/${user?.user_id}/farms/${farm_id}/farmDashboard`)
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Error al guardar las zonas')
    }
  }

  return (
    <div className="zones-reg-page">
      <div className="zones-reg-card">

        <div className="zones-reg-header">
          <div className="zones-reg-icon">🗺️</div>
          <h1>Zonas de la finca</h1>
          <p>Añade todas las zonas que quieras gestionar</p>
        </div>

        {zones.length > 0 && (
          <div className="zones-existing">
            <p className="zones-existing-label">Zonas actuales</p>
            {zones.map((z) => (
              <div className="zone-existing-row" key={z.zone_id}>
                <span className="zone-number">✓</span>
                <span className="zone-existing-name">{z.name}</span>
              </div>
            ))}
          </div>
        )}

        <div className="zones-list">
          {zoneInputs.map((zone, index) => (
            <div className="zone-row" key={index}>
              <span className="zone-number">{zones.length + index + 1}</span>
              <input
                type="text"
                className="zone-input"
                placeholder="Ej: Zona Norte, Parcela Alta..."
                value={zone}
                onChange={(e) => handleChange(index, e.target.value)}
              />
              <button
                className="zone-remove-btn"
                onClick={() => removeZone(index)}
                disabled={zoneInputs.length === 1}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button className="zones-add-btn" onClick={addZone}>
          + Añadir zona
        </button>

        {errorMsg && <p className="zones-error">{errorMsg}</p>}

        <div className="zones-actions">
          <button className="zones-submit-btn" onClick={onSubmit}>
            Guardar zonas
          </button>
          <button className="zones-cancel-btn" onClick={() => navigate(-1)}>
            Cancelar
          </button>
        </div>

      </div>
    </div>
  )
}

export default FarmZonesRegister
