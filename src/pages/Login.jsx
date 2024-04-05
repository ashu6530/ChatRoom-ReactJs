import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import Header from '../components/Header'

const Login = () => {
    const {user,handUserLogin} = useAuth()
    const navigate=useNavigate()
    const[credentials,setCredentials]=useState({
        email:"",
        password:""
    })
    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[])

    const handleInputChange=(e)=>{
       let name = e.target.name
       let value = e.target.value
       setCredentials({...credentials,[name]:value})

    }
  return (
    <>
    <Header/>
    <main className="min-h-screen flex justify-center items-center bg-slate-300">
    <div className='bg-gray-100 p-4 rounded-lg shadow-lg'>
      <div className="">
        <form onSubmit={(e) => { handUserLogin(e, credentials) }} action="">
          <div className="">
            <label htmlFor="" className="text-gray-800">Email:</label>
            <input
              type="email"
              required
              name='email'
              placeholder='Enter Your Email'
              value={credentials.email}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 bg-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="">
            <label htmlFor="" className="text-gray-800">Password:</label>
            <input
              type="password"
              required
              name='password'
              placeholder='Enter Your Password'
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 bg-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <input
              className='btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2'
              type="submit"
              value='Login'
            />
          </div>
        </form>
        <p className="text-gray-600 mt-4">Don't have an account yet? Register <Link to="/register" className="text-blue-500 hover:underline">here</Link></p>
      </div>
    </div>
  </main>
  </>
  


  )
}

export default Login