import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

const currentYear = new Date().getFullYear();

export default function Login() {

    const [message, setMessage] = useState('')
    const { loginUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
      console.log(data);
      try {
        await loginUser(data.email, data.password);
        alert("User LoggedIn Successfully")
        navigate('/')
      } catch (error) {
        setMessage("Please provide a valid email and Password")
        console.log(error)
      }
    }

    const handleGoogleSignIn = async() => {
      try {
        await signInWithGoogle()
        alert("User LoggedIn Successfully")
        navigate('/')
      } catch (error) {
        alert("Google sign in failed")
        console.log(error)
      }
    }

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
      <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8'>
        <h2 className='text-xl font-semibold mb-4'>Please Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
                <input {...register("email", { required: true })} type="email" name='email' id='email' placeholder='Email Address' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-md'/>
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                <input {...register("password", { required: true })} type="password" name='password' id='password' placeholder='Password' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-md'/>
            </div>
            {
                message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
            }
            <div>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none transition-colors'>Login</button>
            </div>
        </form>
        <p className='align-baseline font-medium mt-4 text-sm'>Don't have an account? Please <Link to='/register' className='text-blue-500 hover:text-blue-700'>Register</Link></p>
        {/* google sign-in */}
        <div className='flex justify-center items-center mt-4'>
            <button onClick={handleGoogleSignIn} className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none transition-colors'>
                <FaGoogle className='mr-2'/>
                Sign in with Google
            </button>
        </div>
        <p className='mt-5 text-center text-gray-500 text-xs'>&copy; {currentYear} Booklers. All Rights Reserved.</p>
      </div>
    </div>
  )
}
