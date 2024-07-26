import React, { useEffect, useState } from 'react';
import Avatar from '../assets/avatar.jpg';
import UsersService from '../services/UsersService';
import { SET_CURRENT_CHAT } from '../contexts/Actions';
import { useAppContext } from '../contexts/AppContext';

const Conversation = ({ chat, currentUser, onlineUsers }) => {
  const [userData, setUserData] = useState(null); 
  const {dispatch, currentChat} = useAppContext();
  const [userIsOnline, setUserIsOnline] = useState(false);
  
  useEffect(() => {
    const getUserData = async() => {
      try {
        const secondUserId = getSecondUserId(chat?.users);
        const { data } = await UsersService.getUser(secondUserId);
        setUserData(data);
      } catch (error) {
          console.log(error);
      } 
    }
    
    if(chat !== null){
      getUserData();
    }
  }, []);

  const getSecondUserId = (users) => {
    const secondUserId = users.find(id => id !== currentUser.userId);
    return secondUserId;
  }

  useEffect(() => {
    const checkIfUserIsOnline = () => {
      const foundUser = onlineUsers.find(user => user.userId === userData._id );
      if(foundUser){ setUserIsOnline(true) }
    }

    if(userData !== null ){ checkIfUserIsOnline() }
    
  }, [userData, onlineUsers]);
  

  const handleCurrentChat = () => {
    if(chat !== null){
      if(currentChat !== null){
        if(chat._id === currentChat._id) return   // Ensure users cannot send messages to themselves
      }
      localStorage.setItem('currentChat', JSON.stringify(chat));
      const secondUserId = getSecondUserId(chat?.users);
      dispatch({ type: SET_CURRENT_CHAT, payload: { chat, receiverId: secondUserId }});
    } 
  }

  
  return(
    <div onClick={handleCurrentChat} key={chat._id} className='chat-block my-2'>
      <div className='w-25 d-flex justify-content-center align-items-center'>
        <img className='chat-image' src={ userData?.hasDisplayPicture ? userData.displayPicture.url : Avatar } alt="" />
        <div className="online-status"></div>
      </div>
      <div className='d-flex flex-column w-100 text-align-start'>
        <div className='d-flex justify-content-between'>
          <span className="name">{userData?.name}</span>
          {/* <span className='date me-3'>Yesterday</span> */}
        </div>
        <span className={`recent-message ${userIsOnline ? 'online' : 'offline'}`}>{userIsOnline ? 'Online' : 'Offline'}</span>
      </div>

    </div>
  )
}

export default Conversation;