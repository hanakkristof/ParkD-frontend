import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { MyUserContext } from '../context/MyUserProvider'
import { SpotCard } from './spotCard'

export const SignIn = () => {

    const navigate = useNavigate()
    const { signInUser, msg } = useContext(MyUserContext)

    useEffect(() => {
        msg && msg?.signIn && navigate("/signin")
        if(msg.signIn) navigate("/")
    }, [msg])

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        // console.log(data.get("email"), data.get("password"))
        signInUser(data.get("email"), data.get("password"))
        // navigate("/recipes")

    }

    return (
        <div className='signinPage'>
            <div className='signinBase'>
            <form className='signinForm' onSubmit={handleSubmit}>
                <h1>Bejelentkezés</h1>
                <input name='email' type="email" placeholder='Email' required />
                <input name='password' type="password" placeholder='Jelszó' required />
                
                <button className='logInBtn'>Bejelentkezés</button>
            </form>
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center", gap:"5px"}}><a href="#" onClick={()=>navigate("/pwreset")}>Elfelejtett jelszó</a>

            <p>Nincs fiókod? Csinálj egyet <a onClick={() => navigate("/signup")} style={{ cursor: "pointer"}}>itt</a>!</p></div>
            
            </div>
            <SpotCard/>
        </div> 
    )
}