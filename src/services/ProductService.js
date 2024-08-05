import APICall from "../utilities/APICall";

export default class ProductService {

  static GetProducts = async ({ category, school, minPrice, maxPrice, page, pageSize, sortBy, dateFrom, dateTo, searchText }) => {
    // let url = `/api/category/${category}/${school}?page=${page}&pageSize=${pageSize}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
    // if(minPrice){ url = `${url}&minPrice=${minPrice}` } 
    // if(maxPrice){ url = `${url}&maxPrice=${maxPrice}` }
    // if(sortBy){ url = `${url}&sortBy=${sortBy}`}
    // if(searchText){ url=`${url}&searchText=${searchText}`}

    return await APICall('/product', 'GET');
    // return await APICall(url, 'GET');
  }

  static ProductPreview = async (category, id) => {
    const url = `/api/${category}/${id}`;
    return await APICall(url, 'GET')
  }


}