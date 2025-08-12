import React from "react"

import Navbar from "./components/Navbar"
import Registerpage from "./pages/Registerpage"
import Signinpage from "./pages/Signinpage"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  

  return (
    <>
      <div>
        <Navbar/>
        <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Registerpage/>}></Route>
          <Route path="/signin" element={<Signinpage/>}></Route>
        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
