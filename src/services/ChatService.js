import APICall from "../utilities/APICall"

export default class ChatService {
  static getUserChats = async (userId) => {
    return APICall(`${process.env.REACT_APP_BASE_URL}/chat/${userId}`, 'GET');
  }

  static getMessages = async (chatId, user1, user2) => {
    return APICall(`${process.env.REACT_APP_BASE_URL}/chat/${chatId}/messages/${user1}/${user2}`, 'GET');
  }

  static sendMessage = async (body) => {
    return APICall(`${process.env.REACT_APP_BASE_URL}/chat/${body.chatId}/send-message`, 'POST', body);
  }

  static initiateChat = async (body) => {
    return APICall(`${process.env.REACT_APP_BASE_URL}/chat/initiate-chat`, 'POST', body)
  }

  static secondChatParticipant = async (secondParticipantId) => {
    return APICall(`${process.env.REACT_APP_BASE_URL}/auth/secondParticipantId/${secondParticipantId}`, "GET")
  }

}