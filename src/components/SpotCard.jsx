import { useState } from 'react'
import { updateSpotTipus, updateSpotFoglalas } from '../myBackend'
import { useContext } from 'react'
import { MyUserContext } from '../context/MyUserProvider'

const TIPUSOK = ["normal", "ut", "kerekesszékes"]


const CarIcon = ({ spot }) => {
  const taken = spot?.foglalt

  const palettes = {
    normal: {
      free: { body: '#2d6b30', roof: '#389440', window: '#1a3d1c', wheel: '#0d1a0e', light: '#44cc44' },
      taken: { body: '#6b2e28', roof: '#8a3a32', window: '#3a1a18', wheel: '#1a0e0d', light: '#cc4444' },
    },
    ut: {
      free: { body: '#1a1a1a', roof: '#2a2a2a', window: '#111', wheel: '#080808', light: '#888' },
      taken: { body: '#1a1a1a', roof: '#2a2a2a', window: '#111', wheel: '#080808', light: '#555' },
    },
    kerekesszékes: {
      free: { body: '#1a3a6b', roof: '#234d8a', window: '#0d1f3a', wheel: '#0a1020', light: '#4499ff' },
      taken: { body: '#5a2e6b', roof: '#703a8a', window: '#2a1038', wheel: '#180a20', light: '#aa44ff' },
    },
  }

  const type = spot?.parkolohelyTipus ?? 'normal'
  const c = palettes[type]?.[taken ? 'taken' : 'free'] ?? palettes.normal.free

  return (
    <svg width="34" height="22" viewBox="0 0 28 18" xmlns="http://www.w3.org/2000/svg">
      
      <rect x="1" y="9" width="26" height="8" rx="2" fill={c.body} />
      
      <rect x="5" y="4" width="18" height="7" rx="2" fill={c.body} />
     
      <rect x="7" y="5" width="6" height="5" rx="1" fill={c.window} />
      <rect x="15" y="5" width="6" height="5" rx="1" fill={c.window} />
      
      <rect x="6" y="3" width="16" height="4" rx="1.5" fill={c.roof} />
     
      <circle cx="7" cy="17" r="2.5" fill={c.wheel} />
      <circle cx="7" cy="17" r="1" fill="#222" />
      <circle cx="21" cy="17" r="2.5" fill={c.wheel} />
      <circle cx="21" cy="17" r="1" fill="#222" />
      
      <rect x="1" y="10" width="3" height="2" rx="0.5" fill={c.light} opacity="0.9" />
      <rect x="24" y="10" width="3" height="2" rx="0.5" fill={c.light} opacity="0.6" />
      
      {type === 'kerekesszékes' && (
        <text x="14" y="9" textAnchor="middle" fontSize="5" fill="#aad4ff" fontWeight="bold">♿</text>
      )}
    </svg>
  )
}


export const ParkingFloor = ({ rows, columns, spots, isAdmin, parkoloHazId, szintId }) => {
  const { user, userData } = useContext(MyUserContext)
  const [bookingModal, setBookingModal] = useState(null)
  const [infoModal, setInfoModal] = useState(null)
  const [orak, setOrak] = useState(null)

  if (!spots) return null

  const handleAdminClick = async (spot) => {
    const currentIndex = TIPUSOK.indexOf(spot.parkolohelyTipus)
    const nextTipus = TIPUSOK[(currentIndex + 1) % TIPUSOK.length]
    await updateSpotTipus(parkoloHazId, szintId, spot.id, nextTipus)
  }

  const handleUserClick = (spot) => {
    if (spot.parkolohelyTipus === "ut") return
    if (spot.foglalt) {
      setInfoModal(spot)
      return
    }
    if (spot.parkolohelyTipus === "kerekesszékes" && !userData?.wheelchair) {
      alert("Ez a hely csak kerekesszékeseknek van fenntartva!")
      return
    }
    setBookingModal(spot)
  }

  const handleFoglalas = async () => {
    const vege = new Date()
    vege.setMinutes(vege.getMinutes() + orak)
    await updateSpotFoglalas(parkoloHazId, szintId, bookingModal.id, user.email, vege)
    setBookingModal(null)
    setOrak(null)
  }

  return (
    <>
      <div className='parkingTableWrapper'>
        <table className="parkingTable">
          <tbody>
            {Array.from({ length: rows }, (_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: columns }, (_, colIndex) => {
                  const spot = spots[rowIndex * columns + colIndex]
                  return (
                    <td key={colIndex}>
                      {spot ? (
                        <button
                          className={`spotButton spotButton--${spot.parkolohelyTipus} ${spot.foglalt ? 'spotButton--taken' : 'spotButton--free'}`}
                          onClick={() => isAdmin ? handleAdminClick(spot) : handleUserClick(spot)}
                        >
                          <CarIcon spot={spot} />
                          <span className="spotLabel">{spot.id?.slice(-3)}</span>
                        </button>
                      ) : null}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Foglalási modal */}
      {bookingModal && (
        <div className="modalOverlay">
          <div className="modalBox">
            <h3>Parkolóhely foglalás</h3>
            <p>Válaszd ki a foglalás időtartamát:</p>
            <div className="modalIdopontok">
              {[
                { label: "30 perc", perc: 30 },
                { label: "1 óra", perc: 60 },
                { label: "2 óra", perc: 120 },
              ].map(({ label, perc }) => (
                <button
                  key={perc}
                  onClick={() => setOrak(perc)}
                  className={`modalIdopontGomb ${orak === perc ? "aktiv" : ""}`}
                >
                  {label}
                </button>
              ))}
            </div>
            {orak && (
              <p className="modalFoglalasVege">
                Foglalás vége: {(() => {
                  const d = new Date()
                  d.setMinutes(d.getMinutes() + orak)
                  return d.toLocaleString("hu-HU")
                })()}
              </p>
            )}
            <div className="modalGombok">
              <button
                onClick={handleFoglalas}
                disabled={!orak}
                className="modalFoglalasGomb"
              >
                Foglalás
              </button>
              <button
                onClick={() => { setBookingModal(null); setOrak(null) }}
                className="modalMegseGomb"
              >
                Mégse
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info modal – foglalt hely */}
      {infoModal && (
        <div className="modalOverlay">
          <div className="modalBox">
            <h3>Ez a hely foglalt</h3>
            <p>Lefoglalva eddig: {infoModal.foglalasVege?.toDate().toLocaleString("hu-HU")}</p>
            <div className="modalGombok">
              <button onClick={() => setInfoModal(null)} className="modalBezarasGomb">
                Bezárás
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}