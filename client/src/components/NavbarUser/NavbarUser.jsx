import { useContext } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import './navbarUser.css';


export const NavbarUser = () => {
  const navigate = useNavigate();
  const { logOut, user, currentFarmId } = useContext(AuthContext);

  const base = `/userPage/${user?.user_id}/farms/${currentFarmId}`;

  return (
    <Navbar expand="lg" className="navbar-user">
      <Container>
        <Navbar.Brand as={Link} to="/">
          AGRIDOCS
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="user-navbar-nav" />

        <Navbar.Collapse id="user-navbar-nav">
          <Nav className="me-auto align-items-lg-center gap-lg-1">

            <Nav.Link as={NavLink} to={`${base}/farmDashboard`}>
              Tu Finca
            </Nav.Link>

            <Nav.Link as={NavLink} to={`${base}/farmZones/farmZonesDashboard`}>
              Zonas
            </Nav.Link>

            <NavDropdown title="Registros" id="nav-registros" className="nav-dropdown-registros">
              <NavDropdown.Item as={NavLink} to={`${base}/irrigationDashboard`}>
                💧 Riegos
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={`${base}/fertilizationDashboard`}>
                🌿 Abonos
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={`${base}/incidentsDashboard`}>
                ⚠️ Averías
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to={`${base}/harvestDashboard`}>
                🌾 Cosecha
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to={`${base}/farmWeather`}>
              El tiempo
            </Nav.Link>

          </Nav>

          <div className="d-flex flex-column flex-lg-row align-items-center gap-3 mt-3 mt-lg-0">
            <div
              className="nav-simbol"
              onClick={() => navigate('/profile')}
              title="Ir a perfil"
            >
              {user?.name[0].toUpperCase()}
              {user?.last_name[0].toUpperCase()}
            </div>

            <Button className="my-btn" onClick={logOut}>
              LogOut
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
