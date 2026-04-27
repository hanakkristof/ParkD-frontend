import { useState } from 'react'
import { updateSpotTipus, updateSpotFoglalas } from '../myBackend'
import { useContext } from 'react'
import { MyUserContext } from '../context/MyUserProvider'

const TIPUSOK = ["normal", "ut", "kerekesszékes"]

const KÉPEK = {
  normal_free: "https://res.cloudinary.com/recipes2026/image/upload/v1776931981/normal_taken_yt87au.png",
  normal_taken: "https://res.cloudinary.com/recipes2026/image/upload/v1776931981/normal_free_zuq86c.png",
  ut: "https://res.cloudinary.com/recipes2026/image/upload/v1776931981/ut_pzfpyj.png",
  kerekesszékes_free: "https://res.cloudinary.com/recipes2026/image/upload/v1776931981/kerekesszekes_free_dyke0j.png",
  kerekesszékes_taken: "https://res.cloudinary.com/recipes2026/image/upload/v1776931981/kerekesszekes_taken_dqxly6.png",
}

const getKep = (spot) => {
  if (spot.parkolohelyTipus === "ut") return KÉPEK.ut
  if (spot.parkolohelyTipus === "kerekesszékes")
    return spot.foglalt ? KÉPEK.kerekesszékes_taken : KÉPEK.kerekesszékes_free
  return spot.foglalt ? KÉPEK.normal_taken : KÉPEK.normal_free
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
                        className="spotButton"
                        onClick={() => isAdmin ? handleAdminClick(spot) : handleUserClick(spot)}
                      >
                        <img src={getKep(spot)} alt={spot.id} />
                      </button>
                    ) : null}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

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
                { label: "2 óra", perc: 120 }
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

      {/* Info modal - foglalt hely */}
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