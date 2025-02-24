import APICall from "../utilities/APICall";

export default class PaymentService {
  static baseUrl = "https://sore-deborah-cyber9ja-1bb31953.koyeb.app";

  static async initializeTransaction(payload){
    return await APICall(`${this.baseUrl}/payment/initialize`, 'POST', payload);
  }

  static async verifyTransaction(reference){
    return await APICall(`${this.baseUrl}/payment/verify/${reference}`, 'GET', {});
  }
}