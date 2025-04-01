import React, { lazy, Suspense } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import ProtectRoute from './components/auth/ProtectRoute'
import "./App.css"
import LayoutLoader from './components/layout/LayoutLoader'
const Login=lazy(()=>import("./pages/Login"))
const Home=lazy(()=>import("./pages/Home"))
const Chat=lazy(()=>import("./pages/Chat"))
const Group=lazy(()=>import("./pages/Group"))
const NotFound=lazy(()=>import("./pages/NotFound"))

const AdminLogin=lazy(()=>import("./pages/admin/AdminLogin"))
const AdminDashboard=lazy(()=>import("./pages/admin/AdminDashboard"))
const MessageManagement=lazy(()=>import("./pages/admin/MessageManagement"))
const UserManagement=lazy(()=>import("./pages/admin/UserManagement"))
const ChatManagement=lazy(()=>import("./pages/admin/ChatManagement"))

let user=true;

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader/>}>
      <Routes>
        <Route 
          path='/' 
          element={
            <ProtectRoute user={user}>
              <Home/>
            </ProtectRoute>
          }
        />

         <Route element={<ProtectRoute user={user} />}>{/* this is used with outlet  other wise the way home is wrapped is correct too*/}
          <Route path='/chat/:chatId' element={<Chat/>} />
          <Route path='/groups' element={<Group/>} />
        </Route>
        

        <Route element={<ProtectRoute user={!user} />} />
        <Route 
          path='/login' 
          element={
            <ProtectRoute user={!user}  redirect='/'>
              <Login/>
            </ProtectRoute>} 
        />

        <Route path='/admin' element={<AdminLogin/>} />
        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
        <Route path='/admin/chats-management' element={<ChatManagement/>} />
        <Route path='/admin/messages-management' element={<MessageManagement/>} />
        <Route path='/admin/users-management' element={<UserManagement/>} />

        <Route path='*' element={<NotFound/>} />

      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
