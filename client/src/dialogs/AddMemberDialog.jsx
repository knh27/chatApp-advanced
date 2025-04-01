import React,{useState} from "react";
import { sampleUsers } from "../constants/sampleData";
import UserItem from "./../components/shared/UserItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {

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
  const addFriendHandler = (id) => {
    console.log(id, chatId);
  };

  const closeHandler=()=>{
    setSelectedMembers([])
    setMembers([])
  }

  const addMemberSubmitHandler=()=>{

  }



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold">Add Member</h3>

        <div className="mt-4 space-y-2">
          {members.length > 0 ? (
            members.map((user, index) => (
              <UserItem key={index} user={user} handler={selectMemberHandler} isAdded={selectedMembers.includes(user._id)} />
            ))
          ) : (
            <p className="text-gray-500 text-center">No Friends</p>
          )}
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={addMemberSubmitHandler}
            className="px-4 py-2 bg-green-400 rounded-2xl text-white"
          >
            Confirm
          </button>
          <button
            onClick={closeHandler}
            className="px-4 py-2 bg-red-400 rounded-2xl text-white "
          >
            Close
          </button>
        </div>


      </div>
    </div>
  );
};


/*
        
*/

export default AddMemberDialog;
