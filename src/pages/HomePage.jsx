import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import MyCarousel from '../components/Carousel/Carousel'
import { MyUserContext } from '../context/MyUserProvider'

export const HomePage = () => {
	const { signInUser, msg } = useContext(MyUserContext)
	const navigate = useNavigate()
	const [value, setValue] = useState(0)

	const navigateAndSetValue = (id)=>{
		if(msg && msg?.signIn) setValue(id), console.log("kiválasztott id:" + id), navigate("/garage/"+id)
			else(navigate ("/signin"))

		
		
		
	}

  return (
	<div className='homeContainer'>
		<div className='banner'>
			<h1 className='homeh1'>Get ParkD</h1>
			<MyCarousel onImageClick={navigateAndSetValue}/>
			
		</div>
	</div>
  )
}

