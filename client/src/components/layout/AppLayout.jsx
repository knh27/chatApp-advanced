import React from "react";
import Header from "../shared/Header";
import ChatList from "../specific/ChatList";
import { sampleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params=useParams();
    const chatId=params.chatId;

    const handleDeleteChat=(e, _id, groupChat)=>{
      e.preventDefault();
      console.log("delete chat", _id, groupChat)
    }
    return (
      <div>
        <Header />

        <div
          className="grid h-screen gap-4 p-4 grid-cols-1 
             md:[grid-template-columns:30%_70%] 
             lg:[grid-template-columns:30%_45%_25%]"
        >

          <div className="hidden md:block bg-blue-100 p-4">
            <ChatList chats={sampleChats} chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </div>

          <div className="bg-white border flex items-center justify-center">
            <WrappedComponent {...props} />
          </div>

          <div className="hidden lg:block bg-black p-4">
            <Profile/>
          </div>
        </div>

        
        <div>Footer</div>
      </div>
    );
  };
};

export default AppLayout;

/*
higher order component that will return WrappedComponent and WrappedComponnent will return a function

*/
