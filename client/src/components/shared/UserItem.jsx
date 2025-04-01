import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import React, { memo } from "react";

const UserItem = ({ user, handler, handlerIsLoading }) => {
  const { name, _id, avatar, isAdded } = user;

  return ( 
    <div className="flex flex-row items-center w-full gap-4">
      <div>
        <img className="w-12 h-12 rounded-full border-2 border-white" src={avatar} alt="" />
      </div>

      <p className="flex-grow line-clamp-1 overflow-hidden text-ellipsis" >{name}</p>

      <div 
        onClick={()=>handler(_id)} 
        disabled={handlerIsLoading}
        className="bg-blue-500 text-white hover:bg-gray-500"
        >
        {
          isAdded ? <RemoveIcon className="bg-red-500" /> : <AddIcon className="bg-green-500" />
        }
      
      </div>
    </div>
  );
};

export default memo(UserItem);
