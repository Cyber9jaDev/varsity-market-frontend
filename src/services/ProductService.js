import APICall from "../utilities/APICall";

export default class ProductService {
  static baseUrl = "http://localhost:3001"

  static GetProducts = async (category, location, { price, page, limit, orderBy, dateFrom, dateTo, searchText }) => {
    let url = `${this.baseUrl}/product?page=${page}&limit=${limit}&category=${category}&location=${location}&dateFrom=${Date.parse(dateFrom)}&dateTo=${Date.parse(dateTo)}&orderBy=${orderBy}&searchText=${searchText}&minPrice=${price.min}&maxPrice=${price.max}`;
    return await APICall(url, 'GET');
  }

  static ProductPreview = async (id) => {
    return await APICall(`${this.baseUrl}/product/${id}`, 'GET')
  }


}