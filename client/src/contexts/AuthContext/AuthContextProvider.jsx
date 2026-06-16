import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { fetchData } from '../../helpers/axiosHelpers.js'


export const AuthContextProvider = ({children}) => {
 const [user, setUser] = useState()
 const [token, setToken] = useState();

 useEffect(()=>{
    const tokenLS = localStorage.getItem('token')
    if(tokenLS){
      const fetchUser = async () => {
        try{
          const resUser = await fetchData('user/oneUser', 'GET', null, tokenLS)
          setToken(tokenLS)
          setUser(resUser.data.user);
        }catch(error){
          console.log(error);
        }
      }
      fetchUser();
    }
  },[])

  const logOut = ()=>{
    setUser();
    setToken();
    localStorage.removeItem('token')
  }

  return (
  <AuthContext.Provider value={{
                            user,
                            setUser,
                            logOut,
                            token,
                            setToken,
  }}>
    {children}
  </AuthContext.Provider>
 )
}
