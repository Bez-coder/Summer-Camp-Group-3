import React from 'react'

import { useState } from "react";
interface SigninInterface{
  formData:{
  email:string
  password:string
}
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Signinform = ({formData,onChange}:SigninInterface) => {
   
  return (
    <>
         <div className="m-1 mt-20">
        <div>
    <h1 className="text-xl font-bold text-center text-gray-700  mb-8">Welcome Back</h1>
    <div className="w-full flex flex-col gap-4 m-4">

      <div className="flex items-start flex-col justify-start">
        <label htmlFor="email" className="text-sm text-gray-700  mr-2">Email:</label>
        <input type="email" id="email" name="email" autoComplete='off' className="w-full px-3 text-gray-800  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-blue-500" value={formData.email} onChange={onChange}/>
      </div>

      <div className="flex items-start flex-col justify-start">
        <label htmlFor="password" className="text-sm text-gray-700  mr-2">Password:</label>
        <input type="password" id="password" name="password" autoComplete='new-password' className="w-full px-3 text-gray-800  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-blue-500" value={formData.password} onChange={onChange}/>
      </div>

    </div>

  </div>
    </div>
    </>
  )
}

export default Signinform