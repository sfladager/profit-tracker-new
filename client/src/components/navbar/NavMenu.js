// Bootstrap imports
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'

// react imports
import { Link, useNavigate } from 'react-router-dom'

//icons 
import { LogOut, User } from 'react-feather'

//custom functions
import { isAuthenticated, handleLogout } from '../../helpers/auth'

const NavMenu = () => {

  const navigate = useNavigate()

  return (
    <Navbar className="navbar" expand="md">
      <Container>
        <Navbar.Toggle variant="dark" className="justify-content-start" aria-controls="basic-navbar-nav" />
        <Navbar.Brand className="justify-content-start, navbar" as={Link} to="/">Profit Tracker</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-links-container">
            <div className="nav-links">
              <Nav.Link className="navbar" as={Link} to="/dashboard">Dashboard</Nav.Link>
              <Nav.Link className="navbar" as={Link} to="/trades">Trades</Nav.Link>
              <Nav.Link className="navbar" as={Link} to="/sessions">Sessions</Nav.Link>
              <NavDropdown id="nav-dropdown" title="Reports" >
                <NavDropdown.Item  to="#action/3.1">Overview</NavDropdown.Item>
                <NavDropdown.Item to="#action/3.1">Portfolio</NavDropdown.Item>
                <NavDropdown.Item to="#action/3.2">Symbols</NavDropdown.Item>
                <NavDropdown.Item to="#action/3.3">Setups</NavDropdown.Item>
                <NavDropdown.Item to="#action/3.3">Mistakes</NavDropdown.Item>
              </NavDropdown>
            </div>
            <div className="nav-buttons">
              {isAuthenticated() ?
                <>
                  <Link to="/profile">
                    <User className="icons" />
                  </Link>
                  <Link className='icons' onClick={() => handleLogout(navigate('/'))}>
                    <LogOut className="icons nav-auth-buttons" />
                  </Link>
                </>
                :
                <>
                  <Link to="/login">
                    <Button className="button-blue">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="button-light nav-auth-buttons">Sign Up</Button>
                  </Link>
                </>
              } 
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavMenu