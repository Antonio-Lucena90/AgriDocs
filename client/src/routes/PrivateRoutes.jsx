import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

export const PrivateRoutes = ({user, requiredType}) => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(user?.role !== requiredType) navigate('/')
  },[user])
  return (
    <>
      {user?.role === requiredType && <Outlet/>}
    </>
  )
}
