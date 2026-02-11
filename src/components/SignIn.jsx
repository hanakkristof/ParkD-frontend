import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { MyUserContext } from '../context/MyUserProvider'

export const SignIn = () => {

    const navigate = useNavigate()
    const { signInUser, msg } = useContext(MyUserContext)

    useEffect(() => {
        msg && msg?.signIn && navigate("/signin")
        if(msg.signIn) navigate("/recipes")
    }, [msg])

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        // console.log(data.get("email"), data.get("password"))
        signInUser(data.get("email"), data.get("password"))
        // navigate("/recipes")

    }

    return (
        <div className='signinBase'>
            <form className='signinForm' onSubmit={handleSubmit}>
                <h1>Jelentkezz be a fiókodba!</h1>
                <input name='email' type="email" placeholder='Email' required /><input name='password' type="password" placeholder='Jelszó' required />
                <p>Nincs fiókod? Csinálj egyet <a onClick={() => navigate("/signup")} style={{ cursor: "pointer", color: "lightblue" }}>itt</a>!</p>
                <button>Bejelentkezés</button>
            </form>
            <div style={{display:"flex", justifyContent:"center"}}><a href="#" onClick={()=>navigate("/pwreset")}>Elfelejtett jelszó</a></div>
            
        </div>
    )
}