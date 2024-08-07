import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import "./styles/product.scss";
import Pagination from "../components/Pagination";
import { categories, displayAlert, findCategoryLabel, orderBy } from "../utilities/utils";
import schools from "../utilities/schools";
import RangeSlider from "react-range-slider-input";
import ProductService from "../services/ProductService";
import { useAppContext } from "../contexts/AppContext";
import { FIND_BY_CATEGORY_BEGINS, FIND_BY_CATEGORY_ERROR, FIND_BY_CATEGORY_SUCCESS, OPEN_FILTER_MODAL } from "../contexts/Actions";
import formatNaira from "format-to-naira";
import Empty from "../components/Empty";
import Loading from "../components/Loading";
import Error from "../components/Error";

const dateHandler = () => {
  let today = new Date();
  today.setDate(today.getDate() + 1);
  return today.toISOString().split('T')[0];
}
const tomorrow = dateHandler();
const price = localStorage.getItem("price");

const Product = () => {
  const {
    dispatch,
    location,
    category,
    filterModalIsOpen
  } = useAppContext();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('list');
  const [values, setValues] = useState({
    price: (price !== null && price !== 'undefined') ? { min: price.split(',')[0], max: price.split(',')[1] } : { min: 10, max: 9000000 },
    orderBy: localStorage.getItem("orderBy") || 'asc',
    page: 1,
    limit: 8,
    totalPages: null,
    dateFrom: localStorage.getItem('dateFrom') || '2020-03-01',
    dateTo: localStorage.getItem('dateTo') || tomorrow,
    searchText: localStorage.getItem('searchText') || ''
  });
  const [products, setProducts] = useState([]);

  // Handle screen resize / width
  useEffect(() => {
    function handleScreenResize() { setScreenWidth(screenWidth) }
    window.addEventListener('resize', handleScreenResize);
    return () => { window.removeEventListener('resize', handleScreenResize) }
  }, [screenWidth]);

  // Get all the filters 
  const getProducts = async () => {
    dispatch({ type: FIND_BY_CATEGORY_BEGINS });
    setHasError(false);
    setIsLoading(true);
    try {
      // For Mobile Screen
      if (screenWidth < 992 && filterModalIsOpen === true) {
        dispatch({ type: OPEN_FILTER_MODAL, payload: { value: false } });
      }

      const { data } = await ProductService.GetProducts(category, location, values)

      if (data) {
        setProducts([...data?.products]);
        setValues(prev => ({ ...prev, totalPages: data?.totalPages }))
        dispatch({ type: FIND_BY_CATEGORY_SUCCESS });
      }
      setHasError(false);
    }
    catch (error) {
      setHasError(true);
      displayAlert("error", error.response.data.message);
      dispatch({ type: FIND_BY_CATEGORY_ERROR });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [values.page]);

  useEffect(() => {
    updateFilter();
  }, [values.searchText]);

  const updateFilter = (value, type) => {
    if (type === 'location') {
      return localStorage.setItem("location", value)
    }
    else if (type === 'category') {
      return localStorage.setItem("category", value);
    }
    else if (type === 'price') {
      localStorage.setItem('price', value);
      return setValues((prev) => ({ ...prev, price: { min: value[0], max: value[1] } }));
    }
    else if (type === 'orderBy') {
      localStorage.setItem('orderBy', value)
    }
    else if (type === 'dateTo') {
      localStorage.setItem('dateTo', value)
    }
    else if (type === 'dateFrom') {
      localStorage.setItem('dateFrom', value)
    }
    else if (type === 'search') {
      localStorage.setItem('searchText', value)
    }
  }

  return (
    <section className="container-fluid" id="products">
      <div className="container">
        {filterModalIsOpen === false &&
          <div className="border d-block p-2">
            <p className="category-label d-inline-block m-0 me-2 fs-5"> Categories </p>
            <p className="d-inline-block m-0 me-2 fs-5"> / </p>
            <p className="category-label d-inline-block m-0 fs-5">{findCategoryLabel(category, values)} </p>
          </div>
        }
      </div>

      <div className="container pt-1 mt-3">
        <div className="row">
          {/* Left */}
          <div className={`col-sm-12 col-lg-3 mt-2 ${screenWidth < 992 && filterModalIsOpen ? 'filter-container' : 'hide'}`}>
            {screenWidth < 992 && filterModalIsOpen && <div className="arrow-icon-container py-2 mb-2 mt-1">
              <div className="arrow-icon-wrapper" onClick={() => { dispatch({ type: OPEN_FILTER_MODAL, payload: { value: false } }) }}>
                <i className="fa-solid fa-chevron-left arrow-icon"></i>
                <span className='my-auto fs-4'>back</span>
              </div>
            </div>
            }

            {/* Filter form */}

            <form className="form" onSubmit={getProducts}>
              <div className="container">
                <div className="row">
                  <div className="col-12 my-3">
                    <div className="form-group">
                      <label htmlFor="searchText"> Search for a specific product</label>
                      <div className="search-container">
                        <input defaultValue={values.searchText} onChange={(e) => updateFilter(e.target.value, 'search')} className="search-control" type="text" placeholder="e.g perfume, fragrance" name="search" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 my-3">
                    <div className="form-group">
                      <label htmlFor="dateFrom"> Date from: </label>
                      <input defaultValue={values.dateFrom} className="w-100 date-picker" type='date' onChange={(e) => updateFilter(e.target.value, 'dateFrom')} />
                    </div>
                  </div>
                  <div className="col-12 my-3">
                    <div className="form-group">
                      <label htmlFor="dateTo"> Date to: </label>
                      <input defaultValue={values.dateTo} className="w-100 date-picker" type='date' onChange={(e) => updateFilter(e.target.value, 'dateTo')} />
                    </div>
                  </div>
                  <div className="col-12 my-3">
                    <div className="form-group">
                      <label htmlFor="location"> Select your school to see local ads</label>
                      <select onChange={(e) => { updateFilter(e.target.value, 'location') }} name="location" id="location" defaultValue={location} className="w-100 py-2 border-0">
                        {schools.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 my-3">
                    <div className="form-group select">
                      <label htmlFor="category">Browse Categories</label>
                      <select onChange={(e) => { updateFilter(e.target.value, 'category') }} name="category" id="category" defaultValue={category} className="w-100 py-2 border-0">
                        {categories.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 my-3">
                    <label className="d-block"> Order By <span> :</span>{" "} </label>
                    <select onChange={(e) => { updateFilter(e.target.value, 'orderBy') }} name="orderBy" id="orderBy" defaultValue={values.orderBy} className="w-100 py-2 border-0">
                      {orderBy.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </div>
                  <div className="col-12 my-3">
                    <div className="form-group">
                      <label htmlFor="price" className="w-100 d-flex">
                        <span style={{ width: '40%', fontWeight: '600' }}>{formatNaira(values.price.min)}</span>{" "}
                        <span className="mx-2 text-center" style={{ width: '10%' }}> - </span>
                        <span className="text-end" style={{ width: '40%', fontWeight: '600' }}>{formatNaira(values.price.max)}</span>{" "}
                      </label>
                      <div className="mt-3 range-slider-wrapper">
                        <RangeSlider id='price' className='range-slider' step={20000} onInput={(e) => updateFilter(e, 'price')} defaultValue={[values.price.min, values.price.max]} min={1} max={10000000} />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 my-3">
                    <button className="search-btn" type="submit"> Apply Filter </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right */}
          <div className={`col-sm-12 col-lg-9 ${screenWidth < 992 && filterModalIsOpen === false ? '' : 'hide'}`}>
            {/* Views and Products */}
            <div className="container-fluid border h-100 py-3">
              {/* Views */}
              <div className="py-2">
                <div className="row">
                  <div className="col-6 d-flex align-items-center">
                    <label className="view-color fs-5">View: </label>
                    <span className="mx-3"><i onClick={() => setView('grid')} style={{ color: view === 'grid' ? 'green' : 'lightgrey' }} className="fa-solid fa-table-cells icon"></i></span>
                    {/* <span className="mx-3"><FontAwesomeIcon style={{color: view === 'grid' ? 'green' : 'lightgrey'}} onClick={() => setView('grid')} className="icon" icon={faTableCells} /></span> */}
                    {/* <span className=""><FontAwesomeIcon style={{color: view === 'list' ? 'green' : 'lightgrey'}} onClick={() => setView('list')} className="icon" icon={faList} /></span> */}
                    <span className=""><i onClick={() => setView('list')} style={{ color: view === 'list' ? 'green' : 'lightgrey' }} className="fa-solid fa-list icon"></i></span>
                  </div>

                  {/* Filter button for mobile screen */}
                  {screenWidth < 992 &&
                    <div className="col-6 d-flex justify-content-end">
                      <div className="filter-text-wrapper border px-3 py-1" onClick={() => {
                        dispatch({ type: OPEN_FILTER_MODAL, payload: { value: true } });
                      }}>
                        <span><i className="fa-solid fa-filter icon"></i></span>
                        <span className="filter-text ms-2 fs-4">Filter</span>
                      </div>
                    </div>
                  }
                </div>
              </div>
              {/* Products */}
              {isLoading === true ? <Loading /> : isLoading === false && hasError === true ? <Error /> :
                isLoading === false && hasError === false && values.products?.length === 0 ? <Empty /> : <div className="container mt-3">
                  <div className="row products-container">
                    {products?.map(product => <ProductCard view={view} category={category} key={product.id} {...product} />)}
                  </div>
                </div>
              }
              {/* Pagination */}
              {hasError === false && products?.length >= 1 &&
                <div className="container mt-3">
                  <Pagination {...values} setValues={setValues} />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
