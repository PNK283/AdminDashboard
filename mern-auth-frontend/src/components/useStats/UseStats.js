import React from 'react'
import './UseStats.css'
import InfoBox from '../infoBox/InfoBox'
import { FaUsers } from 'react-icons/fa'
import {BiUserCheck, BiUserMinus, BiUserX } from 'react-icons/bi'

  //Icons
   const icon1 = <FaUsers size={40} color='#fff' />;
   const icon2 = <BiUserCheck size={40} color='#fff' />;
   const icon3 = <BiUserMinus size={40} color='#fff' />;
   const icon4 = <BiUserX size={40} color='#fff' />;


const UseStats = () => {
  return (
    <div className='user-summary'>
        <h3>User Status</h3>
           <div className='info-summary'>
               <InfoBox
               icon={icon1}
               title={'Total Users'}
               count={'3'}
               bgcolor='card1' />
               <InfoBox
               icon={icon2}
               title={'Verified Users'}
               count={'3'}
               bgcolor='card2' />
               <InfoBox
               icon={icon3}
               title={'Unverified Users'}
               count={'3'}
               bgcolor='card3' />
               <InfoBox
               icon={icon4}
               title={'Suspended Users'}
               count={'3'}
               bgcolor='card4' />
           </div>
    </div>
  )
}

export default UseStats
