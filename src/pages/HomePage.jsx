import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import MyCarousel from '../components/Carousel/Carousel'

export const HomePage = () => {

	const navigate = useNavigate()
	const [value, setValue] = useState(0)

	const navigateAndSetValue = (id)=>{
		setValue(id)
		console.log("kiválasztott id:" + id)
		navigate("/garage/"+id)
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

