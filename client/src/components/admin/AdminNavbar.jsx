import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AdminNavbar = () => {
  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center bg-black object-cover justify-between px-6 md:px-10 h-16 border-b border-gray-300/30'>
      <Link to='/'>
      <img src={assets.logo} alt="" className='w-36 h-auto' /></Link>
    </div>
  )
}

export default AdminNavbar
