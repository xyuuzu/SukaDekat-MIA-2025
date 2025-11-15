import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router-dom';

function MyNavbar() {
  return (
    <Navbar expand="lg" className="navbar sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand"><span className="text-dark">Suka</span>dekat</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Gunakan NavLink dan className nav-link */}
            <Nav.Link as={NavLink} to="/" className="nav-link">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/umkm" className="nav-link">UMKM</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;