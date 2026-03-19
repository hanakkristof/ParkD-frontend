import React, { useState } from 'react'

export const SpotCard = () => {
    const [expanded, setExpanded] = useState(false)
  return (
    <div className='card'>
      <div className="cardBody">
        <img src="/parkolohaz.jpg" alt="" className='cardImage'/>
        Currently there is nothing here but this button
        <button onClick={()=>setExpanded(!expanded)}>Hello i am button</button>
      </div>
      {expanded == true ? <div className="additionalInfo">This is a placeholder</div> : <></>}
    </div>
  )
}

