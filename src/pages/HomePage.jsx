import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import MyCarousel from '../components/Carousel/Carousel'
import { MyUserContext } from '../context/MyUserProvider'
import { readParkolohaz, readParkolohazak } from '../myBackend'
import { useEffect } from 'react'

export const HomePage = () => {
	const [hazak, setHazak] = useState([])
	const [loading, setLoading] = useState(false)
	const { user } = useContext(MyUserContext)
	const navigate = useNavigate()

	const [value, setValue] = useState(0)

	useEffect(()=>{
		readParkolohazak(setHazak)
	}, [])

	const navigateAndSetValue = (realId)=>{
		if(user){
			console.log("kiválasztott id:" + realId), navigate("/garage/"+realId)
		}
			 
			else(navigate ("/signin"))
	}

  return (
	<div className='homeContainer'>
		<div className='banner'>
			<h1 className='homeh1'>Get ParkD</h1>
			<MyCarousel hazak={hazak}  onImageClick={navigateAndSetValue}/>
			
		</div>
	</div>
  )
}

