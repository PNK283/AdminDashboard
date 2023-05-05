import React, {useState} from 'react'
import { FaCheck } from 'react-icons/fa'

const ChangeRole = () => {
      const [userRole, setUserRole] = useState('')
  return (
    <div className='sort'>
         <form className='--flex-start'>
              <select value={userRole} 
              onChange={(e) => 
              setUserRole(e.target.value)}>
                  <option value="">-- select --
                  </option>
                  <option value="SuperAdmin">Super Admin
                  </option>
                  <option value="Admin">Admin
                  </option>
                  <option value="User">User
                  </option>
              </select>
              <button className='--btn --btn-primary'>
                 <FaCheck size={15} />
              </button>
         </form>
    </div>
  )
}

export default ChangeRole
