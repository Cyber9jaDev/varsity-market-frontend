import React from "react";
import formatNaira from "format-to-naira";
import { Link } from "react-router-dom";
import image from "../assets/d7.jpg";
import { categories, convertDate, findSchoolByCode } from "../utilities/utils";

const ProductCard = ({ school, createdAt, category, images, price, name, _id, view }) => {
  
  const findLabel = (category) => {
    const item = categories.find((c) => c.value === category);
    return item.label;
  };

  return (
    <Link to={`/${category}/${_id}`} className={`${view === 'list' ? 'list-view-container' : 'grid-view-container'} text-decoration-none`}>
      <div className={`py-2 ${view === 'list' ? 'list-view-wrapper' : 'grid-view-wrapper'}`}>
        <div className={`${view === 'list' ? 'list-view-image-container' : 'grid-view-image-container'}`}>
          <div className={`${view === 'list' ? 'list-view-image-wrapper' : 'grid-view-image-wrapper'}`}>
            <img className={`${ view === 'list' ? 'list-view-product-image' : 'grid-view-product-image'}`} src={images ? images[0].url : image} alt="img"/>
          </div>
        </div>
        <div className={`${view === 'list' ? 'list-view-product-details-wrapper' : 'grid-view-product-details-wrapper'}`}>
          <h2 className={`${view === 'list' ? 'list-view-product-name' : 'grid-view-product-name'}`}>{ name }</h2>
          <span  className={`${view === 'list' ? 'list-view-product-price' : 'grid-view-product-price'}`}>{formatNaira(price)}</span>
          <span  className={`${view === 'list' ? 'list-view-product-school' : 'grid-view-product-school'}`}><i className="fa-solid fa-location-dot location-icon pe-1"></i> { school === 'all' ? 'All Schools' : findSchoolByCode(school) }</span>
        </div>
        <div className={`${view === 'list' ? 'list-view-product-date-wrapper' : 'grid-view-product-date-wrapper'}`}>
          <p  className={`${view === 'list' ? 'list-view-product-date' : 'grid-view-product-date'}`}>{convertDate(createdAt).date}</p>
          <p  className={`${view === 'list' ? 'list-view-product-category' : 'grid-view-product-category'}`}>{findLabel(category)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
