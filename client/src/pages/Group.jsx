import React, { lazy, Suspense, useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Done as DoneIcon, Edit as EditIcon, Menu as MenuIcon } from "@mui/icons-material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Drawer } from "@mui/material";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats, sampleUsers } from "../constants/sampleData";
import UserItem from "../components/shared/UserItem";
const ConfirmDeleteDialog=lazy(()=>import("./../dialogs/ConfirmDeleteDialog"))
const AddMemberDialog=lazy(()=>import("./../dialogs/AddMemberDialog"))

const Group = () => {

  const isAddMember=true;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isEdit, setIsEdit]=useState(false)

  const[groupName, setGroupName]=useState("")
  const[groupNameUpdatedValue, setGroupNameUpdatedValue]=useState("")
  const [confirmDeleteDialog, setConfirmDeleteDialog]=useState(false);

  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupName=()=>{
    setIsEdit(false);
  }
  const openConfirmDeleteHandler=()=>{
    setConfirmDeleteDialog(true)

  }
  const closeConfirmDeleteHandler=()=>{
    setConfirmDeleteDialog(false);
  }
  const openAddMemberHandler=()=>{
    console.log()

  }
  
  const deleteHandler=()=>{
    console.log("group deleted")
    closeConfirmDeleteHandler();
  }

  const removeMemberHandler=(id)=>{
    console.log(id)
  }

  useEffect(()=>{
    if(chatId){
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`)
    }
 

    return ()=>{
      setGroupName("")
      setGroupNameUpdatedValue("")
      setIsEdit(false)
    }
  }, [chatId])

  const IconBtns = (
    <>
      <div className="">
        <button
          className="block sm:hidden absolute top-4 right-8 bg-gray-700 text-white rounded-full"
          onClick={handleMobile}
        >
          <MenuIcon />
        </button>

        <button
          className="absolute top-4 left-8 bg-gray-700 text-white rounded-full"
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </button>
      </div>
    </>
  );

  const GroupName = <div className="flex flex-row gap-4">
     {
    isEdit ? <> 
      <input 
        className="flex-1 px-2 py-1 border outline-orange-400 bg-gray-200 rounded-md" type="text"
        value={groupNameUpdatedValue}
        onChange={(e)=>setGroupNameUpdatedValue(e.target.value)}
        />
      <button  onClick={updateGroupName}>
        <DoneIcon/>
      </button>
    </> : <>
        <h3>{groupName}</h3>
        <button onClick={()=>setIsEdit(true)}>
          <EditIcon/>
        </button>
      </>
    }
  </div>;

  const ButtonGroup=(
    <div className="flex flex-col-reverse sm:flex-row gap-4 p-1 ">
      
      <button 
        className="bg-green-400 rounded-2xl p-2 text-white"
        onClick={openAddMemberHandler}
        >Add Member</button>
      <button 
        className="bg-red-500 rounded-2xl p-2 text-white" 
        onClick={openConfirmDeleteHandler}
      >Delete Group</button>
    </div>
  )


  return (
    <div className="h-screen grid grid-cols-12">
      <div className="hidden sm:block sm:col-span-4 bg-bisque bg-amber-400">
        <GroupsList w={"50vw"} myGroups={sampleChats} />
      </div>

      <div className="col-span-12 sm:col-span-8 flex flex-col items-center relative p-4 sm:p12">
        {IconBtns}

        { groupName &&
          <>
            {GroupName}
            <p>Members</p>

            <div className="max-w-180 w-full box-border p-4 gap-8 bg-amber-300 h-1/2 overflow-autof">
              {  }

            </div>
            {
              sampleUsers.map((i, index)=>(
                <UserItem user={i} key={index}  isAdded
                  styling={{
                    boxShadow:"0 0 0.5rem rgba(0,0,0,0.2)",
                    padding:"1rem 2rem",
                    borderRadius:"1rem"
                  }}
                  handler={removeMemberHandler}
                />
              ))
            }
            {ButtonGroup}
          </>
        }
      </div>

      {
        isAddMember && <Suspense fallback={<div>loading</div>}>
          <AddMemberDialog/>
        </Suspense>
      }

      {
        confirmDeleteDialog && (
          <Suspense fallback={<div>Loading........</div>}>
            <ConfirmDeleteDialog 
              open={confirmDeleteDialog} 
              handleClose={closeConfirmDeleteHandler}
              deleteHandler={deleteHandler}
              />
          </Suspense>
        )
      }

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-50 sm:hidden"
          onClick={handleMobileClose}
        >
          <div className="fixed top-0 left-0 h-full w-3/5 bg-amber-400 shadow-lg p-4">
            <div className="mt-8">
              <GroupsList w={"50vw"} myGroups={sampleChats} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <div>
      {myGroups.length > 0 ? (
        myGroups.map((group, index) => {
          return (
            <GroupListItem key={group._id} group={group} chatId={chatId} />
          );
        })
      ) : (
        <p className="text-center p-1">NO groups found</p>
      )}
    </div>
  );
};

const GroupListItem = ({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link to={`?group=${_id}`} className="block">
      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-400 transition">
        <AvatarCard avatar={avatar} />
        <p className="text-lg font-medium text-gray-800">{name}</p>
      </div>
    </Link>
  );
};

export default Group;

/*
<Drawer
        open={isMobileMenuOpen} 
        onClose={handleMobileClose}
        sx={{
          display:{
            xs:"block",
            sm:"none"
          }
        }}
      > 
        Group List
      </Drawer>
*/
