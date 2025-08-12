import React from 'react'

import { useState } from "react";
interface SignupInterface{
  email:string
  password:string

}

const Signinform = () => {
    const [Data, SetData]=useState<SignupInterface>({
      email:'',
      password:''
    }
    )
    const hundleChange=(event:React.ChangeEvent<HTMLInputElement>) =>{
  const id=event.target.id;
  const value=event.target.value
  SetData({...Data, [id]:value})
    }
  return (
    <>
         <div className="m-1 mt-20">
        <div>
    <h1 className="text-xl font-bold text-center text-gray-700  mb-8">Welcome Back</h1>
    <form action="#" className="w-full flex flex-col gap-4 m-4">

      <div className="flex items-start flex-col justify-start">
        <label htmlFor="email" className="text-sm text-gray-700  mr-2">Email:</label>
        <input type="email" id="email" name="email" required className="w-full px-3 text-gray-800  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-blue-500" value={Data.email} onChange={hundleChange}/>
      </div>

      <div className="flex items-start flex-col justify-start">
        <label htmlFor="password" className="text-sm text-gray-700  mr-2">Password:</label>
        <input type="password" id="password" name="password" required className="w-full px-3 text-gray-800  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-blue-500" value={Data.password} onChange={hundleChange}/>
      </div>

    </form>

  </div>
    </div>
    </>
  )
}

export default Signinform