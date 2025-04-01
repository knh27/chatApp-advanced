import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

const NewGroup = () => {
  const[groupName, setGroupName]=useState("");
  const[members, setMembers]=useState(sampleUsers)
  const[selectedMembers, setSelectedMembers]=useState([])

  const selectMemberHandler = (id) => {
    setMembers(prev=>
      prev.map(user=>
        user._id==id ? {...user, isAdded:!user.isAdded}:user
      )
    )

    setSelectedMembers((prev)=>
      prev.includes(id)
        ? prev.filter(cur=>cur !== id)
        : [...prev, id]
    )
  };
  const handleGroupInputChange=()=>{};
  const submitHandler=()=>{};
  const closeHandler=()=>{};


  return (
    <dialog
      open
      onClose={closeHandler}
      className="
        fixed 
        inset-0 
        flex 
        items-center 
        justify-center 
        m-0 
        p-0 
        border-0 
        appearance-none 
        z-50
      "
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // The 'backdrop'
    >
      {/* Modal Content (White Box) */}
      <div className="bg-white w-96 shadow-lg rounded-lg p-4 relative">
        <h2 className="text-lg font-semibold mb-4">New Group</h2>

        <input
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Group name"

          value={groupName}
          onChange={handleGroupInputChange}
        />

        <p className="mt-4 mb-2">Members</p>
        <div className="max-h-60 overflow-y-auto mb-4">
          {members.map((i) => (
            <UserItem user={i} key={i._id} handler={selectMemberHandler } isAdded={selectedMembers.includes(i._id)} />
          ))}
        </div>

        <div className="flex gap-4 justify-end">
          <button className="bg-red-600 text-white py-2 px-4 rounded">
            Cancel
          </button>
          <button className="bg-green-600 text-white py-2 px-4 rounded" onClick={submitHandler}>
            Create
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default NewGroup;
