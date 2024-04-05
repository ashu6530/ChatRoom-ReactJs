import React from 'react'
import { useAuth } from '../utils/AuthContext'
import { TbLogout } from "react-icons/tb";
import { MdOutlineLogin } from "react-icons/md";
import { Link } from 'react-router-dom';


const Header = () => {
    const {user,handleUserlogout}=useAuth()
    
  return (
    <div className='bg-gray-100 p-4 rounded-lg shadow-lg flex justify-between items-center'>
    {user ? (
      <div className="flex items-center">
        <span className="text-gray-800">Welcome, {user.name}!</span>
        <button onClick={handleUserlogout} className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'><TbLogout /></button>
      </div>
    ) : (
      <div className="flex items-center justify-between w-full">
        <span className='font-bold'>Welcome to the ChatRoom</span>
        <Link to="/login">
        <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'><MdOutlineLogin /></button>
        </Link>
       
      </div>
    )}
  </div>
  
  
  
  )
}

export default Header