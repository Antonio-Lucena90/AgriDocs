import { lazy, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import {PublicRoutes} from './PublicRoutes';
import {PrivateRoutes} from './PrivateRoutes';

import PublicLayout from '../layouts/PublicLayout';
const HomePage = lazy(()=>import('../pages/publicPages/Home/Home'));
const RegisterPage = lazy(()=>import('../pages/publicPages/AuthPage/RegisterPage/RegisterPage'));
const LoginPage = lazy(()=>import('../pages/publicPages/AuthPage/LoginPage/LoginPage'));
const ErrorPage = lazy(()=>import('../pages/publicPages/ErrorPage/ErrorPage'));

//UserRoutes
import UserLayout from '../layouts/UserLayout';
const UserDashboard = lazy(()=>import('../pages/userPages/UserDashboard/UserDashboard'));

//FarmRoutes
const FarmSelector = lazy(()=>import('../pages/FarmPage/FarmSelector/FarmSelector'));
const FarmRegistration = lazy(()=>import('../pages/FarmPage/FarmRegistration/FarmRegistration'));
const FarmDashboard = lazy(()=>import('../pages/FarmPage/FarmDashboard/FarmDashboard'));
const FarmWeather = lazy(()=>import('../pages/FarmPage/FarmWeather/FarmWeather'));

//FarmZonesRoutes
const FarmZonesRegister = lazy(()=>import('../pages/FarmZones/FarmZonesRegister/FarmZonesRegister'));
const FarmZoneDashboard = lazy(()=>import('../pages/FarmZones/FarmZoneDashboard/FarmZoneDashboard'));
const OneZone = lazy(()=>import('../pages/FarmZones/OneZone/OneZone'));

//IncidentsRoutes
const IncidentsRegister = lazy(()=>import('../pages/Incidents/IncidentsRegister/IncidentsRegister'));
const IncidentsDashboard = lazy(()=>import('../pages/Incidents/IncidentsDashboard/IncidentsDashboard'));

//HarvestRoutes
const HarvestRegister = lazy(()=>import('../pages/Harvest/HarvestRegister/HarvestRegister'));
const HarvestDashboard = lazy(()=>import('../pages/Harvest/HarvestDashboard/HarvestDashboard'));

//IrrigationRoutes
const IrrigationRecord = lazy(()=>import('../pages/Irrigations/IrrigationRecord/IrrigationRecord'));
const IrrigationDashboard = lazy(()=>import('../pages/Irrigations/IrrigationDashboard/IrrigationDashboard'));

//FertilizationRoutes
const FertilizationRecord = lazy(()=>import('../pages/Fertilizations/FertilizationRecord/FertilizationRecord'));
const FertilizationDashboard = lazy(()=>import('../pages/Fertilizations/FertilizationDashboard/FertilizationDashboard'));





import { AuthContext } from '../contexts/AuthContext/AuthContext';


import AdminLayout from '../layouts/AdminLayout';
const AdminDashboard = lazy(()=>import('../pages/AdminPages/AdminDashboard/AdminDashboard'));
const AdminAllUsers = lazy(()=>import('../pages/AdminPages/AdminAllUsers/AdminAllUsers'));
const AdminInviteCodes = lazy(()=>import('../pages/adminPages/AdminInviteCodes/AdminInviteCodes'));




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
          <Route path='/selectFarm' element={<FarmSelector/>}/>

          <Route element={<UserLayout/>}>
            //UserRoutes
            <Route path='/userPage' element={<UserDashboard/>}/>

            //FarmRoutes
            <Route path='/userPage/:user_id/farms/newFarm' element={<FarmRegistration/>}/>
            <Route path='/userPage/:user_id/farms/:farm_id/farmDashboard' element={<FarmDashboard/>}/>
            <Route path='/userPage/:user_id/farms/:farm_id/farmWeather' element={<FarmWeather/>}/>

            //FarmZonesRoutes
            <Route path='/userPage/:user_id/farms/:farm_id/farmZones/farmZonesRegister' element={<FarmZonesRegister/>}/>
            <Route path='/userPage/:user_id/farms/:farm_id/farmZones/farmZonesDashboard' element={<FarmZoneDashboard/>}/>
            <Route path='/userPage/:user_id/farms/:farm_id/farmZones/:zone_id' element={<OneZone/>}/>

            //IncidentsRoutes
            <Route path='/userPage/:user_id/farms/:farm_id/incidentRegister' element={<IncidentsRegister/>}/>
            <Route path='/userPage/:user_id/farms/:farm_id/incidentsDashboard' element={<IncidentsDashboard/>}/>

            //HarvestRoutes
            <Route path='/userPage/:user_id/farms/:farm_id/farmZones/:zone_id/harvestRegister' element={<HarvestRegister/>}/>
            <Route path='/userPage/:user_id/farms/:farm_id/harvestDashboard' element={<HarvestDashboard/>}/>

            //IrrigationRoutes
            <Route path='/userPage/:user_id/farms/:farm_id/irrigationRecord' element={<IrrigationRecord/>}/>
            <Route path='/userPage/:user_id/farms/:farm_id/irrigationDashboard' element={<IrrigationDashboard/>}/>

            //FertilizationRoutes
            <Route path='/userPage/:user_id/farms/:farm_id/fertilizationRecord' element={<FertilizationRecord/>}/>
            <Route path='/userPage/:user_id/farms/:farm_id/fertilizationDashboard' element={<FertilizationDashboard/>}/>

          </Route>
        </Route>

          <Route element={<PrivateRoutes user={user} requiredType={2}/>}>
            <Route element={<AdminLayout/>}>
              <Route path='/admin/adminDashboard' element={<AdminDashboard/>}/>
              <Route path='/admin/allUsers' element={<AdminAllUsers/>}/>
              <Route path='/admin/inviteCodes' element={<AdminInviteCodes/>}/>
            </Route>
          </Route>

          <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes