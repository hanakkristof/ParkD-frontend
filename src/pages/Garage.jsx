import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getSzintekSzama, readParkolohaz } from '../myBackend'

export const Garage = () => {
	const [parkoloHaz, setParkolohaz] = useState(null)
  const [szintekSzama, setSzintekSzama] = useState(0)
	const [loading, setLoading] = useState(false)
	const {id} = useParams()

	const navigate = useNavigate()

  useEffect(()=>{
    if(id){
      setLoading(true)
      readParkolohaz(id,(data)=>{
        setParkolohaz(data);

        getSzintekSzama(id,(count)=>{
          setSzintekSzama(count)
          setLoading(false)
        })
      })
    }
  }, [id])


  if(loading) return <div className="floorPlan"><p>Betöltés...</p></div>
  if(!parkoloHaz) return <div className="floorPlan"><p>Nincs ilyen parkolóház!</p></div>

  return (
	<div className='floorPlan'>
    <h2>{parkoloHaz.hely}</h2>
    <h2>{parkoloHaz.name}</h2>
    <p><strong>Szintek száma:{szintekSzama}</strong></p>
    <div className='recipesBase'>
      Floor {id}
    </div>
    <button onClick={()=>navigate("/addnew")}>Új parkolóház feltöltése</button>
	</div>
  )
}

