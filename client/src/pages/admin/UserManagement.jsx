import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { dashboardData } from '../../constants/sampleData'

const UserManagement = () => {

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
            <img className='w-12 h-12' alt={params.row.name} src={params.row.avatar}/> 
        )
    },
    {
        field:"name",
        headerName:"Name",
        headerClassName:"table-header",
        width:200
    },
    {
        field:"username",
        headerName:"Username",
        headerClassName:"table-header",
        width:200
    },
    {
        field:"friends",
        headerName:"Friends",
        headerClassName:"table-header",
        width:200
    },
    {
        field:"groups",
        headerName:"Groups",
        headerClassName:"table-header",
        width:200
    },
    {
        field:"joined",
        headerName:"Joined At",
        headerClassName:"table-header",
        width:200
    }

];
    const [rows, setRows]=useState([])

    useEffect(()=>{
        setRows(dashboardData.users.map((i)=>({...i, id:i._id})))
    }, [])
  return (

    <AdminLayout>
        <div>
            <Table heading={"All Users"} columns={columns} rows={rows} />
        </div>
    </AdminLayout>
  )
}

export default UserManagement
