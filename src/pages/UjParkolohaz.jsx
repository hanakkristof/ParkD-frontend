
import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { addParkoloHaz } from '../myBackend';
import { useEffect } from 'react';
import { useContext } from 'react';
import { MyUserContext } from '../context/MyUserProvider';
import { FaPlus } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { addDoc, collection, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseApp';
import { uploadImage } from '../cloudinaryUtils';


export const ParkolohazForm = () => {

    const { user } = useContext(MyUserContext)

    const [name, setName] = useState("")
    const [hely, setHely] = useState("")
    const [szintek, setSzintek] = useState([1])
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [parkoloHaz, setParkolohaz] = useState(null)
    const navigate = useNavigate()


    const [parkolohely, setParkolohely] = useState([])

    const { id } = useParams()

    useEffect(() => {
        if (id)
            readParkolohaz(id, setParkolohaz)
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
                console.log("uploadResult:", uploadResult)  // check this
                imgUrl = uploadResult.url
            }



            const parkolohazRef = await addDoc(collection(db, "parkolohazak"), {
                name: name,
                hely: hely,
                imgUrl: imgUrl,
                createdAt: new Date()
            })

            for (const szintSzam of szintek) {
                const szintRef = await addDoc(collection(db, "parkolohazak", parkolohazRef.id, "szintek"), {
                    szint_szama: szintSzam,
                })
                await addDoc(collection(db, "parkolohazak", parkolohazRef.id, "szintek", szintRef.id, "parkoloHelyek"), {
                    foglalt: false,
                    parkolohelyTipus: "ut"
                })
            }

        } catch (error) {
            console.error("Hiba a mentés során: ", error)
        }
        setLoading(false)

        /*let inputData = {name, hely, szintek}
        console.log(inputData)
        if(id){
          await updateRecipe(id, !file ? {...inputData,imgUrl:recipe.imgUrl,deleteUrl:recipe.deleteUrl}: inputData,file)
          
        }else{
            await addParkoloHaz(inputData)
        }
    
          
          setName("")
          setHely("")
          setSzintek([""])
          setFile(null)
          setLoading(false)
          navigate('/garage/:id')*/

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
        if (selected) {
            setPreview(URL.createObjectURL(selected))
        }
    }

    return (


        <div className='addParkolohaz'>
            <h1 style={{ textAlign: "center", marginBottom: "10px" }}>Új parkolóház feltöltése</h1>
            <form className='newrecipeForm' onSubmit={handleSubmit}>

                <input type="text" style={{ border: '2px solid black', margin: '5px', width: "200px", height: "25px" }} placeholder='Parkolóház Neve' value={name} onChange={(e) => setName(e.target.value)} required />
                <div >

                    {szintek.map((item, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center", position: "relative", marginBottom: "5px" }}>

                            <input
                                style={{ border: '2px solid black', margin: "0.5px", width: "200px", height: "25px", backgroundColor: "#f0f0f0" }}
                                type="text"
                                value={`${item}. szint`}
                                readOnly
                            />


                            {szintek.length > 1 && (
                                <span
                                    style={{ cursor: "pointer", marginLeft: "10px", color: "red", fontWeight: "bold" }}
                                    onClick={() => {
                                        const newSzintek = szintek.filter((_, i) => i !== index)
                                            .map((_, i) => i + 1);
                                        setSzintek(newSzintek);
                                    }}
                                >
                                    ✕
                                </span>
                            )}
                        </div>
                    ))}

                    <div style={{ marginTop: "4.5px", margin: "0.5px", width: "200px", height: "25px", display: "flex", justifyContent: "center", fontSize: "25px" }}>
                        <FaPlus
                            style={{ backgroundColor: "white", borderRadius: "50%", border: "2px solid black", cursor: "pointer" }}
                            onClick={() => setSzintek([...szintek, szintek.length + 1])}
                        />
                    </div>


                </div>
                <input style={{ border: '2px solid black', margin: "0.5px", width: "200px", height: "25px" }} type="text" value={hely} onChange={(e) => setHely(e.target.value)} placeholder='Helyszín: ' required />

                <label htmlFor="file-upload" className='custom-file-upload'>Kép feltöltése</label>
                <input id="file-upload" style={{ marginTop: "6px", marginBottom: "5px", width: "250px", height: "25px" }} type="file" accept='image/*' onChange={handleFileChange} />

                {preview && <img src={preview} alt='előnézet' style={{ maxWidth: "200px", maxHeight: "200", objectFit: "cover", marginBottom: "5PX", border: "2px solid black" }} />}


                <button style={{ border: '2px solid black', margin: "0.5px", width: "200px", height: "25px", backgroundColor: "white", cursor: "pointer" }} type='submit' disabled={loading}>Mentés</button>
            </form>
            {loading && <div>Loading...</div>}
            <IoMdClose onClick={() => navigate("/")} style={{ position: "absolute", top: "5px", left: "5px" }} />
        </div>

    )
}
