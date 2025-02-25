import APICall from "../utilities/APICall";

export default class UsersService {
  static baseUrl = "https://sore-deborah-cyber9ja-1bb31953.koyeb.app";
  // static localHost = "http://localhost:3001";


  static Register = async (payload) => {
    const userType = payload?.userType;
    delete payload.userType;
    return await APICall(`${this.baseUrl}/auth/signup/${userType}`, 'POST', payload);
  }

  static Login = async (payload) => {
    return await APICall(`${this.baseUrl}/auth/signin`, 'POST', payload);
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
    return await APICall(`${this.baseUrl}/products/add-product`, 'POST', formData);
  }

  static getUser = async (userId) => {
    return await APICall(`${this.baseUrl}/user/${userId}`, 'GET');
  }

  static getUserAds = async (userId) => {
    return await APICall(`${this.baseUrl}/products/user-ads/${userId}`, 'GET');
  }

  static deleteAd = async (productId) => {
    return await APICall(`${this.baseUrl}/products/delete/${productId}`, 'DELETE')
  }

  static uploadProfilePicture = async (file) => {
    let formData = new FormData();
    formData.append("profilePicture", file)
    return await APICall(`${this.baseUrl}/user/upload/picture`, 'PATCH', formData);
  }

  static updateProfile = async (id, payload) => {
    return await APICall(`${this.baseUrl}/user/update/${id}`, 'PUT', payload);
  }
}