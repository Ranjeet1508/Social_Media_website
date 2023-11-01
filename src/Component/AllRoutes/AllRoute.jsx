import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../Home/Home'
import Account from '../Account/Account'
import Login from '../Login/Login'
import NewPost from '../NewPost/NewPost'
import Signup from '../Signup/Signup'
import EditProfile from '../EditProfile/EditProfile'
import UpdatePassword from '../UpdatePassword/UpdatePassword'
import FindFriends from '../FindFriends/FindFriends'
import UserProfile from '../UserProfile/UserProfile'
import ForgetPassword from '../ForgetPassword/ForgetPassword'
import ResetPassword from '../ResetPassword/ResetPassword'
import MyFriends from '../MyFriends/MyFriends'

const AllRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/find-friends'  element={<FindFriends/>} />
      <Route path='/my-friends'  element={<MyFriends/>} />
      <Route path='/newPost'  element={<NewPost/>} />
      <Route path='/account'  element={<Account/>} />
      <Route path='/signup'  element={<Signup/>} />
      <Route path='/editProfile'  element={<EditProfile/>} />
      <Route path='/updatePassword'  element={<UpdatePassword/>} />
      <Route path='/user/:id'  element={<UserProfile/>} />
      <Route path='find-friends/user/:id'  element={<UserProfile/>} />
      <Route path='/forgot/password'  element={<ForgetPassword/>} />
      <Route path='/resetPassword/:token'  element={<ResetPassword/>} />
       
    </Routes>
  )
}

export default AllRoute
