import React, {useState} from 'react'
import styles from "./auth.module.scss"
import Card from '../../components/card/Card'
import {Link} from 'react-router-dom'



const LoginWithCode = () => {
       const [loginCode, setloginCode] = useState("")
       

       const handleInputChange = () =>{

       }
       const loginUser = () =>{

       }
  return (
    <div className={`container ${styles.auth}`}>
          <Card>
            <div className={`container ${styles.form}`}>
              <h2>Enter Access Code</h2>

                 <form onSubmit={loginUser}>
                      <input type='text'
                      placeholder='Accces Code'
                       required
                      name='loginCode'
                       value={loginCode}
                        onChange={(e) => (e.target.value)}/>
                      {/* <input type='password'
                      placeholder='Passsword' required
                      name='password' value={password} onChange={handleInputChange}/> */}
                      <button type='submit'
                       className='--btn --btn-primary --btn-block'>
                        Procees To Login
                      </button>
                      <span className='--flex-center'>
                        check your email for login access code
                      </span>
                      <div className={styles.links}>
                    <p>
                     <Link to="/">- Home</Link>
                     </p>
                    <p>
                     <b className='v-link --color-primary'>Resend Code</b>
                     </p>
                 </div>
                 </form>
                 
                 
            </div>
          </Card>
       
    </div>
  )
}

export default LoginWithCode;

