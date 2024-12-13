import APICall from "../utilities/APICall";

export default class PaymentService {
  static async initializeTransaction(payload){
    return await APICall(`${process.env.REACT_APP_BASE_URL}/payment/initialize`, 'POST', payload);
  }

  static async verifyTransaction(reference){
    return await APICall(`${process.env.REACT_APP_BASE_URL}/payment/verify/${reference}`, 'GET', {});
  }
}