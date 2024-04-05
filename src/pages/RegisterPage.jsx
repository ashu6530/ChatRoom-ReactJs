import React, { useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

const RegisterPage = () => {
 const {handleUserRegister}=useAuth()

    const[credentials,setCredentials]=useState({
        name:'',
        email:"",
        password1:"",
        password2:""
    })
    const handleInputChange=(e)=>{
        let name = e.target.name
        let value = e.target.value
        setCredentials({...credentials,[name]:value})
 
     }
     return (
        <>
        <Header/>
        <main className="min-h-screen flex justify-center items-center bg-slate-300">
  <div className='auth--container bg-gray-100 p-4 rounded-lg shadow-lg'>
    <div className="form-wrapper">
      <form onSubmit={(e) => { handleUserRegister(e, credentials) }} action="">
        <div className="field--wrapper">
          <label htmlFor="" className="text-gray-800">Name:</label>
          <input
            type="text"
            required
            name='name'
            placeholder='Enter Your Name'
            value={credentials.name}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 bg-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="field--wrapper">
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
        <div className="field--wrapper">
          <label htmlFor="" className="text-gray-800">Password:</label>
          <input
            type="password"
            required
            name='password1'
            placeholder='Enter Your Password'
            value={credentials.password1}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 bg-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="field--wrapper">
          <label htmlFor="" className="text-gray-800">Confirm Password:</label>
          <input
            type="password"
            required
            name='password2'
            placeholder='Enter Your Password'
            value={credentials.password2}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2 bg-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-center">
          <input
            className='btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2'
            type="submit"
            value='Register'
          />
        </div>
        <p className="text-gray-600 mt-2">Already have an account? Login <Link to="/login" className="text-blue-500 hover:underline">Here</Link></p>
      </form>
    </div>
  </div>
</main>
</>


      )
}

export default RegisterPage