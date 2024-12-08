import APICall from "../utilities/APICall";

export default class PaymentService {
  static baseUrl = "http://localhost:3001"

  static async initializeTransaction(payload){
    return await APICall(`${this.baseUrl}/payment/initialize`, 'POST', payload);
  }

  static async verifyTransaction(){
    return await APICall(`${this.baseUrl}/payment/initialize`, 'GET', {});
  }
}