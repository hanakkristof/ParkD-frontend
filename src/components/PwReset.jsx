import React, { useContext } from 'react'
import { MyUserContext } from '../context/MyUserProvider'

export const PwReset = () => {
    const {msg, resetPassword} = useContext(MyUserContext)
    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log(data.get("email"))
        await resetPassword(data.get("email"))
    }
    return (
    <div className='signinup'>
      <div>
        <form onSubmit={handleSubmit} className='pwresetform'>
        <h3>Add meg az e-mail címedet a jelszóváltoztatás igényléséhez</h3>
            <div>
                
                <input type="email" placeholder='email' name='email'/>
            </div>
            <button>Új jelszó igénylése</button>
        </form>
      </div>
      
    </div>
  )
}