import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'
import { fetchData } from '../../../helpers/axiosHelpers'
import './adminInviteCodes.css'

const AdminInviteCodes = () => {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  const [codes, setCodes] = useState([])
  const [generating, setGenerating] = useState(false)
  const [newCode, setNewCode] = useState(null)

  useEffect(() => {
    if (!token) return
    const load = async () => {
      try {
        const res = await fetchData('admin/allCodes', 'GET', null, token)
        setCodes(res.data.codes)
      } catch (error) {
        console.error('fetchCodes error:', error)
      }
    }
    load()
  }, [token])

  const handleGenerate = async () => {
    setGenerating(true)
    setNewCode(null)
    try {
      const res = await fetchData('admin/generateCode', 'POST', {}, token)
      setNewCode(res.data.code)
      const codesRes = await fetchData('admin/allCodes', 'GET', null, token)
      setCodes(codesRes.data.codes)
    } catch (error) {
      console.error('generateCode error:', error)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="inv-codes">
      <div className="inv-codes-header">
        <button className="inv-back-btn" onClick={() => navigate('/admin/adminDashboard')}>
          ← Volver
        </button>
        <h1>🔑 Códigos de invitación</h1>
      </div>

      <div className="inv-generate-box">
        <button className="inv-generate-btn" onClick={handleGenerate} disabled={generating}>
          {generating ? 'Generando...' : '+ Generar nuevo código'}
        </button>
        {newCode && (
          <div className="inv-new-code">
            <span className="inv-new-code-label">Nuevo código generado:</span>
            <span className="inv-new-code-value">{newCode}</span>
          </div>
        )}
      </div>

      <div className="inv-table-wrap">
        <table className="inv-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Estado</th>
              <th>Usado por</th>
              <th>Creado</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((c) => (
              <tr key={c.code_id}>
                <td className="inv-code-cell">{c.code}</td>
                <td>
                  <span className={`inv-badge inv-badge-${c.is_used ? 'used' : 'available'}`}>
                    {c.is_used ? 'Usado' : 'Disponible'}
                  </span>
                </td>
                <td className="inv-td-muted">
                  {c.used_by_name ? `${c.used_by_name} ${c.used_by_last_name}` : '—'}
                </td>
                <td className="inv-td-muted">
                  {new Date(c.created_at).toLocaleDateString('es-ES')}
                </td>
              </tr>
            ))}
            {codes.length === 0 && (
              <tr>
                <td colSpan={4} className="inv-empty">No hay códigos generados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminInviteCodes
