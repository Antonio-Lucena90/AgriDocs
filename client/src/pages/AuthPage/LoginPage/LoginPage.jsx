import { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { fetchData } from '../../../helpers/axiosHelpers.js'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext.js'
import {ZodError} from 'zod'; 
import './login.css'
import { loginSchema } from '../../../schemas/LoginSchema.js'

const initialValue = {
  user_name: '',
  password: ''
}

const LoginPage = () => {
  const [login, setLogin] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState('');
  const [valErrors, setValErrors] = useState();

  const {setUser, setToken} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target
    setLogin({ ...login, [name]: value })
  }

  const onSubmit = async () => {
    try {
      //validar datos 
      loginSchema.parse(login);
      //mandar datos
      let res = await fetchData('user/login', 'POST', login);
      const token = res.data.token;
      //guardo el token en LS;
      //peticion para traerme los datos del usuario logueado, seguro por el token
      const resUser = await fetchData('user/oneUser', 'GET', null, token)

      localStorage.setItem('token', token)
      setUser(resUser.data.user);
      setToken(token);
      navigate('/userPage');

    } catch (error) {
          if(error instanceof ZodError){
          const fieldsErrors = {};
          error.issues.forEach((elem)=>{
            fieldsErrors[elem.path[0]] = elem.message;
          })
          setValErrors(fieldsErrors)
        }else{
          setErrorMsg(error.response.data.message);
        }
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-brand">
          <span className="auth-logo">🌾 AGRIDOCS</span>
        </div>

        <div className="auth-header">
          <h1>Bienvenido de vuelta</h1>
          <p>Accede a tu cuenta agrícola</p>
        </div>

        <div className="auth-form">
          <div className="field-group">
            <label className="field-label" htmlFor="login-email">Nombre de Usario</label>
            <input
              id="login-email"
              className="field-input"
              type="text"
              placeholder="Introduce tu nombre de Usuario"
              name="user_name"
              value={login.user_name}
              onChange={handleChange}
            />
            {valErrors?.user_name && <p className='error-msg'>{valErrors.user_name}</p>}
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="login-password">Contraseña</label>
            <input
              id="login-password"
              className="field-input"
              type="password"
              placeholder="••••••••"
              name="password"
              value={login.password}
              onChange={handleChange}
            />
            {valErrors?.password && <p className='error-msg'>{valErrors.password}</p>}
          </div>

          {errorMsg && <p className="auth-error">{errorMsg}</p>}

          <button className="btn-primary-glow" onClick={onSubmit}>
            Iniciar sesión →
          </button>

          <button className="btn-ghost" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>

        <div className="auth-divider" />

        <p className="auth-link-text">
          ¿Aún no estás registrado?
          <Link className="auth-link" to="/register">Regístrate aquí</Link>
        </p>

      </div>
    </div>
  )
}

export default LoginPage
