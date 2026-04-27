import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaHouseChimney } from "react-icons/fa6"
import { useContext } from 'react'
import { MyUserContext } from '../context/MyUserProvider'
import { RxAvatar } from "react-icons/rx"
import { IoIosSearch, IoMdMenu } from 'react-icons/io'
import { useState } from 'react'
import { RiCloseLargeFill } from 'react-icons/ri'
import { searchHely } from '../myBackend'
import { useEffect } from 'react'
import { useRef } from 'react'
import personIcon from '../assets/person_circle_regular_icon.png'

export const MyHeader = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logoutUser, userData } = useContext(MyUserContext)
  const [openSidebar, setOpenSidebar] = useState(false)
  const [searchedText, setSearchedText] = useState("")
  const [searchedResult, setSearchedResult] = useState([])

  const isHome = location.pathname === "/"

  const handleSearch = async () => {
    const data = await searchHely(searchedText)
    setSearchedResult(data)
  }

  const sidebarRef = useRef(null)
  useEffect(() => {
    function kikattint(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenSidebar(false)
      }
    }
    if (openSidebar) {
      document.addEventListener("mousedown", kikattint)
    }
    return () => {
      document.removeEventListener("mousedown", kikattint)
    }
  }, [openSidebar])

  return (
    <div className="MyHeaderCss">
      <div ref={sidebarRef} className={`sidebar ${openSidebar ? "open" : ""}`}>

        <div className="sidebarTop">
          {user ? (
            <span>
              {user?.photoURL
                ? <img className="profilKep" onClick={() => navigate('/profile')} src={user.photoURL} alt="profilkép" />
                : <RxAvatar size={50} onClick={() => navigate('/profile')} title={user?.displayName} />
              }
            </span>
          ) : (
            <div className="MyHeaderCss">
              {!openSidebar && <IoMdMenu onClick={() => setOpenSidebar(!openSidebar)} className="burgerMenu" />}
            </div>
          )}

          {user ? (
            <button className="sidebarBtn" onClick={() => logoutUser()}>
              Kijelentkezés
            </button>

          ) : (
            <div className="sidebarLoginRow" onClick={() => { navigate("/signin"); setOpenSidebar(false) }}>
              <img src={personIcon} alt="account" className="sidebarPersonIcon" />
              <span>Bejelentkezés / Regisztráció</span>
            </div>
          )}

          <RiCloseLargeFill onClick={() => setOpenSidebar(false)} className="house closeSidebar" />
        </div>

        <div className="headerSearch">
          <span className="headerSearchField">
            <input
              value={searchedText}
              onChange={(e) => setSearchedText(e.target.value)}
              type="text"
              className="sidebarInput"
              placeholder="Keresés..."
            />
            <IoIosSearch onClick={handleSearch} className="house" />
          </span>
          <div className="searchResults">
            {searchedResult.map(item => (
              <div key={item.id}>{item.hely}</div>
            ))}
          </div>
        </div>

        <div>
          {userData?.isAdmin && (
            <button
              className="sidebarBtn adminBtn"
              onClick={() => { navigate("/addnew"); setOpenSidebar(false) }}
            >
              Új parkolóház
            </button>
          )}
        </div>

        <div>
          {!isHome && (
            <FaHouseChimney onClick={() => { navigate("/"); setOpenSidebar(false) }} className="house" />
          )}
        </div>
      </div>

      {!openSidebar && <IoMdMenu onClick={() => setOpenSidebar(!openSidebar)} className="burgerMenu" />}
    </div>
  )
}