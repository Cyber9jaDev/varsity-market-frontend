import APICall from "../utilities/APICall";

export default class UsersService {
  // static Registration_key = async (payload) => {
  //   return await APICall('/auth/registration-key', 'POST', payload)
  // }

  static Register = async (payload) => {
    const userType = payload?.userType;
    delete payload.userType;
    return await APICall(`/auth/signup/${userType}`, 'POST', payload);
  }

  static Login = async (payload) => {
    return await APICall('/auth/signin', 'POST', payload);
  }

  static PostAd = async ({ category, description, price, condition, name, location, images }) => {
    console.log(images);
    let formData = new FormData();
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('condition', condition);
    formData.append('name', name);
    formData.append('location', location);

    for (let i = 0; i < images.length; i++) {
      formData.append('productImages', images[i]);
    }

    return await APICall('/product', 'POST', formData);
    
  }

  static getUser = async (userId) => {
    return await APICall(`api/user/${userId}`, 'GET');
  }

  static getUserAds = async (userId) => {
    return await APICall(`api/user-ads/id/${userId}`, 'GET');
  }

  static deleteAd = async (productId) => {
    return await APICall(`api/user-ads/id/${productId}`, 'DELETE')
  }

  static uploadProfilePicture = async (userId, payload) => {
    return await APICall(`api/upload-profile-picture/${userId}`, 'PATCH', payload);
  }

  static updateUserProfile = async (payload) => {
    return await APICall('api/update-user-info', 'PATCH', payload);
  }
}