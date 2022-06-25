import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Dashview from './pages/Dashview'
import Login from './pages/Login'
import Register from './pages/Register'
import SetAvatar from './pages/SetAvatar'

function App() {
  return (
   <BrowserRouter>
<Routes>
  <Route path="/register" element={<Register/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/setAvatar" element={<SetAvatar/>}/>
  <Route path="/" element={<Dashview/>}/>
</Routes>
   </BrowserRouter>
  )
}

export default App
