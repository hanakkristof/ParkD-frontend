import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getSzintek, readParkolohaz } from '../myBackend'

export const Garage = () => {
  const [parkoloHaz, setParkolohaz] = useState(null)
  const [szintek, setSzintek] = useState([])
  const [aktivSzint, setAktivSzint] = useState(null) // ← kiválasztott szint
  const [loading, setLoading] = useState(false)
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    if(id){
      setLoading(true)
      readParkolohaz(id,(data)=>{
        setParkolohaz(data);
      })

      const unsubscribe = getSzintek(id, (szintekData) => {
        setSzintek(szintekData)
        // Alapból az első szint legyen kiválasztva
        if(szintekData.length > 0) setAktivSzint(szintekData[0])
        setLoading(false)
      })

      return () => unsubscribe()
    }
  }, [id])

  if(loading) return <div className="floorPlan"><p>Betöltés...</p></div>
  if(!parkoloHaz) return <div className="floorPlan"><p>Nincs ilyen parkolóház!</p></div>

  return (
    <div className='floorPlan'>
      <h2>{parkoloHaz.hely}</h2>
      <h2>{parkoloHaz.name}</h2>

      {/* Szint fülek */}
      <div className='szintTabok'>
        {szintek.map((szint) => (
          <button
            key={szint.id}
            className={`szintTab ${aktivSzint?.id === szint.id ? 'aktiv' : ''}`}
            onClick={() => setAktivSzint(szint)}
          >
            🅿️ {szint.szint_szama}. szint
          </button>
        ))}
      </div>

      {/* Kiválasztott szint tartalma */}
      <div className='recipesBase'>
        {aktivSzint ? (
          <>
            <h3>{aktivSzint.szint_szama}. szint</h3>
            <p>Szint ID: {aktivSzint.id}</p>
            {/* Ha vannak más mezők a szint dokumentumban, azokat is itt jelenítheted meg */}
            {/* pl. <p>Férőhelyek: {aktivSzint.ferohelyek}</p> */}
          </>
        ) : (
          <p>Válassz egy szintet!</p>
        )}
      </div>

      <button onClick={()=>navigate("/addnew")}>Új parkolóház feltöltése</button>
    </div>
  )
}