import APICall from "../utilities/APICall";

export default class ProductService {

  static GetProducts = async (category, location, { price, page, pageSize, sortBy, dateFrom, dateTo, searchText }) => {
    const minPrice = price.min;
    const maxPrice = price.max;
    const dateFrom_ = Date.parse(dateFrom);
    const dateTo_ = Date.parse(dateTo);

    let url =`/product?page=${page}&category=${category}&location=${location}&pageSize=${pageSize}&dateFrom=${dateFrom_}&dateTo=${dateTo_}&sortBy=${sortBy}&searchText=${searchText}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    return await APICall(url, 'GET');
  }

  static ProductPreview = async (category, id) => {
    const url = `/api/${category}/${id}`;
    return await APICall(url, 'GET')
  }


}