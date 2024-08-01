import React, { useEffect, useState } from "react";
import "./styles/post-ad.scss";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { categories, displayAlert, refresh } from "../utilities/utils";
import FormRow from "../components/FormRow";
import { useAppContext } from "../contexts/AppContext";
import { POSTAD_SUCCESS } from "../contexts/Actions";
import schools from "../utilities/schools";

const PostAd = () => {
  const { postAd, adPostedSuccessfully, adPostFailed, removeUserFromLocalStorage, dispatch, isLoading } = useAppContext();

  const [values, setValues] = useState({
    name: "",
    price: 0,
    description: "",
    location: "",
    condition: "",
    category: "",
    defaultCategory: { value: 'PHONE', label: 'Mobile Phones' },
    defaultSchool: { value: "UI", label: "University of Ibadan" }
  });
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const handleImage = (e) => {
    const files = [...e.target.files];
    convertImageToBase64(files);
  };

  const convertImageToBase64 = (files) => {
    files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return (reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result]);
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.price > 9000000) {
      return displayAlert('error', 'Price cannot exceed 9 million naira');
    }
    return postAd({ ...values, images });
  };


  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (adPostedSuccessfully) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }

    return () => {
      dispatch({ type: POSTAD_SUCCESS, payload: { status: false } });
    };
  }, [adPostedSuccessfully, navigate, dispatch]);

  useEffect(() => {
    if (adPostFailed) {
      removeUserFromLocalStorage();
      refresh();
    }
  }, [adPostFailed, removeUserFromLocalStorage]);

  const style = {
    input: (provided, state) => ({
      ...provided,
      // padding: '30px 5px',
      height: '35px',
      outline: state.isSelected ? 'none' : 'none',
      // border: 'none !important',
      border: state.isSelected ? 'none' : 'none',
    }),
  }

  return (
    <section id="post-ad">
      <div className="post-ad-wrapper">

        <form className="form-control" onSubmit={handleSubmit}>
          <div className="header-text-wrapper">
            <h3 className="header-text">Post an ad</h3>
          </div>

          <FormRow field="input" handleChange={handleChange} type="text" name="name" label="Title" placeholder="HP, Toyota e.t.c" />
          <div className="form-group">
            <label htmlFor="category"> {" "} Category<span className="asterisk">*</span></label>
            <Select styles={style} defaultValue={values.defaultCategory} onChange={(e) => setValues((prev) => ({ ...prev, category: e.value }))} isSearchable options={categories.slice(1)} />
          </div>
          <FormRow field="input" handleChange={handleChange} name="price" type="number" label="Price(N)" price={values.price} />
          <div className="form-group">
            <label htmlFor="condition">Condition</label>
            <select name="condition" id="condition">
              <option value="NEW">New</option>
              <option value="USED">Used</option>
              <option value="REFURBISHED">Refurbished</option>
            </select>
          </div>
          <FormRow field="file" handleChange={handleImage} name="photos" label="Product Photos" />
          <div className="form-group">
            <label htmlFor="location"> {" "} Location<span className="asterisk">*</span></label>
            <Select styles={style} isSearchable options={schools.slice(1)} defaultValue={schools[0]} onChange={(e) => setValues((prev) => ({ ...prev, school: e.value }))} />
          </div>
          <FormRow field="textarea" handleChange={handleChange} id="description" name="description" label="Product Description" placeholder="Briefly describe your product" />
          <div className="submit-btn-wrapper">
            <button disabled={isLoading} className="button">{isLoading ? 'Loading...' : 'Post ad'}</button>
          </div>

        </form>
      </div>
    </section>
  );
};

export default PostAd;
