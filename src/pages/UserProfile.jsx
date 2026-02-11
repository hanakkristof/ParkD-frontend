import React from 'react'
import { useContext } from 'react'
import { MyUserContext } from '../context/MyUserProvider'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { deleteAvatar } from '../myBackend'

export const UserProfile = () => {
    const { user, avatarUpdate, deleteAccount } = useContext(MyUserContext)
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
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
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100vh" }}>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100vh" }}>
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
                    <p style={{textAlign:"center"}}>{preview && <img src={preview} alt='előnézet' style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} />}</p>
                        
                   
                    <label>Oldal frissítése:</label>
                    <button className='MyCssButton' type='submit' disabled={loading}>{loading ? "...Mentés" : "Profil frissítése"}</button>
                </form>
                
            </div>


            <button onClick={handleDelete} className='deleteAccountButton'>Fiók törlése</button>
        </div>
    )
}