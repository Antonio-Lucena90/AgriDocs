import { useNavigate } from 'react-router-dom';
import './Home.css';

const FEATURES = [
  { icon: '📋', color: 'green',  title: 'Documentación Digital',   desc: 'Centraliza toda la documentación agrícola en un espacio digital seguro y organizado.' },
  { icon: '📊', color: 'teal',   title: 'Analytics Avanzados',     desc: 'Visualiza métricas y datos en tiempo real sobre el rendimiento de tus cultivos.' },
  { icon: '🌍', color: 'blue',   title: 'Multi-Región',            desc: 'Soporte para múltiples regiones agrícolas con configuraciones localizadas.' },
  { icon: '🔒', color: 'purple', title: 'Seguridad Total',         desc: 'Tus datos protegidos con encriptación end-to-end y acceso controlado por roles.' },
  { icon: '🤝', color: 'orange', title: 'Colaboración en Equipo',  desc: 'Trabaja con agricultores, asesores y gestores desde una sola plataforma.' },
  { icon: '📱', color: 'pink',   title: 'Acceso Móvil',            desc: 'Gestiona tu campo desde cualquier dispositivo, en cualquier momento y lugar.' },
];

const STEPS = [
  { num: '01', title: 'Crea tu cuenta',         desc: 'Regístrate en menos de 2 minutos y configura tu perfil agrícola personalizado.' },
  { num: '02', title: 'Sube tu documentación',  desc: 'Importa o crea documentos, fichas técnicas y registros de cultivos fácilmente.' },
  { num: '03', title: 'Gestiona y optimiza',    desc: 'Analiza, comparte y toma decisiones basadas en datos reales de tu campo.' },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🌱 Plataforma Agrícola Digital</div>

          <h1>
            Documenta el{' '}
            <span className="gradient-text">Futuro</span>
            <br />del Campo
          </h1>

          <p className="hero-desc">
            La plataforma más completa para gestionar, documentar y optimizar
            tus prácticas agrícolas con tecnología de vanguardia.
          </p>

          <div className="hero-btns">
            <button className="btn-primary-glow" onClick={() => navigate('/register')}>
              Empezar Gratis →
            </button>
            <button className="btn-ghost" onClick={() => navigate('/about')}>
              Ver demo
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num">+2,400</span>
              <span className="stat-label">Agricultores</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">+18k</span>
              <span className="stat-label">Documentos</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">98%</span>
              <span className="stat-label">Satisfacción</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="glass-card hero-card">
            <div className="card-icon">🌾</div>
            <div className="card-label">Cultivos Documentados</div>
            <div className="card-value">1,284</div>
            <div className="card-trend">↑ 12% este mes</div>
          </div>
          <div className="float-chip chip-1">📊 Análisis en tiempo real</div>
          <div className="float-chip chip-2">🔒 Datos seguros</div>
          <div className="float-chip chip-3">🌍 Multi-región</div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-badge">Características</span>
          <h2>
            Todo lo que necesitas para{' '}
            <span className="gradient-text">gestionar tu campo</span>
          </h2>
        </div>

        <div className="features-grid">
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className={`feature-icon ${f.color}`}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section">
        <div className="stats-band">
          <div className="stats-item"><h3>+2,400</h3><p>Agricultores activos</p></div>
          <div className="stats-item"><h3>18,000+</h3><p>Documentos gestionados</p></div>
          <div className="stats-item"><h3>47</h3><p>Regiones cubiertas</p></div>
          <div className="stats-item"><h3>98%</h3><p>Satisfacción de usuarios</p></div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-section">
        <div className="section-header">
          <span className="section-badge">Proceso</span>
          <h2>
            ¿Cómo <span className="gradient-text">funciona</span>?
          </h2>
        </div>

        <div className="steps-grid">
          {STEPS.map((s) => (
            <div className="step-card" key={s.num}>
              <div className="step-number">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>
            ¿Listo para{' '}
            <span className="gradient-text">digitalizar</span>
            {' '}tu campo?
          </h2>
          <p className="cta-desc">
            Únete a miles de agricultores que ya aprovechan la tecnología
            para optimizar sus cultivos.
          </p>
          <button className="btn-primary-glow" onClick={() => navigate('/register')}>
            Crear cuenta gratuita →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <div className="home-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">AGRIDOCS</span>
            <span className="footer-tagline">Documentando el futuro del campo</span>
          </div>
          <div className="footer-links">
            <button className="footer-link" onClick={() => navigate('/')}>Home</button>
            <button className="footer-link" onClick={() => navigate('/about')}>About</button>
            <button className="footer-link" onClick={() => navigate('/register')}>Registrarse</button>
            <button className="footer-link" onClick={() => navigate('/login')}>Login</button>
          </div>
          <span className="footer-copy">© 2026 AGRIDOCS. Todos los derechos reservados.</span>
        </div>
      </div>

    </div>
  );
};

export default Home;
