import { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import './navbarUser.css';


export const NavbarUser = () => {
  const navigate = useNavigate();
  const { logOut, user, currentFarmId } = useContext(AuthContext);

  return (
    <Navbar expand="lg" className="navbar-user">
      <Container>
        <Navbar.Brand as={Link} to="/">
          AGRIDOCS
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="user-navbar-nav" />

        <Navbar.Collapse id="user-navbar-nav">
          <Nav className="me-auto text-center text-lg-start">
            <Nav.Link as={NavLink} to={`/userPage/${user?.user_id}/farms/${currentFarmId}/farmDashboard`}>
              Tu Finca
            </Nav.Link>
          </Nav>
          <Nav className="me-auto text-center text-lg-start">
            <Nav.Link as={NavLink} to={`/userPage/${user?.user_id}/farms/${currentFarmId}/farmZones/farmZonesDashboard`}>
              Zonas de tu Finca 
            </Nav.Link>
          </Nav>
          <Nav className="me-auto text-center text-lg-start">
            <Nav.Link as={NavLink} to={`/userPage/${user?.user_id}/farms/${currentFarmId}/irrigationDashboard`}>
              Riegos
            </Nav.Link>
          </Nav>
          <Nav className="me-auto text-center text-lg-start">
            <Nav.Link as={NavLink} to={`/userPage/${user?.user_id}/farms/${currentFarmId}/fertilizationDashboard`}>
              Abonos 
            </Nav.Link>
          </Nav>
          <Nav className="me-auto text-center text-lg-start">
            <Nav.Link as={NavLink} to={`/userPage/${user?.user_id}/farms/${currentFarmId}/incidentsDashboard`}>
              Averías
            </Nav.Link>
          </Nav>
          <Nav className="me-auto text-center text-lg-start">
            <Nav.Link as={NavLink} to={`/userPage/${user?.user_id}/farms/${currentFarmId}/farmWeather`}>
              El tiempo en tu Finca 
            </Nav.Link>
          </Nav>

          <div className="d-flex flex-column flex-lg-row align-items-center gap-3 mt-3 mt-lg-0">
            <div className="d-flex align-items-center gap-2">
              <div
                className="nav-simbol"
                onClick={() => navigate('/profile')}
                title="Ir a perfil"
              >
                {user?.name[0].toUpperCase()}
                {user?.last_name[0].toUpperCase()}
              </div>
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