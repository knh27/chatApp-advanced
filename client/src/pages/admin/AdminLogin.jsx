import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';


const AdminLogin = () => {

    const isAdmin=true;
      const[secretKey, setSecretKey]=useState("");
    
    
      const handleLoginSubmit=(e)=>{
        e.preventDefault();

        if (!secretKey.trim()) {
            alert("Secret Key is required!");
            return;
          }
    
      }
    
      const handleInputChange=(e)=>{
        setSecretKey(e.target.value)  
      }
    if(isAdmin) return <Navigate to="/admin/dashboard" />
      
  return (
    <div className='w-full flex flex-col items-center'>
    <h5 className='text-xl text-center font-semibold mb-4'>Admin-Login</h5>
      <form className='w-1/4' onSubmit={handleLoginSubmit}>
        <input 
          className='m-3 w-full border'
          required
          type="password"
          placeholder='Secret-Key'
          name='secretKey'

          value={secretKey}
          onChange={handleInputChange}

        />

        <button
          type='submit'
          className='w-full bg-blue-500 mt-4 text-white hover:bg-blue-600'
        >
          Login
        </button>

      </form>
    </div>
  )
}

export default AdminLogin
