import React, { useContext } from 'react'
import { NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthContext from '../store/AuthContext'

function Header() {
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn
  return (
    <div >
        
        <NavLink>
            
           
            <Link to ='/'></Link>
        </NavLink>
      
    </div>
  )
}

export default Header
