import { lazy, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import {PublicRoutes} from './PublicRoutes';
import {PrivateRoutes} from './PrivateRoutes';

import PublicLayout from '../layouts/PublicLayout';
const HomePage = lazy(()=>import('../pages/publicPages/Home/Home'));
const RegisterPage = lazy(()=>import('../pages/AuthPage/RegisterPage/RegisterPage'));
const LoginPage = lazy(()=>import('../pages/AuthPage/LoginPage/LoginPage'));
const ErrorPage = lazy(()=>import('../pages/publicPages/ErrorPage/ErrorPage'));


import UserLayout from '../layouts/UserLayout';
const UserDashboard = lazy(()=>import('../pages/userPages/UserDashboard/UserDashboard'));


import AdminLayout from '../layouts/AdminLayout';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

const AppRoutes = () => {

  const {user} = useContext(AuthContext);
  
  return (
    <BrowserRouter>
      <Routes>  
        <Route element={<PublicRoutes/>}>
          <Route element={<PublicLayout/>}>
            <Route path='/' element={<HomePage/>} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/login' element={<LoginPage/>} />
          </Route>
        </Route>

        <Route element={<PrivateRoutes user={user} requiredType={1}/>}>
          <Route element={<UserLayout/>}>
            <Route path='/userPage' element={<UserDashboard/>}/>
          </Route>
        </Route>

          <Route element={<PrivateRoutes user={user} requiredType={2}/>}>
            <Route element={<AdminLayout/>}>

            </Route>
          </Route>

          <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes