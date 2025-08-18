import React from 'react'
import Registerform from '../Components/Registerform'
import Button from '../Components/Button'
import { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'

interface SignupInterface {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const Registerpage = () => {
  const navigate= useNavigate()
  const [Data, SetData] = useState<SignupInterface>({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [statusMessage, setStatusMessage] = useState("");
const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value} = event.target;

      SetData({ ...Data, [id]: value });
    
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
  const result = await axios.post("http://localhost:3001/api/auth/register", Data, {
      headers: { "Content-Type": "application/json" }
    });

    setStatusMessage(result.data.message);
    setIsSuccess(result.data.success);

    if (result.data.success) {

      localStorage.setItem("token", result.data.token);
      setTimeout(() => navigate("/signin"), 2000);
    }
  } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    setStatusMessage(err.response?.data?.message || "Registration Failed");
  } else {
    setStatusMessage("Registration Failed");
  }
  setIsSuccess(false);
}
};


  return (
    <>
    <form className='mt-20 py-0 ' onSubmit={handleSubmit}>
      <div className=" max-w-lg mx-auto bg-white rounded-lg shadow-md px-8 py-0 flex flex-col items-center">
        
        <Registerform formData={Data} onChange={handleChange} />
        
        <div className='mt-10'>
          <Button text='Register' type='submit' />
        </div>
        <p style={{ color: isSuccess ? "green" : "red", marginTop: "1rem" }}>
          {statusMessage}
        </p>
        <div className='flex mt-5'>
          <p className='mr-5'>Already have an account?</p>
          <a href='/Signin'>Sign In</a>
        </div>
      </div>
    </form>
    </>
  )
}

export default Registerpage