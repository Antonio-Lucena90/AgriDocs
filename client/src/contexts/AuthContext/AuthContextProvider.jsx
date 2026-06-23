import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { fetchData } from '../../helpers/axiosHelpers.js'


export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState()
  const [token, setToken] = useState()
  const [farms, setFarms] = useState([])
  const [zones, setZones] = useState([])
  const [irrigations, setIrrigations] = useState([])
  const [fertilizations, setFertilizations] = useState([])
  const [currentFarmId, setCurrentFarmId] = useState(null)

  useEffect(() => {
    const tokenLS = localStorage.getItem('token')
    if (tokenLS) {
      const fetchUser = async () => {
        try {
          const resUser = await fetchData('user/oneUser', 'GET', null, tokenLS)
          setToken(tokenLS)
          setUser(resUser.data.user)
        } catch (error) {
          console.log(error)
        }
      }
      fetchUser()
    }
  }, [])

  useEffect(() => {
    if (!token) return
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

  useEffect(() => {
    if (!token || !currentFarmId) return
    const getZones = async () => {
      try {
        const res = await fetchData(`farmZone/${currentFarmId}/zones`, 'GET', null, token)
        setZones(res.data.zones)
      } catch (error) {
        console.log('Error cargando zonas:', error)
      }
    }
    const getIrrigations = async () => {
      try {
        const res = await fetchData(`irrigation/${currentFarmId}/irrigations`, 'GET', null, token)
        setIrrigations(res.data.irrigations)
      } catch (error) {
        console.log('Error cargando riegos:', error)
      }
    }
    const getFertilizations = async () => {
      try {
        const res = await fetchData(`fertilized/${currentFarmId}/fertilizations`, 'GET', null, token)
        setFertilizations(res.data.fertilizations)
      } catch (error) {
        console.log('Error cargando abonados:', error)
      }
    }
    getZones()
    getIrrigations()
    getFertilizations()
  }, [currentFarmId, token])

  const logOut = () => {
    setUser()
    setToken()
    setFarms([])
    setZones([])
    setIrrigations([])
    setFertilizations([])
    setCurrentFarmId(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{
      user, setUser,
      token, setToken,
      farms, setFarms,
      zones, setZones,
      irrigations, setIrrigations,
      fertilizations, setFertilizations,
      currentFarmId, setCurrentFarmId,
      logOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
