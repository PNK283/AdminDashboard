import React from 'react'
import './InfoBox.css'

const InfoBox = ({ bgcolor, title, count, icon}) => {
  return (
    <div className={`info-box ${bgcolor}`}>
        <span className='info-icon
        --color-white'>{icon}</span>
        <span className='info-text'>
        <p>{title}</p>
        <h4>{count}</h4>
        </span>
    </div>
  )
}

export default InfoBox
