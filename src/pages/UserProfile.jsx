import React from 'react'
import { useContext } from 'react'
import { MyUserContext } from '../context/MyUserProvider'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { deleteAvatar } from '../myBackend'
import { ThemeWheel } from '../components/themeWheel'
import { getSajatFoglalasok } from '../myBackend'
import { setAdminByEmail } from '../myBackend'

export const UserProfile = () => {
    const { user, userData, avatarUpdate, deleteAccount } = useContext(MyUserContext)
    const [oldal, setOldal] = useState(1)
    const [adminEmail, setAdminEmail] = useState("")
    const [adminMsg, setAdminMsg] = useState("")
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [foglalasok, setFoglalasok] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate("/")
    }, [user, navigate])

    const handleFileChange = (e) => {
        const selected = e.target.files[0]
        setFile(selected)
        if (selected) {
            setPreview(URL.createObjectURL(selected))
        }
    }

    useEffect(() => {
        if (!user) return
        getSajatFoglalasok(user.email).then(setFoglalasok)
    }, [user])

    const handleAdminKijeloles = async () => {
        if (!adminEmail) return
        const sikeres = await setAdminByEmail(adminEmail)
        setAdminMsg(sikeres ? "Sikeresen adminná téve!" : "Nem található ilyen email cím!")
        setAdminEmail("")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("Loading igaz jasuasuoidasoudauoi")
        setLoading(true)
        if (!file) return
        try {
            await avatarUpdate(file)
        } catch (error) {
            console.log(error);

        } finally {
            console.log("False a loading ahahahahahahaha")
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (window.confirm("Biztos ki szeretnéd törölni a fiókodat?")) {
            const pw = prompt("Add meg a jelszavad a diók törléséhez")
            await deleteAccount(pw)
            await deleteAvatar(user.uid)
        }

    }

    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", minHeight: "100vh" }}>

            {/* Navigációs gombok */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <button onClick={() => setOldal(1)} style={{ padding: "10px 20px", background: oldal === 1 ? "#4CAF50" : "#eee", color: oldal === 1 ? "white" : "black", border: "none", borderRadius: 8, cursor: "pointer" }}>
                    Profil
                </button>
                <button onClick={() => setOldal(2)} style={{ padding: "10px 20px", background: oldal === 2 ? "#4CAF50" : "#eee", color: oldal === 2 ? "white" : "black", border: "none", borderRadius: 8, cursor: "pointer" }}>
                    Foglalásaim
                </button>
                {userData?.isAdmin && (
                    <button onClick={() => setOldal(3)} style={{ padding: "10px 20px", background: oldal === 3 ? "#4CAF50" : "#eee", color: oldal === 3 ? "white" : "black", border: "none", borderRadius: 8, cursor: "pointer" }}>
                        Admin
                    </button>
                )}
            </div>

            {/* 1. oldal - Profil */}
            {oldal === 1 && (
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <h2>Profil módosítása</h2>
                    <div>
                        <h4>Felhasználónév: {user?.displayName}</h4>
                        <p>Email cím: {user?.email}</p>
                        {user?.photoUrl && (
                            <img style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} src={user?.photoURL} alt="profilkép" />
                        )}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="file-upload" className='custom-file-upload'>Új profilkép:</label>
                        <input id="file-upload" type="file" accept='image/*' onChange={handleFileChange} />
                        <p style={{ textAlign: "center" }}>{preview && <img src={preview} alt='előnézet' style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} />}</p>
                        <label>Oldal frissítése:</label>
                        <button className='MyCssButton' type='submit' disabled={loading}>{loading ? "...Mentés" : "Profil frissítése"}</button>
                    </form>
                    <button onClick={handleDelete} className='deleteAccountButton'>Fiók törlése</button>
                </div>
            )}

            {/* 2. oldal - Foglalások */}
            {oldal === 2 && (
                <div style={{ width: "80%" }}>
                    <h2>Foglalásaim</h2>
                    {foglalasok.length === 0 ? (
                        <p>Nincs aktív foglalásod.</p>
                    ) : (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>Parkolóház</th>
                                    <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>Szint</th>
                                    <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>Hely</th>
                                    <th style={{ padding: 10, borderBottom: "1px solid #ccc" }}>Lejár</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foglalasok.map(f => (
                                    <tr key={f.id}>
                                        <td style={{ padding: 10, textAlign: "center" }}>{f.parkoloHazNev}</td>
                                        <td style={{ padding: 10, textAlign: "center" }}>{f.szintSzam}. szint</td>
                                        <td style={{ padding: 10, textAlign: "center" }}>{f.hely_szam}. hely</td>
                                        <td style={{ padding: 10, textAlign: "center" }}>{f.foglalasVege?.toDate().toLocaleString("hu-HU")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {/* 3. oldal - Admin */}
            {oldal === 3 && userData?.isAdmin && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 15 }}>
                    <h2>Admin panel</h2>
                    <p>Add meg az email címet akit adminná szeretnél tenni:</p>
                    <input
                        type="email"
                        placeholder="Email cím"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        style={{ padding: "10px", borderRadius: 8, border: "1px solid #ccc", width: 300 }}
                    />
                    <button
                        onClick={handleAdminKijeloles}
                        style={{ padding: "10px 25px", background: "#4CAF50", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}
                    >
                        Adminná tétel
                    </button>
                    {adminMsg && <p>{adminMsg}</p>}
                </div>
            )}

            <ThemeWheel />
        </div>
    )
}