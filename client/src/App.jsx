
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { AuthContextProvider } from './contexts/AuthContext/AuthContextProvider'

function App() {

  return (
    <AuthContextProvider>
      <AppRoutes/>
    </AuthContextProvider>
  )
}

export default App
