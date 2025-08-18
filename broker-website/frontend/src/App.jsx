
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Seller_registerPage from "./Pages/Seller_registerPage"
import Registerpage from "./Pages/Registerpage"
import Signinpage from "./Pages/Signinpage"


function App() {
  
  return (
    <>
      <div>
              <Navbar/>
              <BrowserRouter>
              <Routes>
                <Route path='/register_buyer' element={<Registerpage/>}></Route>
                <Route path="/register_seller" element={<Seller_registerPage/>}></Route>
                <Route path='/signin' element={<Signinpage/>}></Route>
              </Routes>
              </BrowserRouter>
           
            </div>
    </>
  )
}

export default App
