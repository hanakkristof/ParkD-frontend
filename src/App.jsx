import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HomePage } from './pages/HomePage'
import { Garage } from './pages/Garage'
import { MyHeader } from './components/Header'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'
import { MyUserContext, MyUserProvider } from './context/MyUserProvider'
import { UserProfile } from './pages/UserProfile'
import { PageNotFound } from './pages/PageNotFound'
import { PwReset } from './components/PwReset'
import { ParkolohazForm } from './pages/ujParkolohaz'
import { ThemeWheel } from './components/themeWheel'
import { ProtectedRoute } from './pages/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import { MyToastify } from './components/MyToastify'
import { useContext } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'


function AppContent() {
  const location = useLocation()
  const { user } = useContext(MyUserContext)

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark"
    document.body.classList.remove("light", "matcha", "midnight", "ocean")
    if (saved !== "dark") {
        document.body.classList.add(saved)
    }
}, [])

  return (
    <>
      <MyHeader />
      <MyToastify />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/garage/:id" element={<Garage />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path='/pwreset' element={<PwReset />} />
        <Route path='/profile' element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path='/*' element={<PageNotFound />} />
        <Route path='/addnew' element={<ProtectedRoute><ParkolohazForm /></ProtectedRoute>} />
      </Routes>

    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <MyUserProvider>
        <AppContent />
      </MyUserProvider>
    </BrowserRouter>

  )
}

export default App
