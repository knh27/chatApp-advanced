import React, { memo, useState } from 'react'
import { sampleNotifications } from '../../constants/sampleData'

const Notifications = () => {
  const[isLoading, setIsLoading]=useState(false)
  const friendRequestHandler=({_id, isAccept})=>{

  }
  return (
    <dialog 
      open
      className=" fixed inset-0 flex items-center justify-center bg-black/50"
    >
      <div className="w-100 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold">Notifications</h2>

        {isLoading ? (
          <div className="animate-pulse bg-gray-200 h-10 w-full mt-2"></div> 
        ) : (
          <>
            {sampleNotifications.length > 0 ? (
              sampleNotifications.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 mt-2">0 notifications</p>
            )}
          </>
        )}
      </div>
    </dialog>
  )
}


const NotificationItem=memo(({sender, _id, handler})=>{
  const {name,avatar}=sender;

  return (
    <div className="flex flex-row items-center w-full gap-4">
          <div>
            <img className="w-12 h-12 rounded-full border-2 border-white" src={avatar} alt="" />
          </div>
    
          <p className="flex-grow min-w-0 truncate text-gray-800" >{`${name} sent you friend request`}</p>
    
          <div className='flex gap-2'>
            <button className='text-green-400' onClick={()=>handler({_id, accept:true})}>
              Accept
            </button>
            
            <button className='text-red-500' onClick={()=>handler({_id, accept:false})} >
              Reject
            </button>
          </div>
        </div>
  )
})

export default Notifications
