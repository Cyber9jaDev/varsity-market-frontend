import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import "./styles/product.scss";
import Pagination from "../components/Pagination";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { categories, findCategory, findCategoryLabel, findSchool } from "../utilities/utils";
import schools from "../utilities/schools";
import RangeSlider from "react-range-slider-input";
import ProductService from "../services/ProductService";
import { useAppContext } from "../contexts/AppContext";
import { OPEN_FILTER_MODAL } from "../contexts/Actions";
import formatNaira from "format-to-naira";
import sortBy from "../utilities/sortby";
import Empty from "../components/Empty";
import Loading from "../components/Loading";
import Error from "../components/Error";

const dateHandler = () => {
  let today = new Date();
  today.setDate(today.getDate() + 1);
  return today.toISOString().split('T')[0];
}
const tomorrow = dateHandler();

const Product = () => {
  const defaultSort = { label: 'Price: Low to High', value: 'ascending' };
  const { category } = useParams();
  const { dispatch, activeCategory, activeSchool, filterModalIsOpen } = useAppContext();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('list');
  const [values, setValues] = useState({
    minPrice: 10, maxPrice: 9000000,
    products: [], sortBy: 'ascending',
    defaultCategory: { label: "All Ads", value: "all" },
    defaultSchool: { label: 'All Schools', value: 'all' },
    page: 1, pageSize: 4, totalPages: null,
    dateFrom: localStorage.getItem('dateFrom') || '2020-03-01',
    dateTo: localStorage.getItem('dateTo') || tomorrow,
    searchText: localStorage.getItem('searchText') || ''
  });

  // Handle screen resize / width
  useEffect(() => {
    function handleScreenResize() { setScreenWidth(screenWidth) }
    window.addEventListener('resize', handleScreenResize);
    return () => { window.removeEventListener('resize', handleScreenResize) }
  }, []);

  // Get all the filters 
  const getProducts = async () => {
    // dispatch({ type: FIND_BY_CATEGORY_BEGINS });
    setHasError(false);
    setIsLoading(true);
    try {
      // For Mobile Screen
      if (screenWidth < 992 && filterModalIsOpen === true) {
        dispatch({ type: OPEN_FILTER_MODAL, payload: { value: false } });
      }
      const { data } = await ProductService.GetProducts({
        category: activeCategory, school: activeSchool, minPrice: values.minPrice, maxPrice: values.maxPrice,
        page: values.page, pageSize: values.pageSize, sortBy: values.sortBy,
        dateFrom: Date.parse(values.dateFrom),
        dateTo: Date.parse(values.dateTo),
        searchText: values.searchText
      });

      if (data) {
        setValues((prev) => ({ ...prev, products: data.products, totalPages: data.totalPages }));
        // dispatch({ type: FIND_BY_CATEGORY_SUCCESS });
      }
    } catch (error) {
      setHasError(true);
      // displayAlert("error", error.response.data.message);
      // dispatch({ type: FIND_BY_CATEGORY_ERROR });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [values.page]);

  useEffect(() => {
    updateFilter();
  }, [values.searchText])

  const updateFilter = (value, type) => {
    if (type === 'school') {
      return localStorage.setItem("school", value)
    }
    else if (type === 'category') {
      return localStorage.setItem("category", value);
    }
    else if (type === 'price') {
      return setValues((prev) => ({ ...prev, minPrice: value[0], maxPrice: value[1] }));
    }
    else if (type === 'sort') {
      return setValues((prev) => ({ ...prev, sortBy: value }));
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
    <>
      <section className="container-fluid" id="products">
        <div className="container">
          {filterModalIsOpen === false &&
            <div className="border d-block p-2">
              <p className="category-label d-inline-block m-0 me-2 fs-5"> Categories </p>
              <p className="d-inline-block m-0 me-2 fs-5"> / </p>
              <p className="category-label d-inline-block m-0 fs-5">{findCategoryLabel(activeCategory, values)} </p>
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
                        <label htmlFor="school"> Select your school to see local ads</label>
                        <Select isSearchable options={schools} defaultValue={() => findSchool(activeSchool, values)} onChange={(e) => { updateFilter(e.value, 'school') }} />
                      </div>
                    </div>
                    <div className="col-12 my-3">
                      <div className="form-group">
                        <label htmlFor="school">Browse Categories</label>
                        <Select isSearchable options={categories} defaultValue={() => findCategory(activeCategory)} onChange={(e) => { updateFilter(e.value, 'category') }} />
                      </div>
                    </div>
                    <div className="col-12 my-3">
                      <label className="d-block"> Sort By <span> :</span>{" "} </label>
                      <Select defaultValue={defaultSort} options={sortBy} onChange={(e) => { updateFilter(e.value, 'sort') }} />
                    </div>
                    <div className="col-12 my-3">
                      <div className="form-group">
                        <label htmlFor="price" className="w-100 d-flex">
                          <span style={{ width: '40%', fontWeight: '600' }}>{formatNaira(values.minPrice)}</span>{" "}
                          <span className="mx-2 text-center" style={{ width: '10%' }}> - </span>
                          <span className="text-end" style={{ width: '40%', fontWeight: '600' }}>{formatNaira(values.maxPrice)}</span>{" "}
                        </label>
                        <div className="mt-3 range-slider-wrapper">
                          <RangeSlider id='price' className='range-slider' step={20000} onInput={(e) => updateFilter(e, 'price')} defaultValue={[values.minPrice, values.maxPrice]} min={0} max={9000000} />
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
                      {values.products?.map(product => <ProductCard view={view} category={category} key={product._id} {...product} />)}
                    </div>
                  </div>
                }
                {/* Pagination */}
                {hasError === false && values.products?.length >= 1 &&
                  <div className="container mt-3">
                    <Pagination {...values} setValues={setValues} />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
