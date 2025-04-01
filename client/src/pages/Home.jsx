import React from 'react'
import AppLayout from '../components/layout/AppLayout'

const Home = () => {
  return (
    <div className='bg-gray-300 '>
      <p className='text-center text-2xl mt-2'> Select a friend to chat</p>
    </div>
    
  )
}

export default AppLayout()(Home);
/*
(props)=>{
        return(
            <div>
                <div>Header</div>
                <Home {...props} />
                <div>Footer</div>
            </div>
 */

