import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HomePage } from './pages/HomePage'
import { Route, Routes, useLocation } from 'react-router'
import { Garage } from './pages/Garage'
import { MyHeader } from './components/Header'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'
import { MyUserProvider } from './context/MyUserProvider'
import { UserProfile } from './pages/UserProfile'
import { PageNotFound } from './pages/PageNotFound'
import { PwReset } from './components/PwReset'
import { ParkolohazForm } from './pages/ujParkolohaz'
import { ThemeWheel } from './components/themeWheel'
import { ProtectedRoute } from './pages/ProtectedRoute'


function AppContent() {
  const location = useLocation()

  return (
    <>
      <MyHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/garage/:id" element={<Garage />} />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path='/pwreset' element={<PwReset />} />
          <Route path='/profile' element={<ProtectedRoute><UserProfile/></ProtectedRoute>} />
          <Route path='/*' element={<PageNotFound />} />
          <Route path='/addnew' element={<ProtectedRoute><ParkolohazForm/></ProtectedRoute>} />
        </Routes>
      <ThemeWheel />
    </>
  )
}

function App() {
  return (
    <MyUserProvider>
      <AppContent />
    </MyUserProvider>
  )
}

export default App
                 