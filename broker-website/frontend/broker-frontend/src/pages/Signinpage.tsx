import React from 'react'
import Signinform from '../components/Signinform'
import Button from '../components/Button'

const Signinpage = () => {
  return (
    <>
    <div className="max-w-lg mx-auto  bg-white d rounded-lg shadow-md px-8 py-10 flex flex-col items-center ">
        <Signinform/>
        <div className='mt-10  '>
        <Button
        text='Sign In'
        type='submit'
        href='/'
        />
        </div>
        <div className='flex mt-5'>
            <p className='mr-5'>Don't have an account?</p>
            <a href='/Signin'>Register</a>
        </div>
    </div>
    </>
  )
}

export default Signinpage