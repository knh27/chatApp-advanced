import React, { memo } from "react";
import { Link } from "react-router-dom";
import AvatarCard from "./AvatarCard";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      to={`/chat/${_id}`}
      className="no-underline text-black p-4 hover:bg-black/10 block"
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <div
        className={`flex items-center p-4 justify-around border-b border-black border-solid ${
          sameSender ? "bg-black" : "bg-[unset] "
        } ${sameSender ? "text-white" : "text-inherit"}`}
      >
        
        <AvatarCard avatar={avatar} />

        <div className="flex flex-col overflow-auto h-full">
          <p>{name}</p>

          {newMessageAlert && (
            <p className="text-red-600">{newMessageAlert.count} New Message</p>
          )}
        </div>

        {isOnline && (
          <div className="w-3 h-3 bg-green-600 rounded-full right-4 top-1/2 transform -translate-y-1/2" />
        )}
      </div>
    </Link>
  );
};

export default memo(ChatItem);
