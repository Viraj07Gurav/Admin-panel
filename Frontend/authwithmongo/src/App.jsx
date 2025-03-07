import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AuthProvider } from './Component/context/Authcontext'
import LoginPage from './Component/Login'
import Register from './Component/Registration'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Component/Dashboard'
import UpdateUser from './Component/User'
import UsersData from './Component/UsersData'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'
import Header from './Component/website/Header'
import Carousel from './Component/website/Carousel'
import Footer from './Component/website/Footer'
import Aboutus from './Component/website/Aboutus'
import { WebsiteProvider } from './Component/context/WebsiteContext'
import Mainpage from './Component/website/Mainpage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <WebsiteProvider>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<LoginPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
       
          
        
        <Route path="/Users/:id" element={<UpdateUser/>}/>
       
        <Route path='/userdata' element={<ProtectedRoute requiredRole='admin'><UsersData/></ProtectedRoute>}/>
        <Route path='/website' element={<Mainpage/>}/>
      </Routes>   


  
      </BrowserRouter>
      {/* <div className='mt-5'>
      <Carousel/>
      </div>
      <Aboutus/>
      <Footer/> */}
       
      </WebsiteProvider>
   </AuthProvider>
  )
}

export default App
