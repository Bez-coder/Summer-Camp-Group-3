import React, { useState } from 'react'
import Signinform from '../Components/Signinform'
import Button from '../Components/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface SigninInterface{
  email:string
  password:string
}

const Signinpage = () => {
  const [Data, setData]=useState<SigninInterface>({
    email:'',
    password:''
  });
 const [statusMessage, setStatusMessage] = useState("");
const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {id,value}= e.target;
    setData({...Data,[id]:value})
  }

  const navigate=useNavigate()
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const result = await axios.post("http://localhost:5001/api/auth/signin", Data, {
      headers: { "Content-Type": "application/json" }
    });

    setStatusMessage(result.data.message);
    setIsSuccess(result.data.success);

    if (result.data.success) {
      // optionally store token
      localStorage.setItem("token", result.data.token);
      setTimeout(() => navigate("/seller_dashboard"), 2000);
    }
  } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    setStatusMessage(err.response?.data?.message || "Sign in failed");
  } else {
    setStatusMessage("Sign in failed");
  }
  setIsSuccess(false);
}
};

  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className="max-w-lg mx-auto  bg-white d rounded-lg shadow-md px-8 py-10 flex flex-col items-center ">
        <Signinform formData={Data} onChange={handleChange}/>
        <div className='mt-10  '>
        <Button
        text='Sign In'
        type='submit'
        />
        </div>
        <p style={{ color: isSuccess ? "green" : "red", marginTop: "1rem" }}>
          {statusMessage}
        </p>
        <div className='flex mt-5'>
            <p className='mr-5'>Don't have an account?</p>
            <a href='/register'>Register</a>
        </div>
    </div>
    </form>
    </>
  )
}

export default Signinpage