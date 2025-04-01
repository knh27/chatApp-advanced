import { SearchSharp } from '@mui/icons-material';
import React, { useState } from 'react'
import { Search as SearchIcon } from '@mui/icons-material';
import UserItem from '../shared/UserItem';
import { sampleUsers } from '../../constants/sampleData';

const Search = () => {
  const [search, setSearch]=useState("");

  const [users, setUsers]=useState(sampleUsers);

  let isLoadingSendFriendReq=false;

  const handleSearchInputChange=(e)=>{
    setSearch(e.target.value)
  }
  const addFriendHandler=(id)=>{
    console.log(id)
  }
  return (
    <dialog 
  className='fixed inset-0 flex items-center justify-center bg-black/50' 
  open={true}
>
  <div className='w-96 bg-white shadow-lg rounded-lg p-4'>
    <h2 className='text-center text-lg font-semibold'>Find People</h2>
    
    <div className='flex items-center border rounded px-2 py-1 mt-2'>
      <SearchIcon className='text-gray-500' />
      <input 
        type="text"
        value={search}
        onChange={handleSearchInputChange}
        name='search'
        className='flex-grow outline-none px-2'
      />
    </div>

    <div className='max-h-60 overflow-y-auto mt-3'>
      {users.map((i) => (
        <UserItem user={i} key={i._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendReq} />
      ))}
    </div>
  </div>
</dialog>

  )
}

export default Search