import React from "react";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],//sampleData
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <div className={`flex flex-col overflow-auto h-full `} style={{width:w}}>
      {chats.length > 0 ? (
        chats.map((data, index) => {
            const{avatar, _id, name, groupChat, members}=data;

            const newMessageAlert=newMessagesAlert.find(
                ({chatId})=>chatId===_id
            )

            const isOnline=members?.some((member)=>onlineUsers.includes(_id));

          return <ChatItem 
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender={chatId===_id}
            handleDeleteChat={handleDeleteChat}
          />;
        })
      ) : (
        <p className="text-gray-500 text-center p-4">No Chats Available</p>
      )}
    </div>
  );
};

export default ChatList;
