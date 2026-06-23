import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { ZodError } from "zod"
import { AuthContext } from "../../../contexts/AuthContext/AuthContext"
import { fetchData } from "../../../helpers/axiosHelpers"
import { farmSchema } from "../../../schemas/FarmSchema"
import "./FarmRegistration.css"

const initialValue = {
  name: '',
  location: '',
  hectares: '',
  description: '',
}

const FarmRegistration = () => {
  const { token, setFarms } = useContext(AuthContext)
  const navigate = useNavigate()

  const [form, setForm] = useState(initialValue)
  const [valErrors, setValErrors] = useState({})
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const onSubmit = async () => {
    try {
      setValErrors({})
      setErrorMsg('')

      farmSchema.parse(form)

      await fetchData('farm/createFarm', 'POST', form, token)

      const res = await fetchData('farm/myFarms', 'GET', null, token)
      setFarms(res.data.farms)

      navigate(`/userPage`)

    } catch (error) {
      if (error instanceof ZodError) {
        const fieldsErrors = {}
        error.issues.forEach((elem) => {
          fieldsErrors[elem.path[0]] = elem.message
        })
        setValErrors(fieldsErrors)
      } else {
        setErrorMsg(error.response?.data?.message || 'Error al crear la finca')
      }
    }
  }

  return (
    <div className="farm-reg-page">

      <div className="farm-reg-card">

        <div className="farm-reg-header">
          <div className="farm-reg-icon">🌾</div>
          <h1>Nueva finca</h1>
          <p>Rellena los datos de tu explotación agrícola</p>
        </div>

        <form className="farm-reg-form" onSubmit={(e) => e.preventDefault()}>

          <div className="form-group">
            <label htmlFor="name">Nombre de la finca <span className="required">*</span></label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ej: Finca El Olivo"
              className={`farm-input ${valErrors.name ? 'input-error' : ''}`}
              value={form.name}
              onChange={handleChange}
            />
            {valErrors.name && <p className="farm-error">{valErrors.name}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Ubicación</label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Ej: Jaén, Andalucía"
                className={`farm-input ${valErrors.location ? 'input-error' : ''}`}
                value={form.location}
                onChange={handleChange}
              />
              {valErrors.location && <p className="farm-error">{valErrors.location}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="hectares">Superficie (ha)</label>
              <input
                id="hectares"
                name="hectares"
                type="number"
                placeholder="Ej: 12.5"
                step="0.01"
                min="0"
                className={`farm-input ${valErrors.hectares ? 'input-error' : ''}`}
                value={form.hectares}
                onChange={handleChange}
              />
              {valErrors.hectares && <p className="farm-error">{valErrors.hectares}</p>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Describe brevemente la finca, cultivos principales, características..."
              className={`farm-input farm-textarea ${valErrors.description ? 'input-error' : ''}`}
              value={form.description}
              onChange={handleChange}
            />
            {valErrors.description && <p className="farm-error">{valErrors.description}</p>}
          </div>

          {errorMsg && <p className="farm-error farm-error-global">{errorMsg}</p>}

          <button type="submit" className="farm-reg-btn" onClick={onSubmit}>
            Crear finca
          </button>

          <button type="button" className="farm-reg-btn-ghost" onClick={() => navigate('/userPage')}>
            Cancelar
          </button>

        </form>
      </div>

    </div>
  )
}

export default FarmRegistration
