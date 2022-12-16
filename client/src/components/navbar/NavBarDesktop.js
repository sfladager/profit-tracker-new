import { Link } from 'react-router-dom'
import NavLinks from './NavLinks'
import logo from '../../assets/PROFIT-tracker.svg'

const NavBarDesktop = () => {

  return (
    <div className="navbar-container-desktop">
      <Link to={'/'}>
        <div className="navbar-logo">
          <img src={logo} alt="Profit Tracker"/>
        </div>
      </Link>
      <NavLinks />
    </div>
  )
}
export default NavBarDesktop