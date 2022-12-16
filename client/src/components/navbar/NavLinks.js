import { Link, useNavigate } from 'react-router-dom'

//custom functions
import { isAuthenticated, handleLogout } from '../../helpers/auth'

// BootStrap
import Button from 'react-bootstrap/Button'

// icons
import { User, LogOut } from 'react-feather'
const NavLinks = () => {

  const navigate = useNavigate()

  return (
    <div className="nav-links-container">
      <div className="nav-buttons">
        {isAuthenticated() ?
          <>
            <Link className="nav-link" as={Link} to="/dashboard">Dashboard</Link>
            <Link className="nav-link" as={Link} to="/trades">Trades</Link>
            <Link className="nav-link" as={Link} to="/sessions">Sessions</Link>
            <Link to="/profile">
              <User className="nav-icons" />
            </Link>
            <Link className='icons' onClick={() => handleLogout(navigate('/'))}>
              <LogOut className="nav-icons nav-auth-buttons" />
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
    </div>
  )
}

export default NavLinks