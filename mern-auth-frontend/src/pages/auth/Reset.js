import React, {useState} from 'react'
import styles from "./auth.module.scss"
import Card from '../../components/card/Card'
import {Link} from 'react-router-dom'
import PasswordInput from '../../components/passwordInput/PasswordInput'


const initialState = {

    password: '',
    password2: '',

}


const Reset = () => {

       const [formData, setformData] = useState(initialState);
       const {password, password2} = formData;
         

       const handleInputChange = () =>{

       }
       const loginUser = () =>{

       }
  return (
    <div className={`container ${styles.auth}`}>
          <Card>
            <div className={`container ${styles.form}`}>
              <h2>Reset Passsword</h2>

                 <form onSubmit={loginUser}>
                 <PasswordInput 
                      placeholder='Passsword'
                      name='password'
                       value={password} 
                       onChange={handleInputChange}
                      />
                      <PasswordInput 
                      placeholder='Confirm Passsword'
                      name='password2'
                       value={password2} 
                       onChange={handleInputChange}
                      />
                      <button type='submit'
                       className='--btn --btn-primary --btn-block'>
                        Reset Passsword
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

export default Reset;

