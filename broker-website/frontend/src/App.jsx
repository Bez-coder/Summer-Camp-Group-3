import { useState } from 'react'
import Sellers_dashboard from './Pages/seller_dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Seller_nav from './Components/seller_nav';
import SettingsPage from './Pages/Settings';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/seller_dashboard' element ={<Sellers_dashboard/>} />
          <Route path='/' element={<Home/>}/>
          <Route path='/seller_nav' element={< Seller_nav/>} />
          <Route path='/settings' element = {< SettingsPage />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
