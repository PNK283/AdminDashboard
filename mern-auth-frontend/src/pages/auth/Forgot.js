import React, {useState} from 'react'
import styles from "./auth.module.scss"
import Card from '../../components/card/Card'
import {Link} from 'react-router-dom'



const Forgot = () => {
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
              <h2>Forgot Passsword</h2>

                 <form onSubmit={loginUser}>
                      <input type='email'
                      placeholder='Email'
                       required
                      name='email'
                       value={email}
                        onChange={handleInputChange}/>
                      {/* <input type='password'
                      placeholder='Passsword' required
                      name='password' value={password} onChange={handleInputChange}/> */}
                      <button type='submit'
                       className='--btn --btn-primary --btn-block'>
                        Login
                      </button>
                      <div className={styles.links}>
                    <p>
                     <Link to="/">- Home</Link>
                     </p>
                    <p>
                     <Link to="/register">- Login</Link>
                     </p>
                 </div>
                 </form>
                 
                 
            </div>
          </Card>
       
    </div>
  )
}

export default Forgot;

