import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer/Footer'
import Popup from './components/Popup/Popup'
import AOS from "aos"
import "aos/dist/aos.css"
import { KidsWair } from './pages/KidsWair'
import Product  from './pages/Product'
import Home from "./pages/Home";
import Contact from "./pages/Contact";


function App() {

const [orderPopup, setOrderPopup] = useState(false)
const handleOrderPopup = () => {
  setOrderPopup(!orderPopup)
}
useEffect(() => {
  AOS.init({
    offset:100,
    duration:800,
    easing:"ease-in-sine", 
    delay:100
  });
  AOS.refresh();
}, [])

  return (
    <Router>
      <div className='bg-white dark:bg-gray-900 dark:text-white duration-200'>
      <Navbar handleOrderPopup={handleOrderPopup}/>

      <Routes>
          <Route path="/" element={<Home handleOrderPopup={handleOrderPopup} />} />
          <Route path="/kids-wear" element={<KidsWair/>} />
          <Route path="/product/:productId" element={<Product/>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
       <Footer/>
       <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup}/>
    </div>
    </Router>
  )
}

export default App