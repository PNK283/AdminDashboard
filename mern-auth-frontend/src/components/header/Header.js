import React from 'react'
import "./Header.css"
import {FaHome} from 'react-icons/fa'
import {FaUserCircle} from 'react-icons/fa'
import { Link, NavLink, useNavigate} from 'react-router-dom'

const activeLink = ({isActive}) => (isActive? "active" :  "");
 
const Header = () => {
    const navigate = useNavigate();

    const goHome = () =>{
         navigate("/");
    }
  return (
    <header className='header'>
        <nav>
          <div className='logo' onClick={goHome}>
             <FaHome size={50} style={{padding:'10px' }} />
             <span>Home Page</span>
          </div>
            <ul className='home-links'>
              <li className='--flex-center'>
                <FaUserCircle size={20} />
                <p className='--color-white'>
                  Hi, Naresh
                </p>
              </li>
              <li>
                 <button className='--btn --btn-primary'>
                    <Link to="/login">Login</Link>
                 </button>
              </li>

              <li>
                  <NavLink to='/profile' className={activeLink}>Profile</NavLink>
              </li>

              <li>
                 <button className='--btn --btn-danger'>
                   Logout
                 </button>
              </li>
            </ul>                           
        </nav>
    </header>
  )
}

export default Header
