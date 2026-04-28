import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getParkingSpotsRealtime, getSzintek, lejartFoglalasokFelszabaditasa, readParkolohaz } from '../myBackend.js'
import { ParkingFloor } from '../components/SpotCard'
import { MyUserContext } from '../context/MyUserProvider'
import { useContext } from 'react'

export const Garage = () => {
  const { userData } = useContext(MyUserContext)
  const [parkoloHaz, setParkolohaz] = useState(null)
  const [szintek, setSzintek] = useState([])
  const [aktivSzint, setAktivSzint] = useState(null)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const [parkingSpots, setParkingSpots] = useState(null)

  const szabadHelyek = parkingSpots?.filter(s => s.foglalt === false && s.parkolohelyTipus !== "ut").length ?? 0
  const foglaltHelyek = parkingSpots?.filter(s => s.foglalt === true).length ?? 0
  const osszes = parkingSpots?.filter(s => s.parkolohelyTipus !== "ut").length ?? 0

  useEffect(() => {
    if (id) {
      setLoading(true)
      readParkolohaz(id, (data) => {
        setParkolohaz(data)
      })

      const unsubscribe = getSzintek(id, (szintekData) => {
        setSzintek(szintekData)
        if (szintekData.length > 0) setAktivSzint(szintekData[0])
        setLoading(false)
      })

      return () => unsubscribe()
    }
  }, [id])

  useEffect(() => {
    if (!aktivSzint) return

    const unsubscribe = getParkingSpotsRealtime(aktivSzint.id, async (spots) => {
      await lejartFoglalasokFelszabaditasa(spots, id, aktivSzint.id)
      setParkingSpots(spots)
    })

    return () => unsubscribe()
  }, [aktivSzint])

  if (loading) return <div className="floorPlan"><p>Betöltés...</p></div>
  if (!parkoloHaz) return <div className="floorPlan"><p>Nincs ilyen parkolóház!</p></div>

  return (
    <div className="floorPlan">
      <h2 className="garagePlace">{parkoloHaz.hely}</h2>
      <h2 className="garageName">{parkoloHaz.name}</h2>

      <div className="garageKözepe">
        {/* Szint fülek */}
        <div className="szintTabok">
          {szintek.map((szint) => (
            <button
              key={szint.id}
              className={`szintTab ${aktivSzint?.id === szint.id ? "aktiv" : ""}`}
              onClick={() => setAktivSzint(szint)}
            >
              🅿️ {szint.szint_szama}. szint
            </button>
          ))}
        </div>

        {/* Kiválasztott szint tartalma */}
        <div className="aktivSzintTab">
          {aktivSzint ? (
            <>
              <h3>{aktivSzint.szint_szama}. szint</h3>
              <div className="szintStatisztika">
                <span className="szintStat szabad">🟢 {szabadHelyek} szabad</span>
                <span className="szintStat foglalt">🔴 {foglaltHelyek} foglalt</span>
                <span className="szintStat osszes">összesen {osszes}</span>
              </div>
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

      {userData?.isAdmin && (
        <button className="ujParkolohazGomb" onClick={() => navigate("/addnew")}>
          Új parkolóház feltöltése
        </button>
      )}
    </div>
  )
}