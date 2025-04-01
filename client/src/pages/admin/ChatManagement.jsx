import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { dashboardData } from '../../constants/sampleData'
import AvatarCard from '../../components/shared/AvatarCard'
import { transformImage } from '../../lib/features'

const ChatManagement = () => {

    const columns=[
        {
            field:"id",
            headerName:"ID",
            headerClassName:"table-header",
            width:200
        },
        {
            field:"avatar",
            headerName:"Avatar",
            headerClassName:"table-header",
            width:150,
            renderCell:(params)=>(
                <AvatarCard avatar={params.row.avatar}/> 
            )
        },
        {
            field:"name",
            headerName:"Name",
            headerClassName:"table-header",
            width:200
        },
        {
            field:"totalMembers",
            headerName:"Total Members",
            headerClassName:"table-header",
            width:100
        },
        {
            field:"members",
            headerName:"Members",
            headerClassName:"table-header",
            width:200,
            renderCell:(params)=><AvatarCard max={100} avatar={params.row.avatars} />
        },
        {
            field:"totalMessages",
            headerName:"Total Messages",
            headerClassName:"table-header",
            width:120
        },
        {
            field:"creater",
            headerName:"Created By",
            headerClassName:"table-header",
            width:250,
            renderCell:(params)=>(
                <div className='flex flex-col items-center gap-1'>
                    <img className='w-12 h-12'  src={params.row.creator.avatar}  />
                    <span>{params.row.creator.name}</span>
                </div>
            )
        }
    
    ];
    const [rows, setRows]=useState([])

    useEffect(()=>{
        setRows(dashboardData.chats.map((i)=>({
            ...i,
            id:i._id,
            avatar:i.avatar.map(i=>transformImage(i, 50)),
            avatars:i.members.map((i)=>transformImage(i.avatar, 50)),
            creator:{
                naem:i.creator.name,
                avatar:transformImage(i.creator, 50)
            }
        })))
    }, [])
  return (

    <AdminLayout>
        <div>
            <Table heading={"All Chats"} columns={columns} rows={rows} />
        </div>
    </AdminLayout>
  )
}



export default ChatManagement
