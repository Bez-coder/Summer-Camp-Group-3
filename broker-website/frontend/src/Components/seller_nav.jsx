import React from "react";
import {Home,
  Bell,
  Mail,
  ShoppingCart} from 'lucide-react';
import { useNavigate } from "react-router-dom";
 

function seller_nav (){
  const navigate = useNavigate();
  const user = {
  name: 'Bezawit',
  profileImageUrl: 'https://i.pravatar.cc/150?u=bezawit' // random avatar generator
};
/*
const [user, setUser] = useState(null);

useEffect(() => {
  // Replace with actual fetch when backend is ready
  fetch('/api/user') // ← your future endpoint
    .then(res => res.json())
    .then(data => setUser(data));
}, []);

*/
  return(
    <>
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 hover:bg-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold" onClick={() => navigate('/')}>BOKERHUB</h1>
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-6">
            <div className="relative group inline-block">
              <button onClick={() => navigate("/")}  className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Home size={25} />
              </button>
               <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 
                   opacity-0 group-hover:opacity-100 
                   transition-opacity duration-300 
                   bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Home
                </span>
              </div>
             <div className="relative group inline-block">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bell size={25} />
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 
                   opacity-0 group-hover:opacity-100 
                   transition-opacity duration-300 
                   bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Notification
                </span>
              </div>
               <div className="relative group inline-block">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Mail size={25} />
              </button>
             <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 
                   opacity-0 group-hover:opacity-100 
                   transition-opacity duration-300 
                   bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Messages
                </span>
              </div> 
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                <button onClick={() => navigate('/seller_dashboard')}><img
                  src={user?.profileImageUrl ||'https://i.pravatar.cc/40'} 
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
                </button>
              </div>
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 
                   opacity-0 group-hover:opacity-100 
                   transition-opacity duration-300 
                   bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Messages
                </span>
              <button onClick={() => navigate('/post_1')} className="bg-black hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                SELL
              </button>
                {/* Logout Button */}
                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate('/signin');
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors ml-4"
                >
                  Logout
                </button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
export default seller_nav;