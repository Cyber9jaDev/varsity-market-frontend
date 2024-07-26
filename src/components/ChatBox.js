import React, { useEffect, useState, useRef } from 'react';
import Avatar from '../assets/avatar.jpg';
import UsersService from '../services/UsersService';
import { useAppContext } from '../contexts/AppContext';
import ChatService from '../services/ChatService';
import moment from 'moment';
import { HIDE_CHAT_BOX } from '../contexts/Actions';

const ChatBox = ({ currentUser, messageFromSocketServer, windowWidth, setMessageToSocketServer, messages, setMessages }) => {
  // const [ latestMessage, setLatestMessage ] = useState(null);
  const { secondUserId, currentChat, dispatch } = useAppContext();
  const [ messageText, setMessageText ] = useState('');
  const [ secondUserData, setSecondUserData ] = useState(JSON.parse(localStorage.getItem('secondUserData')) || null );
  const scrollToLastMessageRef = useRef(null);


  // Scroll to last message
  useEffect(() => {
    scrollToLastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }, [messages]);

  useEffect(() => {
    if(messageFromSocketServer !== null ){
      setMessages(previousMessages => ([...previousMessages, messageFromSocketServer]));
    }
  }, [messageFromSocketServer]);
  
  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await ChatService.getMessages(currentChat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    }    

    if(currentChat !== null){
      getMessages();
    }

  }, [currentChat]);
  
  // Top level of chat box (header)
  useEffect(() => {

    const getUserData = async() => {
      try {
        const { data } = await UsersService.getUser(secondUserId);
        console.log(data);
        localStorage.setItem('secondUserData', JSON.stringify(data));
        setSecondUserData(data);
        localStorage.setItem('hideChatBox', JSON.stringify(false));
        dispatch({ type: HIDE_CHAT_BOX, payload: {value: false}});
      } catch (error) {
        console.log(error);
      }
    }

    if(secondUserId !== null){
      getUserData();
    }
  }, [secondUserId, currentChat]);

  const handleSendMessage = async () => {
    if(messageText === '' || currentChat === null) return;
    // Fire Socket
    const message = { senderId: currentUser.userId, message: messageText.trim(), chatId: currentChat._id }
    try {
      const { data } = await ChatService.sendMessage(message);
      setMessages(previousMessages => ([...previousMessages, data]));
      // Send message to socket server
      const receiverId = currentChat.users.find(id => id !== currentUser.userId);
      setMessageToSocketServer({...message, receiverId});
      setMessageText('');
    } catch (error) {
      console.log(error);
    } 
  }

  const handleMessageOnKeyDown = async (e) => {
    if(e.keyCode !== 13){ return } 
    return handleSendMessage();
  }

  const handleChatBox = () => {
    localStorage.setItem('hideChatBox', JSON.stringify(true));
    dispatch({type: HIDE_CHAT_BOX, payload: {value: true}});
  }

  return (
    <div className='chatbox'>
      <div className='d-flex flex-column'>
          {/* Top level of chat box  */}
        <div className='second-user-data d-flex align-items-center'>
          { windowWidth <= 768 &&  <i onClick={ handleChatBox } className="fa-solid fa-chevron-left icon"></i>}
          <span className='fs-5 fw-bold ms-4'>{secondUserData?.name}</span>
          <img className='chat-image ms-auto my-auto' src={secondUserData?.hasDisplayPicture ? secondUserData.displayPicture.url :Avatar} alt="second-person-img" width={40} height={40} />
        </div>
        {/* <hr /> */}
        
        <div className='my-3 chat-list' >
          {
            messages.map((message) => {
              return(
                <div ref={scrollToLastMessageRef} key={message._id} className ={`message-wrapper ${ message.senderId === currentUser.userId ? 'own' : 'second-user'}`}>
                  <p className='text'>{message.message}</p>
                  <p className='time text-end'>{moment(message.createdAt).fromNow()}</p>
                </div>
              );
            })
          }
        </div>

        {/* Text input */}
        <div className='send-message-container d-flex align-items-center justify-content-center'>
          <input value={messageText} onKeyDown={handleMessageOnKeyDown} onChange={(e) => setMessageText(e.target.value)} className='messageText' type='text' />
          <div onClick={handleSendMessage} className='send-message-wrapper'>
            <svg className='' width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 7.5L6.5 11.25L2.98003e-07 15L5.74075e-07 8.68421L5.35294 7.5L6.77602e-07 6.31579L9.53674e-07 -5.68248e-07L6.5 3.75L13 7.5Z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBox;