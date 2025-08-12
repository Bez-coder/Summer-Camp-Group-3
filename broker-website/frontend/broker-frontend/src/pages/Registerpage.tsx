import React from 'react'
import Registerform from '../components/Registerform'
import Button from '../components/Button'

const Registerpage = () => {
  return (
    <>
    <div className="max-w-lg mx-auto  bg-white rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <Registerform/>
        <div className='mt-10  '>
        <Button
        text='Register'
        type='submit'
        href='/Signin'
        />
        </div>
        <div className='flex mt-5'>
            <p className='mr-5'>Already have an account?</p>
            <a href='/Signin'>Sign In</a>
        </div>
    </div>
    </>
  )
}

export default Registerpage