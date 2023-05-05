import React from 'react'
import "./Home.css"
// import Header from '../../components/header/Header'
// import Footer from '../../components/footer/Footer'
import loginImg from "../../assests/login.svg";

const Home = () => {
  return (
    <div>
         <section className='container hero'>
            <div className='hero-text'>
                <h2>Ultimate MERN  stack Authenticationa and
                   Admin Dashboard</h2>
                   <p>Learn and master Authentication and 
                    Authorization using MERN stack.</p>
                    <p>Implementation User Registration, Login, 
                      Password reset, Social Login, User
                      Permissions, Email Notifications etc. 
                    </p>
                    <div className='hero-buttons --flex-start'>
                        <button className='--btn --btn-danger'>
                            Register
                        </button>

                        <button className='--btn --btn-primary'>
                            Login
                        </button>
                    </div>
            </div>
            <div className='hero-image'>
                <img src={loginImg} alt='auth'/>
            </div>
         </section>
    </div>
  )
}

export default Home
