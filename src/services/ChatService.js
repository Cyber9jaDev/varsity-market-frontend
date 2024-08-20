import APICall from "../utilities/APICall"

export default class ChatService {

  static baseUrl = "http://localhost:3001"

  static getUserChats = async (userId) => {
    return APICall(`${this.baseUrl}/chat/${userId}`, 'GET');
  }

  static getMessages = async (chatId, user1, user2) => {
    return APICall(`${this.baseUrl}/chat/${chatId}/messages/${user1}/${user2}`, 'GET');
  }

  static sendMessage = async (body) => {
    return APICall(`${this.baseUrl}/chat/${body.chatId}/send-message`, 'POST', body);
  }

  static initiateChat = async (body) => {
    return APICall(`${this.baseUrl}/chat/initiate-chat`, 'POST', body)
  }

  static secondChatParticipant = async (secondParticipantId) => {
    return APICall(`${this.baseUrl}/auth/secondParticipantId/${secondParticipantId}`, "GET")
  }

}