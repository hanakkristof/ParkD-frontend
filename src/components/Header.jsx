import React from 'react'
import { useNavigate } from 'react-router'
import { FaHouseChimney } from "react-icons/fa6";
import { useContext } from 'react';
import { MyUserContext } from '../context/MyUserProvider';
import { RxAvatar } from "react-icons/rx";
import { IoIosSearch, IoMdClose, IoMdMenu } from 'react-icons/io';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { RiCloseLargeFill } from 'react-icons/ri';
import { searchHely } from '../myBackend';
import { useEffect } from 'react';
import { useRef } from 'react';

export const MyHeader = () => {
  const navigate = useNavigate()
  const { user, logoutUser } = useContext(MyUserContext)
  const [openSidebar, setOpenSidebar] = useState(false)

  const [searchedText, setSearchedText] = useState("")
  const [searchedResult, setSearchedResult] = useState([])

  const handleSearch = async () => {

    const data = await searchHely(searchedText)
    console.log(data);

    setSearchedResult(data);
  }

  const sidebarRef = useRef(null)
  useEffect(() => {

    function kikattint(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        console.log("asd");

        setOpenSidebar(false);
      }
    }

    if (openSidebar) {
      document.addEventListener("mousedown", kikattint)
    }

    return () => {
      document.removeEventListener("mousedown", kikattint)
    }


  }, [openSidebar, setOpenSidebar])




  return (

    <div className='MyHeaderCss'>

      <div ref={sidebarRef} className={`sidebar ${openSidebar ? "open" : ""}`}>
        <div style={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
          <FaHouseChimney onClick={() => {
            navigate("/")
            setOpenSidebar(false)
          }
          }
            className='house' />
          <RiCloseLargeFill onClick={() => { setOpenSidebar(!openSidebar) }} className='house closeSidebar' />
        </div>
        <div className='loginContainer'>
          {user ? "van felhasználó" : <div><button onClick={() => {
            navigate("/signup")
            setOpenSidebar(false)
          }}>
            Regisztrálás
          </button>
            <button onClick={() => {
              navigate("/signin")
              setOpenSidebar(false)
            }}>
              Bejelentkezés
            </button></div>}
          {user && <button className='MyHeaderCssButton logOutButton' onClick={() => logoutUser()}>
            Kijelentkezés
          </button>}


        </div>

        <div className='headerSearch'>
          <span className='headerSearchField'><input value={searchedText} onChange={(e) => setSearchedText(e.target.value)} type="text" />

            <IoIosSearch onClick={handleSearch} className='house' /></span>
          <div className='searchResults'>
            {searchedResult.map(item => {
              return <div key={item.id}>{item.hely}</div>
            })}
          </div>
        </div>

      </div>
      {user ?

        <div className='MyHeaderCss' style={{ justifyContent: "space-between", display: "flex" }}>
          {!openSidebar && (<IoMdMenu onClick={() => setOpenSidebar(!openSidebar)} className='burgerMenu' />)}
          <span onClick={() => navigate('/profile')}>
            {user?.photoURL ?
              <img style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} src={user.photoURL} alt="profilkép" />
              :
              <RxAvatar size={50} style={{ color: "white" }} title={user?.displayName} />
            }
          </span>

        </div>
        :
        <div className='MyHeaderCss'>
          {!openSidebar && (<IoMdMenu onClick={() => setOpenSidebar(!openSidebar)} className='burgerMenu' />)}

        </div>

      }
    </div>
  )
}