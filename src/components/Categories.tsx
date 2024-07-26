"use client"

import React from "react";
import "./styles/categories.scss";
import { categories } from "../utilities/utils";
import { useAppContext } from "../contexts/AppContext";
import Link from "next/link";
import { SET_ACTIVE_CATEGORY } from "@/contexts/Actions";

const Categories = () => {
  // const { dispatch } = useAppContext();

  const updateCategory = (value: any) => {
    localStorage.setItem("category", value);
    // dispatch({ type: SET_ACTIVE_CATEGORY, payload: { value } });
  };

  return (
    <section id="categories-section">
      <div id="categories">
        <div className="categories-wrapper">
          {categories.map((category, index) => {
            return (
              <div
                onClick={() => {
                  updateCategory(category.value);
                }}
                key={index}
                className="category-container"
              >
                <Link href="/categories" className="category-link">
                  <div className={`icon-container ${category.value}`}>
                    <i className={`${category.icon} icon`}></i>
                  </div>
                  <h3 className="category-title">{category.label}</h3>
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
