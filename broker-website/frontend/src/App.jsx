import { useState } from 'react'
import Sellers_dashboard from './Pages/seller_dashboard';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Seller_nav from './Components/seller_nav';
import SettingsPage from './Pages/Settings';
import PostStep1 from './Pages/PostStep1';
import Post2 from './Pages/post2';
import { PostProvider } from './context/PostContext';
import Navbar from "./Components/Navbar";
import Seller_registerPage from "./Pages/Seller_registerPage";
import Registerpage from "./Pages/Registerpage";
import Signinpage from "./Pages/Signinpage";

function App() {
  return (
    <>
      <Navbar />
      <PostProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/seller_dashboard' element={<Sellers_dashboard />} />
            <Route path='/seller_nav' element={<Seller_nav />} />
            <Route path='/settings' element={<SettingsPage />} />
            <Route path='/post_2' element={<Post2 />} />
            <Route path='/post_1' element={<PostStep1 />} />
            <Route path='/register_buyer' element={<Registerpage />} />
            <Route path='/register_seller' element={<Seller_registerPage />} />
            <Route path='/signin' element={<Signinpage />} />
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </>
  );
}

export default App;
