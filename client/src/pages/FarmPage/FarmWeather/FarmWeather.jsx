import { useContext, useEffect, useState } from "react"
import { useParams } from 'react-router'
import axios from 'axios'
import { AuthContext } from "../../../contexts/AuthContext/AuthContext"
import "./farmWeather.css"

const apiWeather = import.meta.env.VITE_API_KEY_WEATHER

const WEATHER_ICONS = {
  Clear: '☀️', Clouds: '☁️', Rain: '🌧️',
  Drizzle: '🌦️', Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Fog: '🌫️',
}

const getDayName = (dt_txt) =>
  new Date(dt_txt).toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', '')

const FarmWeather = () => {
  const { farms } = useContext(AuthContext)
  const { farm_id } = useParams()
  const [dataWeather, setDataWeather] = useState(null)

  const farm = farms?.find(f => String(f.farm_id) === farm_id)

  const prepareDataWeather = (array) => {
    // Agrupar todas las entradas por día
    const byDay = {}
    array.forEach(item => {
      const day = item.dt_txt.split(' ')[0]
      if (!byDay[day]) byDay[day] = []
      byDay[day].push(item)
    })

    // Filtrar una entrada por día (la misma hora siempre)
    const searchHour = array[0].dt_txt.split(' ')[1]
    const filtered = array.filter(e => e.dt_txt.includes(searchHour))

    // Sustituir temp_max y temp_min con los valores reales del día completo
    return filtered.map(item => {
      const day = item.dt_txt.split(' ')[0]
      const dayEntries = byDay[day]
      const realMax = Math.max(...dayEntries.map(e => e.main.temp_max))
      const realMin = Math.min(...dayEntries.map(e => e.main.temp_min))
      return { ...item, main: { ...item.main, temp_max: realMax, temp_min: realMin } }
    })
  }

  useEffect(() => {
    if (!farm?.location) return
    const fetchWeather = async () => {
      try {
        const resWeather = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast/?q=${farm.location},${farm.country_code}&units=metric&appid=${apiWeather}`
        )
        setDataWeather(prepareDataWeather(resWeather.data.list))
      } catch (error) {
        console.log('Error al cargar el tiempo', error)
      }
    }
    fetchWeather()
  }, [farm?.location])

  if (!dataWeather || dataWeather.length === 0) return (
    <div className="weather-page">
      <div className="weather-loading">Cargando datos del tiempo...</div>
    </div>
  )

  const current = dataWeather[0]
  const forecast = dataWeather.slice(1, 5)
  const icon = current?.weather?.[0]?.icon ?? '01d'
  const mainWeather = current?.weather?.[0]?.main ?? 'Clear'

  return (
    <div className="weather-page">

      {/* ── CARD PRINCIPAL ── */}
      <div className="weather-main-card">
        <div className="weather-location">
          📍 {farm?.location}
        </div>

        <div className="weather-current">
          <div className="weather-icon-wrap">
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={current.weather[0].description}
              className="weather-icon-img"
            />
            <span className="weather-emoji">{WEATHER_ICONS[mainWeather] ?? '🌤️'}</span>
          </div>
          <div className="weather-temp-block">
            <span className="weather-temp">{Math.round(current?.main?.temp ?? 0)}°</span>
            <span className="weather-desc">{current?.weather?.[0]?.description ?? ''}</span>
            <div className="weather-minmax">
              <span className="temp-max">↑ {Math.round(current.main.temp_max)}°</span>
              <span className="temp-min">↓ {Math.round(current.main.temp_min)}°</span>
            </div>
          </div>
        </div>

        {/* ── DETALLES ── */}
        <div className="weather-details">
          <div className="weather-detail-item">
            <span className="detail-icon">💧</span>
            <span className="detail-value">{current.main.humidity}%</span>
            <span className="detail-label">Humedad</span>
          </div>
          <div className="weather-detail-item">
            <span className="detail-icon">💨</span>
            <span className="detail-value">{Math.round(current.wind.speed * 3.6)} km/h</span>
            <span className="detail-label">Viento</span>
          </div>
          <div className="weather-detail-item">
            <span className="detail-icon">🌡️</span>
            <span className="detail-value">{Math.round(current.main.feels_like)}°</span>
            <span className="detail-label">Sensación</span>
          </div>
          <div className="weather-detail-item">
            <span className="detail-icon">🌂</span>
            <span className="detail-value">{Math.round(current.pop * 100)}%</span>
            <span className="detail-label">Lluvia</span>
          </div>
        </div>
      </div>

      {/* ── PRONÓSTICO ── */}
      <div className="weather-forecast">
        <p className="forecast-title">Próximos días</p>
        <div className="forecast-strip">
          {forecast.map((item) => (
            <div className="forecast-card" key={item.dt}>
              <span className="forecast-day">{getDayName(item.dt_txt)}</span>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                className="forecast-icon"
              />
              <span className="forecast-temp">{Math.round(item.main.temp)}°</span>
              <div className="forecast-minmax">
                <span className="fcast-max">↑{Math.round(item.main.temp_max)}°</span>
                <span className="fcast-min">↓{Math.round(item.main.temp_min)}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default FarmWeather
