import React from 'react'
import { useNavigate } from 'react-router'

export const HomePage = () => {

	const navigate = useNavigate()
  return (
	<div className='homeContainer'>
		<div className='banner'>
			<h1>Welcome to our website.</h1>
			<button onClick={()=>navigate("/garage")} className='enterButton'>This is a placeholder</button>
		</div>
	</div>
  )
}

