import React, {useState} from 'react'
import styles from "./auth.module.scss"
import Card from '../../components/card/Card'
import {Link} from 'react-router-dom'
import PasswordInput from '../../components/passwordInput/PasswordInput'


const Login = () => {
       const [email, setEmail] = useState("")
       const [password, setPassword] = useState("")

       const handleInputChange = () =>{

       }
       const loginUser = () =>{

       }
  return (
    <div className={`container ${styles.auth}`}>
          <Card>
            <div className={`container ${styles.form}`}>
              <h2>Login</h2>
              <div className='--flex-center'>
                   <button className='--btn --btn-google'>Login With Google</button>
              </div>
              <br />
              <p className='--text-center --fw-bold'>or</p>

                 <form onSubmit={loginUser}>
                      <input type='email'
                      placeholder='Email'
                       required
                      name='email'
                       value={email}
                        onChange={handleInputChange}/>
                      <PasswordInput 
                      placeholder='Passsword'
                      name='password'
                       value={password} 
                       onChange={handleInputChange}
                      />
                      {/* <input type='password'
                      placeholder='Passsword' required
                      name='password' value={password} onChange={handleInputChange}/> */}
                      <button type='submit'
                       className='--btn --btn-primary --btn-block'>
                        Login
                      </button>
                 </form>
                 <Link to="/forgot">Forgot Passsword</Link>
                 <span className={styles.register}>
                    <p> &nbsp; Don't have an account? &nbsp;</p>
                     <Link to="/register">Register</Link>

                 </span>
            </div>
          </Card>
       
    </div>
  )
}

export default Login
