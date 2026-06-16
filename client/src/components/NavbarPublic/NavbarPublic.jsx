import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";

import './navbarPublic.css';

const NavbarPublic = () => {
  const navigate = useNavigate();
  return (
    <Navbar className="ppal" fixed="top" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to='/'>AGRIDOCS</Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-collapse" />
        <Navbar.Collapse id="nav-collapse">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/about'>About</Nav.Link>
          </Nav>
          <div className="d-flex gap-3">
            <Button className='my-btn' onClick={() => navigate('/register')}>Register</Button>
            <Button className='my-btn' onClick={() => navigate('/login')}>Login</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarPublic
