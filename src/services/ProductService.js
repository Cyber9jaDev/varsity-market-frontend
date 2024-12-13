import APICall from "../utilities/APICall";

export default class ProductService {
  static GetProducts = async (category, location, { price, page, limit, orderBy, dateFrom, dateTo, searchText }) => {
    let url = `${process.env.REACT_APP_BASE_URL}/products?page=${page}&limit=${limit}&category=${category}&location=${location}&dateFrom=${dateFrom}&dateTo=${dateTo}&orderBy=${orderBy}&searchText=${searchText}&minPrice=${price.min}&maxPrice=${price.max}`;
    return await APICall(url, 'GET');
  }

  static ProductPreview = async (id) => {
    return await APICall(`${process.env.REACT_APP_BASE_URL}/products/${id}`, 'GET');
  }
}