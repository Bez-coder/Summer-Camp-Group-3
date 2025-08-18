import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface SignupInterface{
  formData:{
  name:string
  email:string
  password:string
  phone:string}
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const [activeLink, setActiveLink] = useState('/register');

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const activeLinkStyle = 'bg-gray-200 text-gray-900';
  const inactiveLinkStyle = 'text-gray-500 hover:bg-gray-100';

const Registerform = ({formData,onChange}:SignupInterface) => {
  return (
    <>
    <div className="w-5/6  m-auto  py-0">
      <div className="flex w-full mb-10 overflow-hidden rounded-lg border border-gray-300 text-sm font-medium">
      <Link
        className={`flex-1 py-3 text-center transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ${
          activeLink === '/register' ? activeLinkStyle : inactiveLinkStyle
        }`}
        to="/register"
        onClick={() => handleLinkClick('/register')}
      >
        Buyer
      </Link>
      <Link
        className={`flex-1 py-3 text-center transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ${
          activeLink === '/register_seller' ? activeLinkStyle : inactiveLinkStyle
        }`}
        to="/register_seller"
        onClick={() => handleLinkClick('/register_seller')}
      >
        Seller
      </Link>
    </div>
      <div>
        <h1 className="text-xl font-bold text-center text-gray-800 mb-8">
          Welcome to Brokerhub
        </h1>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm text-gray-800 mr-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 text-gray-800 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.name}
              onChange={onChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm text-gray-800 mr-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              className="w-full px-3 text-gray-800 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.email}
              onChange={onChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm text-gray-800 mr-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              className="w-full px-3 text-gray-800 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.password}
              onChange={onChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="file" className="text-sm text-gray-800 mr-2">
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-3 text-gray-800 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.phone}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Registerform