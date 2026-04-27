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
import { RxAvatar } from "react-icons/rx"

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
        if (selected) setPreview(URL.createObjectURL(selected))
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
        setLoading(true)
        if (!file) return
        try {
            await avatarUpdate(file)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (window.confirm("Biztos ki szeretnéd törölni a fiókodat?")) {
            const pw = prompt("Add meg a jelszavad a fiók törléséhez")
            await deleteAccount(pw)
            await deleteAvatar(user.uid)
        }
    }

    return (
        <div className="userProfileOldal">

            {/* Navigációs gombok */}
            <div className="userProfileNav">
                <button
                    onClick={() => setOldal(1)}
                    className={`userProfileNavGomb ${oldal === 1 ? "aktiv" : ""}`}
                >
                    Profil
                </button>
                <button
                    onClick={() => setOldal(2)}
                    className={`userProfileNavGomb ${oldal === 2 ? "aktiv" : ""}`}
                >
                    Foglalásaim
                </button>
                {userData?.isAdmin && (
                    <button
                        onClick={() => setOldal(3)}
                        className={`userProfileNavGomb ${oldal === 3 ? "aktiv" : ""}`}
                    >
                        Admin
                    </button>
                )}
            </div>

            {/* 1. oldal - Profil */}
            {oldal === 1 && (
                <div className="userProfilTartalom">
                    <h2>Profil módosítása</h2>
                    <div>
                        <h4>Felhasználónév: {user?.displayName}</h4>
                        <p>Email cím: {user?.email}</p>
                        {user?.photoURL
                            ? <img className="userProfilKep" src={user.photoURL} alt="profilkép" />
                            : <RxAvatar size={80} />
                        }
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="file-upload" className="custom-file-upload">Új profilkép:</label>
                        <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
                        {preview && <img src={preview} alt="előnézet" className="userProfilElonezet" />}
                        <button className="MyCssButton" type="submit" disabled={loading}>
                            {loading ? "...Mentés" : "Profil frissítése"}
                        </button>
                    </form>
                    <button onClick={handleDelete} className="deleteAccountButton">Fiók törlése</button>
                </div>
            )}

            {/* 2. oldal - Foglalások */}
            {oldal === 2 && (
                <div className="foglalasokTartalom">
                    <h2>Foglalásaim</h2>
                    {foglalasok.length === 0 ? (
                        <p className="nincsFoglalas">Nincs aktív foglalásod.</p>
                    ) : (
                        <table className="foglalasokTabla">
                            <thead>
                                <tr>
                                    <th>Parkolóház</th>
                                    <th>Szint</th>
                                    <th>Hely</th>
                                    <th>Lejár</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foglalasok.map(f => (
                                    <tr key={f.id}>
                                        <td>{f.parkoloHazNev}</td>
                                        <td>{f.szintSzam}. szint</td>
                                        <td>{f.hely_szam}. hely</td>
                                        <td>{f.foglalasVege?.toDate().toLocaleString("hu-HU")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {/* 3. oldal - Admin */}
            {oldal === 3 && userData?.isAdmin && (
                <div className="adminTartalom">
                    <h2>Admin panel</h2>
                    <p>Add meg az email címet akit adminná szeretnél tenni:</p>
                    <input
                        type="email"
                        placeholder="Email cím"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        className="adminInput"
                    />
                    <button onClick={handleAdminKijeloles} className="adminGomb">
                        Adminná tétel
                    </button>
                    {adminMsg && <p className="adminUzenet">{adminMsg}</p>}
                </div>
            )}

            <ThemeWheel />
        </div>
    )
}