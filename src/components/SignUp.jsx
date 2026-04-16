import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { MyUserContext } from '../context/MyUserProvider'

export const SignUp = () => {

    const navigate = useNavigate()
    const { signUpUser, msg } = useContext(MyUserContext)

    useEffect(() => {
        if (msg?.signUp) navigate("/")
    }, [msg])

    const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    signUpUser(data.get("email"), data.get("password"), data.get("nev"))
}

    return (
        
        <div className='signinPage'>
            <div className='signinBase'>
                <form className='signinForm' onSubmit={handleSubmit}>
                    <h1>Regisztráció</h1>
                    <input name="nev" type="text" placeholder="Felhasználónév" required />
                    <input name='email' type="email" placeholder='Email' required />
                    <input name='password' type="password" placeholder='Jelszó' required />
                    <input name='confirmPassword' type="password" placeholder='Jelszó megerősítése' required />
                    <button className='logInBtn'>Regisztráció</button>
                </form>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                    <p>Már van fiókod? Jelentkezz be <a onClick={() => navigate("/signin")} style={{ cursor: "pointer" }}>itt</a>!</p>
                </div>
            </div>
        </div>
    )
}
