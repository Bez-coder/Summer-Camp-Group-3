import { useState } from 'react'
import Sellers_dashboard from './Pages/seller_dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Seller_nav from './Components/seller_nav';
import SettingsPage from './Pages/Settings';
import PostStep1 from './Pages/PostStep1';
import Post2 from './Pages/post2';
import { PostProvider } from './context/PostContext';

function App() {
  
  return (
    <>
    <PostProvider>
      <Router>
        <Routes>
          <Route path='/seller_dashboard' element ={<Sellers_dashboard/>} />
          <Route path='/' element={<Home/>}/>
          <Route path='/seller_nav' element={< Seller_nav/>} />
          <Route path='/settings' element = {< SettingsPage />}/>
          <Route path='/post_2' element = {< Post2 />}/>
          <Route path='/post_1' element = {< PostStep1 />}/>
        </Routes>
      </Router>
      </PostProvider>
    </>
  )
}

export default App;
