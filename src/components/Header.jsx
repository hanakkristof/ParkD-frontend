import React from 'react'
import { useNavigate } from 'react-router'
import { FaHouseChimney } from "react-icons/fa6";
import { useContext } from 'react';
import { MyUserContext } from '../context/MyUserProvider';
import { RxAvatar } from "react-icons/rx";

export const MyHeader = () => {
  const navigate = useNavigate()
  const { user, logoutUser } = useContext(MyUserContext)
  return (
    
    <div className='MyHeaderCss'>
      <FaHouseChimney onClick={() => navigate("/")} style={{ fontSize: "30px", cursor:'pointer'}} className='house' />
      {user ?

        <div className='MyHeaderImage'>
          <span onClick={()=>navigate('/profile')}>
            {user?.photoURL ?
              <img style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} src={user.photoURL} alt="profilkép"/>
        
            :
              <RxAvatar size={50} style={{ color: "white" }} title={user?.displayName} />
            }
            </span>
          <button className='MyHeaderCssButton logOutButton' onClick={() => logoutUser()}>
            Kijelentkezés
          </button>
        </div>
        :
        <div className='MyHeaderCss'>
          <FaHouseChimney onClick={() => navigate("/")} style={{ fontSize: "30px", cursor:"pointer" }} className='house' />
          <button className='MyHeaderCssButton' onClick={() => navigate("/signup")}>
            Regisztrálás
          </button>
          <button className='MyHeaderCssButton' onClick={() => navigate("/signin")}>
            Bejelentkezés
          </button>
        </div>

      }
    </div>
  )
}