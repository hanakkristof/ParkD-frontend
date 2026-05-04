import React from 'react'
import { useContext } from 'react'
import { MyUserContext } from '../context/MyUserProvider'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ThemeWheel } from '../components/themeWheel'
import { getSajatFoglalasok } from '../myBackend'
import { setAdminByEmail } from '../myBackend'
import { RxAvatar } from "react-icons/rx"

export const UserProfile = () => {
    const { user, userData, updateProfileData, deleteAccount } = useContext(MyUserContext)
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState(userData?.nev || "");
    const [newWheelchair, setNewWheelchair] = useState(userData?.wheelchair || false);
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

    const handleSave = async () => {
        await updateProfileData(newName, newWheelchair);
        setEditMode(false);
    };

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
        }
    }

    return (
        <div className="userProfileOldal">


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


            {oldal === 1 && (
    <div className="userProfilTartalom">
        <h2>Felhasználói Profil</h2>
        <div className='userProfileBelsoDiv'>
            {editMode ? (
                <>
                    <div >
                        <h2>Felhasználónév:</h2>
                        <input 
                            className='adminInput'
                            value={newName} 
                            onChange={(e) => setNewName(e.target.value)} 
                        />
                    </div>
                        <h2>Mozgássérült:</h2>
                        <input className='adminInput'
                            type="checkbox" 
                            checked={newWheelchair} 
                            onChange={(e) => setNewWheelchair(e.target.checked)} 
                        />
                    <div className="buttonGroup">
                        <button onClick={handleSave} className="userProfileNavGomb">Mentés</button>
                        <button onClick={() => setEditMode(false)} className="deleteAccountButton">Mégse</button>
                    </div>
                </>
            ) : (
                <>
                    <h4>Felhasználónév: {userData?.nev}</h4>
                    <h4>Email cím: {userData?.email}</h4>
                    <h4>Mozgássérült: {userData?.wheelchair === true ? "Igen" : "Nem"}</h4>
                    <button onClick={() => setEditMode(true)} className="userProfileNavGomb">Adatok módosítása</button>
                </>
            )}
        </div>

        <button onClick={handleDelete} className="deleteAccountButton">Fiók törlése</button>
    </div>
)}


            {oldal === 2 && (
                <div className="foglalasokTartalom">
                    <h2 className='foglalash2'>Foglalásaim</h2>
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
                    <button className="adminGomb"
                        onClick={() => { navigate("/addnew"); setOpenSidebar(false) }}
                    >
                        Új parkolóház
                    </button>
                    {adminMsg && <p className="adminUzenet">{adminMsg}</p>}
                </div>
            )}

            <ThemeWheel />
        </div>
    )
}