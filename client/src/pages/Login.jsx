import React, { useState } from 'react'
import {CameraAlt as CameraAltIcon} from "@mui/icons-material"
import { VisuallyHiddenInput as VisuallyHidden } from '../components/styles/StyledComponents';

const Login = () => {

  const[isLogin, setIsLogin]=useState(true);

  const[formData, setFormData]=useState({
    name:"",
    username:"",
    bio:"",
    password:"",
    image:null
  })

  const toggleLogin=()=>setIsLogin(prev=>!prev);

  const handleLoginSubmit=(e)=>{
    e.preventDefault();

  }

  const handleSignupSubmit=(e)=>{
    e.preventDefault();
  }

  const handleInputChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value,
    })

  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate image type
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file!");
        return;
      }
  
      // Validate size (max 2MB)
      if (file.size > 3 * 1024 * 1024) {
        alert("Image size must be less than 3MB!");
        return;
      }
  
      setFormData({
        ...formData,
        image: URL.createObjectURL(file),
      });
    }
  };
  




  return (
    <main className='h-screen flex justify-center items-center bg-pink-300'>
      <div className='max-w-xs w-full flex-col items-center shadow-lg bg-stone-200'>
        {
          isLogin?(
            <>
            <h5 className='text-xl text-center font-semibold mb-4'>Login</h5>
              <form className='w-full' onSubmit={handleLoginSubmit}>
                <input
                  className='m-3 border-2 w-full'  
                  required
                  type="text"
                  name="username"
                  placeholder='Username'

                  value={FormData.username}
                  onChange={handleInputChange}

                />

                <input 
                  className='m-3 w-full border'
                  required
                  type="password"
                  placeholder='Password'
                  name='password'

                  value={formData.password}
                  onChange={handleInputChange}

                />

                <button
                  type='submit'
                  className='w-full bg-blue-500 mt-4 text-white hover:bg-blue-600'
                >
                  Login
                </button>

                <p className='text-center mt-2'>OR</p>

                <button
                  onClick={toggleLogin}
                  className='mt-4 w-full'
                >Sign Up Instead</button>

              </form>
            </>
          ):(
            <>
              <h5 className='text-center font-semibold text-xl'>Sign Up</h5>
              <form className='w-full' onSubmit={handleSignupSubmit}>

                <div className='relative w-24 mx-auto'>
                  <img 
                    className='w-40 h-40 rounded-full object-cover' 
                    src={formData.image|| "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"} 
                    alt="profile" 
                  />
                  <label className='absolute bottom-0 right-0 bg-white/50 rounded-full cursor-pointer p-2 flex items-center'>
                    <CameraAltIcon/>
                    <VisuallyHidden
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>

                <input
                  className='m-3'  
                  required
                  type="text"
                  placeholder='Name'
                  name="name"

                  value={formData.name}
                  onChange={handleInputChange}

                />

                <input
                  className='m-3'  
                  required
                  type="text"
                  placeholder='Username'
                  name="username"

                  value={formData.username}
                  onChange={handleInputChange}

                />
                <input
                  className='m-3'  
                  required
                  type="text"
                  placeholder='Bio'
                  name='bio'

                  value={formData.bio}
                  onChange={handleInputChange}

                />

                <input 
                  className='m-3'
                  required
                  type="password"
                  placeholder='Password'
                  name='password'

                  value={formData.password}
                  onChange={handleInputChange}
                />

                <button
                  type='submit'
                  className='w-full bg-blue-500 mt-4 text-white hover:bg-blue-600'
                >
                  Sign Up
                </button>

                <p className='text-center m-2'>OR</p>

                <button
                  onClick={toggleLogin}
                  className='mt-4 w-full'
                >Login Instead</button>

              </form>
            </>
          )
        }
      </div>

    </main>
  )
}

export default Login
