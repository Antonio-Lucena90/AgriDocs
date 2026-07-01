import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { AuthContext } from '../contexts/AuthContext/AuthContext'

export const PublicRoutes = () => {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      if(user.role === 2) navigate('/admin/adminDashboard')
      if(user.role === 1) navigate('/selectFarm')
    }
  },[user])

  return (
    <>
    {!user &&<Outlet/>}
     </>
  )
}
