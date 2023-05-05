import React, {useEffect, useState} from 'react'
import styles from "./auth.module.scss"
import Card from '../../components/card/Card'
import {Link} from 'react-router-dom'
import PasswordInput from '../../components/passwordInput/PasswordInput'
import { FaTimes } from 'react-icons/fa'
import { BsCheck2All } from 'react-icons/bs' 
 
    const initialState = {
        name: '',
        email: '',
        password: '',
        password2: '',

    }

const Register = () => {
       const [formData, setformData] = useState(initialState);
       const {name,email, password, password2} = formData;
         
         const [uCase, setUCase] = useState(false);
         const [num, setNum] = useState(false);
         const [sChar, setSChar] = useState(false);
         const [passLength, setPassLength] = useState(false);

           const timesIcon = <FaTimes color='red' size={15} />
           const checkIcon =  <BsCheck2All color='green' size={15} />
         
           const switchIcon = (condition) =>{
                  if(condition){
                    return checkIcon
                  }
                  return timesIcon
           };
 

       const handleInputChange = e =>{
          const {name, value} = e.target;
          setformData({...formData, [name] : value});
       }
       

          // Password Strength
          useEffect( () => {
              //Check Lower and UpperCase
              if(password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
                     setUCase(true)
              } else {
                     setUCase(false)
              }

              //Check For Numbers
              if (password.match(/([0-9])/)) {
                     setNum(true)
              } else {
                    setNum(false)
              }

              //Check For Special Char
              if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
                    setSChar(true)
              } else {
                    setSChar(false)
               }
                //Check For Password Length
              if (password.length > 5) {
                    setPassLength(true)
              } else {
                    setPassLength(false)
               }
         
          }, [password])
       const loginUser = () =>{

       }
  return (
    <div className={`container ${styles.auth}`}>
          <Card>
            <div className={`container ${styles.form}`}>
              <h2>Register</h2>
              <br />
                 <form onSubmit={loginUser}>
                      <input type='text'
                      placeholder='Name'
                       required
                      name='name'
                       value={name}
                        onChange={handleInputChange}/>
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
                      <PasswordInput 
                      placeholder='Confirm Passsword'
                      name='password2'
                       value={password2} 
                       onChange={handleInputChange}
                      />
                        {/* Password Strength */}
                        <Card cardClass={styles.group}>
                             <ul className='form-list'>
                                <li>
                                    <span className={styles.indicator}>
                                          {switchIcon(uCase)}
                                          &nbsp; Lowercase & 
                                          Uppercase
                                    </span>
                                </li>
                                <li>
                                    <span className={styles.indicator}>
                                          {switchIcon(num)}
                                          &nbsp; Number(0-9)
                                    </span>
                                </li>
                                <li>
                                    <span className={styles.indicator}>
                                          {switchIcon(sChar)}
                                          &nbsp; Special Character (!@#$%^&*)
                                    </span>
                                </li>
                                <li>
                                    <span className={styles.indicator}>
                                          {switchIcon(passLength)}
                                          &nbsp; At least 6 Character
                                    </span>
                                </li>
                             </ul>
                        </Card>
                      {/* <input type='password'
                      placeholder='Passsword' required
                      name='password' value={password} onChange={handleInputChange}/> */}
                      <button type='submit'
                       className='--btn --btn-primary --btn-block'>
                        Register
                      </button>
                 </form>
                 <span className={styles.register}>
                    <p> &nbsp; Already have an account? &nbsp;</p>
                     <Link to="/login">Login</Link>

                 </span>
            </div>
          </Card>
       
    </div>
  )
}

export default Register;
