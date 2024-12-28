import APICall from "../utilities/APICall";

export default class UsersService {
  static Register = async (payload) => {
    const userType = payload?.userType;
    delete payload.userType;
    return await APICall(`${process.env.REACT_APP_BASE_URL}/auth/signup/${userType}`, 'POST', payload);
  }

  static Login = async (payload) => {
    // return await APICall(`${process.env.REACT_APP_BASE_URL}/auth/signin`, 'POST', payload);
    return await APICall(`${process.env.REACT_APP_BASE_URL}/auth/signin`, 'POST', payload);
  }

  static PostAd = async ({ category, description, price, condition, name, location, quantity, images }) => {
    let formData = new FormData();
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('condition', condition);
    formData.append('name', name);
    formData.append('location', location);
    formData.append('quantity', quantity);

    for (let i = 0; i < images.length; i++) {
      formData.append('productImages', images[i]);
    }
    return await APICall(`${process.env.REACT_APP_BASE_URL}/products/add-product`, 'POST', formData);
  }

  static getUser = async (userId) => {
    return await APICall(`${process.env.REACT_APP_BASE_URL}/user/${userId}`, 'GET');
  }

  static getUserAds = async (userId) => {
    return await APICall(`${process.env.REACT_APP_BASE_URL}/products/user-ads/${userId}`, 'GET');
  }

  static deleteAd = async (productId) => {
    return await APICall(`${process.env.REACT_APP_BASE_URL}/products/delete/${productId}`, 'DELETE')
  }

  static uploadProfilePicture = async (file) => {
    let formData = new FormData();
    formData.append("profilePicture", file)
    return await APICall(`${process.env.REACT_APP_LOCAL_HOST}/user/upload/profile-picture`, 'PATCH', formData);
  }

  static updateUserProfile = async (payload) => {
    return await APICall(`${process.env.REACT_APP_BASE_URL}api/update-user-info`, 'PATCH', payload);
  }
}