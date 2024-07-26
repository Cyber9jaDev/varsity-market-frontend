import React, { useEffect, useRef, useState } from 'react';
import './styles/chat.scss';
import Conversation from '../components/Conversation';
import ChatBox from '../components/ChatBox';
import ChatService from '../services/ChatService';
import { useAppContext } from '../contexts/AppContext';
import { io } from 'socket.io-client';

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

const Chat = () => {
  const [ messages, setMessages ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ chats, setChats ] = useState([]);
  const [ hasError, setHasError ] = useState(false);
  const { currentChat, hideChatBox } = useAppContext();
  const [ onlineUsers, setOnlineUsers ] = useState([]);
  const [ messageToSocketServer, setMessageToSocketServer ] = useState(null);
  const [ messageFromSocketServer, setMessageFromSocketServer ] = useState(null);
  const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
  // const [ hideChatBox, setHideChatBox ] = useState(true);
  const socket = useRef();


  // handle window width on resize
  useEffect(() => {
    function handleWindowResize(){ setWindowWidth(window.innerWidth) }
    window.addEventListener('resize', handleWindowResize);
    return () => { window.removeEventListener('resize', handleWindowResize) }
  }, []);

  useEffect(() => {
    // socket.current = io();
    socket.current = io('http://localhost:5050');
    socket.current.emit('add-new-user', currentUser.userId);
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);
    });
  }, [currentUser, messageToSocketServer, messageFromSocketServer]);

  // Send Message to socket server
  useEffect(() => {
    if(messageToSocketServer !== null){
      socket.current.emit('send-message', messageToSocketServer);
    }
  }, [messageToSocketServer]);

  // receive message from socket server
  useEffect(() => {
    socket.current.on('receive-message', (data) => {
      setMessageFromSocketServer(data);
    })    
  }, []);

  useEffect(() => {
    const getUserChats = async() => {
      setIsLoading(true);
      setHasError(false);
      try {
        const { data } = await ChatService.getUserChats(currentUser.userId);
        setChats(data);
      } 
      catch (error) {
        console.log(error);
        setHasError(true);
      }
      setIsLoading(false);
    }
    if(currentUser !== null){
      getUserChats();
    }
  }, []);

  return (
    <main id='main-chat-wrapper'>
      { !isLoading && chats.length === 0 ? <div className="empty-chat"><h1>Your chat list is empty </h1></div> :
        <div id='chat'>
          <div className="chat-container">
            
            <div className={`conversation px-3 ${ windowWidth <= 768 && hideChatBox === true ? null : 'hide' }`}>
              <h4 className='fs-4'>Chats</h4>
              <div className="search-container d-flex align-items-center w-100 my-3">
              <i className="fa-solid fa-magnifying-glass ps-2"></i>
                <input placeholder='Search messages or users' className='search w-100 px-3 py-2' type="search" name="search-chat" id="search-chat" />
              </div>
              { 
                <div className="conversation-wrapper mt-4">
                  { !isLoading && hasError === false && chats.map((chat) => 
                    <Conversation key={chat._id}
                      socket={socket} 
                      chat={chat} 
                      currentUser={currentUser} 
                      onlineUsers={onlineUsers} 
                      // setHideChatBox={setHideChatBox}
                    />
                  )}
                </div>
              }
            </div>
            
            <div className={`chat-box-container ${ windowWidth <= 768 && hideChatBox === false ? null : 'hide' }`}>
              { !isLoading && currentChat === null 
                  ? <div className='null-chat'><h1>You have no active chat</h1></div> 
                  : <ChatBox 
                      // setHideChatBox={setHideChatBox} 
                      messages={messages} 
                      setMessages={setMessages} 
                      setMessageToSocketServer={setMessageToSocketServer} 
                      messageFromSocketServer={messageFromSocketServer} 
                      currentUser={currentUser} 
                      windowWidth={windowWidth}
                    />
              }
            </div>
            
          </div>
        </div>
      }
    </main>
  );
}

export default Chat;