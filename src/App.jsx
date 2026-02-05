import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HomePage } from './assets/HomePage'
import { Route, Routes } from 'react-router'
import { Garage } from './assets/Garage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/garage" element={<Garage/>}/>
    </Routes>
  )
}

export default App
