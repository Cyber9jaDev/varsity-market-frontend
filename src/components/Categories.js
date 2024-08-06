import React from "react";
import { Link } from "react-router-dom";
import "./styles/categories.scss";
import { categories } from "../utilities/utils";
import { useAppContext } from "../contexts/AppContext";
import { SET_ACTIVE_CATEGORY } from "../contexts/Actions";

const Categories = () => {
  const { dispatch } = useAppContext();

  const updateCategory = (value) => {
    console.log(value);
    localStorage.setItem("category", value);
    dispatch({ type: SET_ACTIVE_CATEGORY, payload: { value } });
  };

  return (
    <section id="categories-section">
      <div id="categories">
        <div className="categories-wrapper">
          {categories.map(({ value, label, icon }, index) => {
            return (
              <div key={index} className="category-container">
                <Link onClick={() => { updateCategory(value) }} to="/products" className="category-link">
                  <div className={`icon-container ${value.toLowerCase()}`}>
                    <i className={`${icon} icon`}></i>
                  </div>
                  <h3 className="category-title">{label}</h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
