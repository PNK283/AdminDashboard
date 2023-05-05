import React, { useState } from 'react'
import Card from '../../components/card/Card'
import profileImg from '../../assests/avatarr.png'
import './ChangePassword.css'
import PageMenu from '../../components/pageMenu/PageMenu'
import PasswordInput from '../../components/passwordInput/PasswordInput'
   
   const initialState = {
       oldPassword: '',
       password: '',
       password2: '',
       
   }

const ChangePassword = () => {
         const [formData, setFormData] = useState(initialState)
         const {oldPassword, password, password2} = formData;

        const handleInputChange = () => {};
  return (
      <>
         <section>
             <div className='container'>
                 <PageMenu />
                 <h2>ChangePassword</h2>
                 <div className='--flex-start
                   change-password'>
                    <Card cardClass={"card"}>
                       <div>
                        <form>
                             <p>
                                <label>Current Passsword:</label>
                                <PasswordInput 
                      placeholder='Old Passsword'
                      name='oldPassword'
                       value={oldPassword} 
                       onChange={handleInputChange}
                      />
                             </p>
                             <p>
                                <label>New Passsword:</label>
                                <PasswordInput 
                      placeholder='Passsword'
                      name='password'
                       value={password} 
                       onChange={handleInputChange}
                      />
                             </p>
                             <p>
                                <label>Confirm New Passsword:</label>
                                <PasswordInput 
                      placeholder='Confirm Passsword'
                      name='password2'
                       value={password2} 
                       onChange={handleInputChange}
                      />
                        </p>
                             <button className='--btn
                              --btn-danger --btn-block'>
                                Change Password
                             </button>
                        </form>
                       </div>
                    </Card>
                 </div>
             </div>
         </section>
      </>
  )
}

export default ChangePassword;

