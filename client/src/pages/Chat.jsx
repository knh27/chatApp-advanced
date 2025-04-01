import React, { useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

const Chat = () => {
  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);

  const [openFileMenu, setOpenFileMenu] = useState(false);

  const sendHandler = (e) => {
    e.preventDefault();
  };

  const user={
    _id:"abcde",
    name:"Arnav"
  }

  return (
    <div className="flex flex-col h-screen w-full">
      <div
        ref={containerRef}
        className="flex flex-col flex-1 bg-gray-300 overflow-y-auto px-2 py-1"
      >
        {
          sampleMessage.map((i, key)=>(
            <MessageComponent message={i} user={user} key={i._id} />
          ))
        }
      </div>

      <form className="bg-gray-200 p-2">
        <div className="flex items-center gap-2">

          <button 
            onClick={()=>setOpenFileMenu(prev=>!prev)} type="button" 
            ref={fileMenuRef}
          >
            <AttachFileIcon />
          </button>


          {openFileMenu && (
            <div
              className="absolute left-0 top-full mt-2 bg-white shadow-lg p-3 rounded-md"
              style={{ width: "10rem", zIndex: 10 }}
            >
              <button className="block w-full text-left p-2 hover:bg-gray-100">
                Attach File
              </button>
              <button className="block w-full text-left p-2 hover:bg-gray-100">
                Upload Image
              </button>
            </div>
          )}

          <input
            type="text"
            placeholder="Write your message here..."
            className="flex-1 px-2 py-1 outline-none bg-white rounded-md"
          />

          <button
            className="bg-red-500 rounded-full text-gray-500"
            onClick={sendHandler}
            type="submit"
          >
            <SendIcon />
          </button>

        </div>
      </form>
    </div>
  );
};

export default AppLayout()(Chat);
