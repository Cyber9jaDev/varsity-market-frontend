import APICall from "../utilities/APICall"

export default class ChatService {
  static getUserChats = async (userId) => {
    return APICall(`/api/chat/find/${userId}`, 'GET');
  }

  static getMessages = async (chatId) => {
    return APICall(`/api/message/find/${chatId}`, 'GET');
  }

  static sendMessage = async (body) => {
    return APICall(`/api/message/send-message`, 'POST', body);
  }

  static initiateChat = async (body) => {
    return APICall('/chat/initiate-chat', 'POST', body)
  }

}