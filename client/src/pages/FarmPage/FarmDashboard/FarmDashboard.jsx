import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import './farmDashboard.css';


const FarmDashboard = () => {
  const { farms, zones, irrigations, fertilizations, user, setCurrentFarmId } = useContext(AuthContext);
  const { farm_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentFarmId(farm_id);
  }, [farm_id, setCurrentFarmId]);

  const farm = farms?.find((f) => String(f.farm_id) === farm_id);

  return (
    <div className="farm-dash">
      {/* ── INFO FINCA ── */}
      <div className="farm-dash-header">
        <div className="farm-dash-title">
          <button className="farm-back-btn" onClick={() => navigate(-1)}>
            ← Volver
          </button>
          <h1>🌾 {farm?.name ?? 'Finca'}</h1>
        </div>

        <div className="farm-info-cards">
          <div className="info-card">
            <span className="info-card-label">Ubicación</span>
            <span className="info-card-value">{farm?.location || '—'}</span>
          </div>
          <div className="info-card">
            <span className="info-card-label">Superficie</span>
            <span className="info-card-value">
              {farm?.hectares ? `${farm.hectares} ha` : '—'}
            </span>
          </div>
          <div className="info-card">
            <span className="info-card-label">Zonas</span>
            <span className="info-card-value">{zones.length}</span>
          </div>
          <div className="info-card">
            <span className="info-card-label">Descripción</span>
            <span className="info-card-value info-card-desc">
              {farm?.description || '—'}
            </span>
          </div>
        </div>
      </div>

      {/* ── BOTÓN AVERÍA ── */}
      <button
        className="fd-incident-btn"
        onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm_id}/incidentRegister`)}
      >
        ⚠️ Registrar avería
      </button>

      {/* ── SECCIONES ── */}
      <div className="farm-dash-body">
        {/* ZONAS */}
        <div className="fd-section">
          <div className="fd-section-head">
            <p className="section-title">Zonas</p>
            <button
              className="fd-add-btn"
              onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm_id}/farmZones/farmZonesRegister`)}
            >
              + Añadir zona
            </button>
          </div>
          <div className="fd-cards">
            {zones.length > 0 ? (
              zones.map((zone) => (
                <div
                  className="fd-card fd-card-clickable"
                  key={zone.zone_id}
                  onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm_id}/farmZones/${zone.zone_id}`)}
                >
                  <div className="fd-card-icon">🗺️</div>
                  <div className="fd-card-info">
                    <span className="fd-card-name">{zone.name}</span>
                  </div>
                  <span className="fd-card-arrow">→</span>
                </div>
              ))
            ) : (
              <p className="fd-empty">Sin zonas registradas</p>
            )}
          </div>
        </div>

        {/* RIEGOS */}
        <div className="fd-section">
          <div className="fd-section-head">
            <p className="section-title">Riegos</p>
            <button className="fd-add-btn" onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm_id}/irrigationRecord`)}>+ Nuevo riego</button>
          </div>
          <div className="fd-cards">
            {irrigations.length > 0 ? irrigations.map((irr) => (
              <div className="fd-card" key={irr.irrigation_id}>
                <div className="fd-card-icon">💧</div>
                <div className="fd-card-info">
                  <span className="fd-card-name">{new Date(irr.date).toLocaleDateString('es-ES')}</span>
                  <span className="fd-card-meta">
                    {irr.duration_minutes ? `${irr.duration_minutes} min` : '—'}
                    {irr.total_liters ? ` · ${irr.total_liters} L` : ''}
                  </span>
                </div>
              </div>
            )) : (
              <p className="fd-empty">Sin riegos registrados</p>
            )}
          </div>
        </div>

        {/* ABONADOS */}
        <div className="fd-section">
          <div className="fd-section-head">
            <p className="section-title">Abonados</p>
            <button className="fd-add-btn" onClick={() => navigate(`/userPage/${user?.user_id}/farms/${farm_id}/fertilizationRecord`)}>+ Nuevo abonado</button>
          </div>
          <div className="fd-cards">
            {fertilizations.length > 0 ? fertilizations.map((fert) => (
              <div className="fd-card" key={fert.fertilization_id}>
                <div className="fd-card-icon">🌿</div>
                <div className="fd-card-info">
                  <span className="fd-card-name">{fert.fertilizer_name}</span>
                  <span className="fd-card-meta">
                    {new Date(fert.date).toLocaleDateString('es-ES')} · {fert.amount} {fert.unit}
                  </span>
                </div>
              </div>
            )) : (
              <p className="fd-empty">Sin abonados registrados</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmDashboard;
