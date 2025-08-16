import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Registerpage from "./Pages/Registerpage"
import Signinpage from "./Pages/Signinpage"
import SellerDashboard from "./Pages/seller_dashboard"

function App() {
  
  return (
    <>
      <div>
              <Navbar/>
              <BrowserRouter>
              <Routes>
                <Route path="/register" element={<Registerpage/>}></Route>
                <Route path="/signin" element={<Signinpage/>}></Route>
                <Route path="/seller_dashboard" element={<SellerDashboard/>}></Route>
              </Routes>
              </BrowserRouter>
            </div>
    </>
  )
}

export default App
