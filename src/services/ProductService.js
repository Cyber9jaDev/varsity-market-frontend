import APICall from "../utilities/APICall";

export default class ProductService {

  static GetProducts = async (category, location, { price, page, limit, orderBy, dateFrom, dateTo, searchText }) => {
    let url = `/product?page=${page}&limit=${limit}&category=${category}&location=${location}&dateFrom=${Date.parse(dateFrom)}&dateTo=${Date.parse(dateTo)}&orderBy=${orderBy}&searchText=${searchText}&minPrice=${price.min}&maxPrice=${price.max}`;
    return await APICall(url, 'GET');
  }

  static ProductPreview = async (category, id) => {
    const url = `/api/${category}/${id}`;
    return await APICall(url, 'GET')
  }


}