import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { useContext } from 'react';
import { MyUserContext } from '../context/MyUserProvider';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import { addDoc, collection, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseApp';
import { uploadImage } from '../cloudinaryUtils';

export const ParkolohazForm = () => {
    const { user } = useContext(MyUserContext)

    const [name, setName] = useState("")
    const [hely, setHely] = useState("")
    const [szintek, setSzintek] = useState([{ szint_szama: 1, sor: "", oszlop: "" }])
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [parkoloHaz, setParkolohaz] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (id) readParkolohaz(id, setParkolohaz)
    }, [id])

    useEffect(() => {
        if (parkoloHaz) {
            setName(parkoloHaz.name)
            setHely(parkoloHaz.hely)
            setSzintek(parkoloHaz.szintek)
            setPreview(parkoloHaz.imgUrl)
        }
    }, [parkoloHaz])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let imgUrl = "";
            if (file) {
                const uploadResult = await uploadImage(file)
                imgUrl = uploadResult.url
            }

            const parkolohazRef = await addDoc(collection(db, "parkolohazak"), {
                name: name,
                hely: hely,
                imgUrl: imgUrl,
                createdAt: new Date()
            })

            for (const szint of szintek) {
                const szintRef = await addDoc(collection(db, "parkolohazak", parkolohazRef.id, "szintek"), {
                    szint_szama: szint.szint_szama,
                    szint_sor: szint.sor,
                    szint_oszlop: szint.sor
                })

                for (let i = 0; i < szint.sor * szint.oszlop; i++) {
                    await addDoc(collection(db, "parkolohazak", parkolohazRef.id, "szintek", szintRef.id, "parkoloHelyek"), {
                        foglalt: false,
                        parkolohelyTipus: "ut",
                        hely_szam: i + 1
                    })
                }
            }
        } catch (error) {
            console.error("Hiba a mentés során: ", error)
        }
        setLoading(false)
    }

    const updateSzint = (index, mezo, ertek) => {
        const ujSzintek = [...szintek]
        ujSzintek[index][mezo] = ertek
        setSzintek(ujSzintek)
    }

    const readParkolohaz = async (id, setCallback) => {
        const docRef = doc(db, "parkolohazak", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setCallback(docSnap.data());
        } else {
            console.log("Nincs ilyen parkolóház!");
        }
    };

    const handleFileChange = (e) => {
        const selected = e.target.files[0]
        setFile(selected)
        if (selected) setPreview(URL.createObjectURL(selected))
    }

    return (
        <div className="addParkolohaz">
            <h1>Új parkolóház feltöltése</h1>
            <form className="newParkoloForm" onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Parkolóház Neve"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <div>
                    {szintek.map((item, index) => (
                        <div key={index} className="szintSor">
                            <div className="szintBelso">
                                <div>
                                    <input
                                        className="szintNevInput"
                                        type="text"
                                        value={`${item.szint_szama}. szint`}
                                        readOnly
                                    />
                                    {szintek.length > 1 && (
                                        <button
                                            type="button"
                                            className="szintTorolGomb"
                                            onClick={() => {
                                                const newSzintek = szintek
                                                    .filter((_, i) => i !== index)
                                                    .map((s, i) => ({ ...s, szint_szama: i + 1 }))
                                                setSzintek(newSzintek)
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                    )}
                                </div>

                                <div className="szintMeretek">
                                    <input
                                        required
                                        value={item.sor}
                                        onChange={(e) => updateSzint(index, "sor", e.target.value)}
                                        type="number"
                                        placeholder="sor"
                                    />
                                    <input
                                        required
                                        value={item.oszlop}
                                        onChange={(e) => updateSzint(index, "oszlop", e.target.value)}
                                        type="number"
                                        placeholder="oszlop"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="szintHozzaadGomb"
                                    onClick={() => setSzintek([...szintek, { szint_szama: szintek.length + 1, sor: "", oszlop: "" }])}
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <input
                    type="text"
                    value={hely}
                    onChange={(e) => setHely(e.target.value)}
                    placeholder="Helyszín:"
                    required
                />

                <label htmlFor="file-upload" className="custom-file-upload">Kép feltöltése</label>
                <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />

                {preview && <img src={preview} alt="előnézet" className="parkoloElonezet" />}

                <button className="mentesGomb" type="submit" disabled={loading}>Mentés</button>
            </form>
            {loading && <p className="betoltesText">Feltöltés folyamatban...</p>}
        </div>
    )
}