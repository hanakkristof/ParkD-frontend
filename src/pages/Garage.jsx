import React from 'react'
import { useParams } from 'react-router'

export const Garage = () => {
	const {id} = useParams()
  return (
	<div className='floorPlan'>
	  Floor {id}
	</div>
  )
}

