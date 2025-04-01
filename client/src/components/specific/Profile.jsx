import React from 'react'
import { Face as FaceIcon, AlternateEmail as UserNameIcon, CalendarMonth as CalenderIcon, } from '@mui/icons-material'
import moment from 'moment'

const Profile = () => {
  return (
    <div className='flex flex-col items-center'>
      <div>
        <img 
            className='w-40 h-40 border-white border-3 mx-4  object-contain rounded-full'  
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrvSbizvnY0c2sfqq71ANwRU_KyAdmYPI1wA&s" alt="" />
      </div>
      <ProfileCard heading={"Bio"} text={"abcd"} />
      <ProfileCard heading={"Username"} text={"@knh_27"} Icon={UserNameIcon} />
      <ProfileCard heading={"Name"} text={"Pranav"}  Icon={FaceIcon}  />
      <ProfileCard heading={"Joined"} text={moment("2024-11-04T18:30:00.00Z").fromNow()}  Icon={CalenderIcon}  />
    </div>
  )
}

const ProfileCard=({text, Icon, heading})=>{
    
    return (
        <div className='flex flex-row items-center gap-4 text-white text-center'>
            {
                Icon && <Icon className="text-gray-500"/>
            }

            <div>
                <p className='text-gray-500'>{heading}</p>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Profile
