import APICall from "../utilities/APICall";

export default class PaymentService {
  static baseUrl = "http://localhost:3001"

  static async initializeTransaction(payload){
    console.log(payload);
    return await APICall(`${this.baseUrl}/payment/initialize-transaction`, 'POST', payload);
  }
}