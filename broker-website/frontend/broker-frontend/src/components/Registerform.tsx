import React from 'react'

import { useState } from "react"

interface SignupInterface{
  firstName:string
  lastName:string
  password:string
  email:string
  file:File|null
}
const Registerform = () => {
     const [Data, SetData]=useState<SignupInterface>({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    file:null
  }
);
  const hundleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const {id, value, files}=event.target;
    if(files===null){
      SetData({...Data,[id]:value});
    }


    else if(id==='file' && files.length > 0 ){
      SetData({...Data, file:files[0]})
    }
  }
  return (
    <>
    <div className="m-1 mt-10">
  <div >
    <h1 className="text-xl font-bold text-center text-gray-800  mb-8">Welcome to Brokerhub</h1>
    <form action="#" className="w-full flex flex-col gap-4">
      <div className="flex items-start flex-col justify-start">
        <label htmlFor="firstName" className="text-sm text-gray-800  mr-2">First Name:</label>
        <input type="text" id="firstName" name="firstName" className="w-full px-3 text-gray-800  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-blue-500" value={Data.firstName} onChange={hundleChange}/>
      </div>

      <div className="flex items-start flex-col justify-start">
        <label htmlFor="lastName" className="text-sm text-gray-800  mr-2">Last Name:</label>
        <input type="text" id="lastName" name="lastName" className="w-full px-3 text-gray-800  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-blue-500" value={Data.lastName} onChange={hundleChange}/>
      </div>

      <div className="flex items-start flex-col justify-start">
        <label htmlFor="email" className="text-sm text-gray-800  mr-2">Email:</label>
        <input type="email" id="email" name="email" className="w-full px-3 text-gray-800  py-2 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-blue-500" value={Data.email} onChange={hundleChange}/>
      </div>

      <div className="flex items-start flex-col justify-start">
        <label htmlFor="password" className="text-sm text-gray-800  mr-2">Password:</label>
        <input type="password" id="password" name="password" className="w-full px-3 text-gray-800 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"value={Data.password} onChange={hundleChange}/>
      </div>
      <div className="flex items-start flex-col justify-start">
        <label htmlFor="password" className="text-sm text-gray-800  mr-2">Id:</label>
        <input type="file" id="file" accept=".pdf" name="file" placeholder="Id" className="w-  px-3 text-gray-800 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"  onChange={hundleChange}/>

      </div>

    </form>
    
  </div>
    </div>
    </>
  )
}

export default Registerform