import APICall from "../utilities/APICall";

export default class UsersService{
  static Register = async (payload) => {
    return await APICall('/api/register', 'POST', payload)
  }

  static Login = async (payload) => {
    return await APICall('/api/login', 'POST', payload);
  }

  static PostAd = async (payload) => {
    return await APICall('/api/post-ad', 'POST', payload);
  }

  static getUser = async (userId) => {
    return await APICall(`api/user/${userId}`, 'GET');
  }

  static getUserAds = async (userId) => {
    return await APICall(`api/user-ads/id/${userId}`, 'GET');
  }

  static deleteAd = async (productId) => {
    return await APICall (`api/user-ads/id/${productId}`, 'DELETE')
  }

  static uploadProfilePicture = async (userId, payload) => {
    return await APICall(`api/upload-profile-picture/${userId}`, 'PATCH', payload);
  }

  static updateUserProfile = async(payload) => {
    return await APICall('api/update-user-info', 'PATCH', payload );
  }
}