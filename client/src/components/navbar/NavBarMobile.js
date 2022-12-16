import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import logo from '../../assets/PROFIT-tracker.svg'
import NavLinks from './NavLinks'

// icons
import { Menu } from 'react-feather'

const NavBarMobile = () => {

  const [open, setOpen] = useState(false)
 
  const handleMenuClick = () => {
    setOpen(!open)
  }

  const closeDropdown = (e) => {
    if (!e.target.classList.contains('burger')) {
      setOpen(false)
    }  
  }

  useEffect(() => {
    if (open) {
      window.addEventListener('click', closeDropdown)
    }
  })
  

  return (
    <div className="navbar-container-mobile">
      <Link to={'/'}>
        <div className="navbar-logo">
          <img src={logo} alt="Profit Tracker"/>
        </div>
      </Link>
      <Menu className="burger" onClick={handleMenuClick} />
      {open && <div className="burger-menu">
        <NavLinks className="burger-drop" />
      </div>
      } 
    </div>
  )
}

export default NavBarMobile