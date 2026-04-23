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
      <table>
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }, (_, colIndex) => {
                const spot = spots[rowIndex * columns + colIndex]
                return (
                  <td key={colIndex}>
                    {spot ? (
                      <button
                        onClick={() => isAdmin ? handleAdminClick(spot) : handleUserClick(spot)}
                        style={{ padding: 0, border: "none", background: "none", width: 50, height: 50 }}
                      >
                        <img
                        onClick={() => isAdmin ? handleAdminClick(spot) : handleUserClick(spot)}
                          src={getKep(spot)}
                          alt={spot.id}
                          width={50}
                          height={50}
                          style={{ display: "block" }}
                        />
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
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{ background: "white", padding: 30, borderRadius: 10, minWidth: 300, textAlign: "center" }}>
            <h3>Parkolóhely foglalás</h3>
            <p>Válaszd ki a foglalás időtartamát:</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", margin: "20px 0" }}>
              {[
                { label: "30 perc", perc: 30 },
                { label: "1 óra", perc: 60 },
                { label: "2 óra", perc: 120 }
              ].map(({ label, perc }) => (
                <button
                  key={perc}
                  onClick={() => setOrak(perc)}
                  style={{
                    padding: "15px 20px",
                    background: orak === perc ? "#4CAF50" : "#eee",
                    color: orak === perc ? "white" : "black",
                    border: "none", borderRadius: 8, cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            {orak && (
              <p style={{ color: "#666" }}>
                Foglalás vége: {(() => {
                  const d = new Date()
                  d.setMinutes(d.getMinutes() + orak)
                  return d.toLocaleString("hu-HU")
                })()}
              </p>
            )}
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
              <button
                onClick={handleFoglalas}
                disabled={!orak}
                style={{
                  padding: "10px 25px", background: orak ? "#4CAF50" : "#ccc",
                  color: "white", border: "none", borderRadius: 5, cursor: orak ? "pointer" : "default"
                }}
              >
                Foglalás
              </button>
              <button
                onClick={() => { setBookingModal(null); setOrak(null) }}
                style={{ padding: "10px 25px", background: "#f44336", color: "white", border: "none", borderRadius: 5, cursor: "pointer" }}
              >
                Mégse
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info modal - foglalt hely */}
      {infoModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "white", padding: 30, borderRadius: 10 }}>
            <h3>Ez a hely foglalt</h3>
            <p>Lefoglalva eddig: {infoModal.foglalasVege?.toDate().toLocaleString("hu-HU")}</p>
            <button onClick={() => setInfoModal(null)} style={{ padding: "10px 20px", background: "#2196F3", color: "white", border: "none", borderRadius: 5, cursor: "pointer" }}>
              Bezárás
            </button>
          </div>
        </div>
      )}
    </>
  )
}