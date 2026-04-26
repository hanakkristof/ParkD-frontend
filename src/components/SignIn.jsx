import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { MyUserContext } from '../context/MyUserProvider'

export const SignIn = () => {

    const navigate = useNavigate()
    const { signInUser, msg } = useContext(MyUserContext)

    useEffect(() => {
        if (msg?.signIn === true) navigate("/")
    }, [msg])

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        signInUser(data.get("email"), data.get("password"))

    }

    return (
        <div className='signinPage'>
            <div className='signinBase'>
                <form className='signinForm' onSubmit={handleSubmit}>
                    <h1>Bejelentkezés</h1>
                    <input name='email' type="email" placeholder='Email' required style={{background: "#f0f0f0", color:"black"}} />
                    <input name='password' type="password" placeholder='Jelszó' required style={{background: "#f0f0f0", color:"black"}}/>

                    <button className='logInBtn'>Bejelentkezés</button>
                </form>
                <div className='error'>
                    {msg && msg?.err && <p className='errormsg'>{msg.err}</p>}

                </div>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", gap: "5px", color:"#f0f0f0" }}>
                    <a href="#" onClick={() => navigate("/pwreset")} style={{color:"#f0f0f0"}}>Elfelejtett jelszó</a>

                    <p>Nincs fiókod? Csinálj egyet <a onClick={() => navigate("/signup")} style={{ cursor: "pointer", color: "#f0f0f0" }}>itt</a>!</p></div>

            </div>
        </div>
    )
}