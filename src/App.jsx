import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HomePage } from './pages/HomePage'
import { Route, Routes } from 'react-router'
import { Garage } from './pages/Garage'
import { MyHeader } from './components/Header'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'
import { MyUserProvider } from './context/MyUserProvider'
import { UserProfile } from './pages/UserProfile'
import { PageNotFound } from './pages/PageNotFound'
import { PwReset } from './components/PwReset'
import { ParkolohazForm } from './pages/ujParkolohaz'

function App() {

  return (
    <MyUserProvider>
      <div>
        <MyHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/garage/:id" element={<Garage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/pwreset' element={<PwReset/>}/>
          <Route path='/profile' element={<UserProfile/>}/>
          <Route path='/*' element={<PageNotFound/>}/>
          <Route path='/addnew' element={<ParkolohazForm/>}/>
        </Routes>
      </div>
    </MyUserProvider>
  )
}

export default App
