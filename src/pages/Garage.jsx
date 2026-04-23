import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getParkingSpots, getParkingSpotsRealtime, getSzintek, readParkolohaz } from '../myBackend'
import { ParkingFloor } from '../components/SpotCard'
import { MyUserContext } from '../context/MyUserProvider'
import { useContext } from 'react'

export const Garage = () => {
  const { userData } = useContext(MyUserContext)
  const [parkoloHaz, setParkolohaz] = useState(null)
  const [szintek, setSzintek] = useState([])
  const [aktivSzint, setAktivSzint] = useState(null) // ← kiválasztott szint
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const [parkingSpots, setParkingSpots] = useState(null)



  useEffect(() => {
    if (id) {
      setLoading(true)
      readParkolohaz(id, (data) => {
        setParkolohaz(data);

      })

      const unsubscribe = getSzintek(id, (szintekData) => {
        setSzintek(szintekData)
        // Alapból az első szint legyen kiválasztva
        if (szintekData.length > 0) setAktivSzint(szintekData[0])
        console.log(szintekData)
        setLoading(false)
      })

      return () => unsubscribe()
    }
  }, [id])


  useEffect(() => {
    if (!aktivSzint) return

    const unsubscribe = getParkingSpotsRealtime(aktivSzint.id, (spots) => {
        setParkingSpots(spots)
    })

    return () => unsubscribe()
}, [aktivSzint])

  useEffect(() => {
    console.log(parkingSpots);
  }, [parkingSpots]);

  if (loading) return <div className="floorPlan"><p>Betöltés...</p></div>
  if (!parkoloHaz) return <div className="floorPlan"><p>Nincs ilyen parkolóház!</p></div>

  return (
    <div className='floorPlan'>
      <div>
        <h2 className='garagePlace'>{parkoloHaz.hely}</h2>
      </div>
      <div>
        <h2 className='garageName'>{parkoloHaz.name}</h2>
      </div>

      <div className='garageKözepe'>
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
        <div className='aktivSzintTab'>
          {aktivSzint ? (
            <>
              <h3>{aktivSzint.szint_szama}. szint</h3>
              <p>Szint ID: {aktivSzint.id}</p>

              <ParkingFloor
                rows={aktivSzint?.szint_sor}
                columns={aktivSzint?.szint_oszlop}
                spots={parkingSpots ?? []}
                isAdmin={userData?.isAdmin}
                parkoloHazId={id}
                szintId={aktivSzint?.id}
              />
            </>
          ) : (
            <p>Válassz egy szintet!</p>
          )}
        </div>
      </div>


      <button onClick={() => navigate("/addnew")}>Új parkolóház feltöltése</button>
    </div>
  )
}