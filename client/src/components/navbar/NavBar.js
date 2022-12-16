import NavBarMobile from './NavBarMobile'
import NavBarDesktop from './NavBarDesktop'

const NavBar = () => {



  return (
    <div className="navbar-container">
      <NavBarDesktop />
      <NavBarMobile />
    </div>
  )
}
export default NavBar