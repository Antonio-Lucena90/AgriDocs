import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { registerSchema } from '../../../schemas/RegisterSchema.js';
import { ZodError } from 'zod';
import { fetchData } from '../../../helpers/axiosHelpers.js';
import './register.css';

const initialValue = {
  name: '',
  last_name: '',
  user_name: '',
  password: '',
  farm_name: ''
};

const RegisterPage = () => {
  const [register, setRegister] = useState(initialValue);
  const [valErrors, setValErrors] = useState('');
  const [fetchError, setFetchError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    try {
      registerSchema.parse(register);
      console.log('Validación ok');
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldsErrors = {};
        error.issues.forEach((elem) => {
          fieldsErrors[elem.path[0]] = elem.message;
        });
        setValErrors(fieldsErrors);
      } else {
        setValErrors({})
        if (error.response.data.errno === 1062) {
          setFetchError('email repetido')
        } else {
          setFetchError('Ups, hay un error chungo');
        }
      }
    }
    const res = await fetchData('user/register', 'POST', register)
    console.log(res);
    navigate('/login')
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-brand">
          <span className="auth-logo">🌾 AGRIDOCS</span>
        </div>

        <div className="auth-header">
          <h1>Crea tu cuenta</h1>
          <p>Únete a la plataforma agrícola digital</p>
        </div>

        <div className="auth-form">

          {/* Nombre + Apellidos en 2 columnas */}
          <div className="field-row">
            <div className="field-group">
              <label className="field-label" htmlFor="reg-name">Nombre</label>
              <input
                id="reg-name"
                className="field-input"
                type="text"
                placeholder="Introduce tu nombre"
                name="name"
                value={register.name}
                onChange={handleChange}
              />
              {valErrors?.name && <p className="field-error">{valErrors.name}</p>}
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="reg-last">Apellidos</label>
              <input
                id="reg-last"
                className="field-input"
                type="text"
                placeholder="Introduce tus apellidos"
                name="last_name"
                value={register.last_name}
                onChange={handleChange}
              />
              {valErrors?.last_name && <p className="field-error">{valErrors.last_name}</p>}
            </div>
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="reg-username">Nombre de usuario</label>
            <input
              id="reg-username"
              className="field-input"
              type="text"
              placeholder="Introduce un nombre de usuario"
              name="user_name"
              value={register.user_name}
              onChange={handleChange}
            />
            {valErrors?.user_name && <p className="field-error">{valErrors.user_name}</p>}
            {fetchError?.user_name && <p className="field-error">{fetchError.email}</p>}
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="reg-password">Contraseña</label>
            <input
              id="reg-password"
              className="field-input"
              type="password"
              placeholder="••••••••"
              name="password"
              value={register.password}
              onChange={handleChange}
            />
            {valErrors?.password && <p className="field-error">{valErrors.password}</p>}
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="reg-farm">Nombre de la finca</label>
            <input
              id="reg-farm"
              className="field-input"
              type="text"
              placeholder="Introduce el nombre de la Finca"
              name="farm_name"
              value={register.farm_name}
              onChange={handleChange}
            />
            {valErrors?.farm_name && <p className="field-error">{valErrors.farm_name}</p>}
          </div>

          {fetchError && <p className="auth-error">{fetchError}</p>}

          <button className="btn-primary-glow" onClick={onSubmit}>
            Crear cuenta →
          </button>

          <button className="btn-ghost" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>

        <div className="auth-divider" />

        <p className="auth-link-text">
          ¿Ya tienes cuenta?
          <Link className="auth-link" to="/login">Inicia sesión aquí</Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;
