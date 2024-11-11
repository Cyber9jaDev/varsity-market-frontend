import React, { useCallback, useEffect, useState } from 'react';
import Avatar from '../assets/avatar.jpg';
import { SET_CURRENT_CHAT } from '../contexts/Actions';
import { useAppContext } from '../contexts/AppContext';
import ChatService from '../services/ChatService';

const Conversation = ({ chat, currentUser, onlineUsers }) => {
  const [userData, setUserData] = useState(null);
  const { dispatch, currentChat } = useAppContext();
  const [userIsOnline, setUserIsOnline] = useState(false);

  const getSecondParticipantId = (participants) => {
    const secondParticipant = participants.find(participant => participant.participantId !== currentUser.id);
    return secondParticipant.participantId;
  }

  // const getSecondParticipantId = useCallback(
  //   (participants) => {
  //     const secondParticipant = participants.find(participant => participant.participantId !== currentUser.id);
  //     return secondParticipant.participantId;
  //   },
  //   [currentUser]
  // );

  useEffect(() => {
    const getUserData = async () => {
      try {
        const secondParticipantId = getSecondParticipantId(chat?.participants);
        const { data } = await ChatService.secondChatParticipant(secondParticipantId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    }

    if (chat !== null) {
      getUserData();
    }
  }, [chat, getSecondParticipantId]);
  // }, []);


  useEffect(() => {
    const checkIfUserIsOnline = () => {
      const foundUser = onlineUsers.find(user => user.id === userData.id);
      if (foundUser) { setUserIsOnline(true) }
    }

    if (userData !== null) {
      checkIfUserIsOnline()
    }

  }, [userData, onlineUsers]);


  // Set the active chat when clicked on a conversation block
  const handleCurrentChat = () => {
    console.log(chat);
    if (chat !== null) {
      if (currentChat !== null) {
        if (chat.id === currentChat.id) return   // Ensure users cannot send messages to themselves
      }

      // localStorage.setItem('currentChat', JSON.stringify(chat));

      const secondUserId = getSecondParticipantId(chat?.participants);
      console.log(secondUserId);
      // dispatch({
      //   type: SET_CURRENT_CHAT,
      //   payload: { chat, receiverId: secondUserId }
      // });
    }
  }

  return (
    <div onClick={handleCurrentChat} key={chat.id} className='chat-block my-2'>
      <div className='w-25 d-flex justify-content-center align-items-center'>
        <img className='chat-image' src={userData?.hasDisplayPicture ? userData.displayPicture.secure_url : Avatar} alt="" />
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