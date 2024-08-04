import { createContext, useContext, useReducer } from "react";
import {
  POSTAD_BEGINS,
  POSTAD_ERROR,
  POSTAD_SUCCESS,
  REGISTRATION_BEGINS,
  REGISTRATION_ERROR,
  REGISTRATION_SUCCESS,
  SET_CURRENT_USER,
} from "./Actions";
import reducer from "./Reducer";
import { displayAlert, refresh } from "../utilities/utils";
import UsersService from "../services/UsersService";

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const category = localStorage.getItem('category');
const location = localStorage.getItem('location');

const initialState = {
  isLoading: false,
  currentUser: currentUser ? currentUser : null,
  adPostedSuccessfully: false,
  triggerLogout: false,
  isError: false,
  activeCategory: category ? category : 'all',
  activeLocation: location ? location : 'all',
  secondUserId: null,
  currentChat: JSON.parse(localStorage.getItem('currentChat')) || null,
  hideChatBox: JSON.parse(localStorage.getItem('hideChatBox')) || false,
  filterModalIsOpen: false,
  toggleDropdown: false,
  // hideChatBox: true
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const saveUserToLocalStorage = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("currentUser");
  };

  const register = async ({ name, email, password, confirmPassword, phone, userType }) => {
    dispatch({ type: REGISTRATION_BEGINS });

    if (!name || !email || !password || !confirmPassword || !phone || !userType) {
      displayAlert("error", "Please fill all fields");
      return dispatch({ type: REGISTRATION_ERROR });
    }

    if (password !== confirmPassword) {
      displayAlert("error", "Passwords do not match");
      return dispatch({ type: REGISTRATION_ERROR });
    }

    try {
      const { data } = await UsersService.Register({ email, password, name, phone, userType });
      saveUserToLocalStorage(data);
      dispatch({ type: REGISTRATION_SUCCESS });
      dispatch({ type: SET_CURRENT_USER, payload: { ...data } });
      return displayAlert("success", "Registration Successful! Redirecting...");
    } catch (error) {
      displayAlert("error", error.response.data.message);
      return dispatch({ type: REGISTRATION_ERROR });
    }
  };

  const login = async ({ email, password }) => {
    dispatch({ type: REGISTRATION_BEGINS });

    if (!email || !password) {
      displayAlert("error", "Please fill all the fields");
      return dispatch({ type: REGISTRATION_ERROR });
    }

    try {
      const { data } = await UsersService.Login({ email, password });
      saveUserToLocalStorage(data);
      dispatch({ type: REGISTRATION_SUCCESS });
      dispatch({ type: SET_CURRENT_USER, payload: { ...data } });
      displayAlert("success", "Login Successful! Redirecting...");
    } catch (error) {
      displayAlert("error", error.response.data.message);
      return dispatch({ type: REGISTRATION_ERROR });
    }
  };

  const postAd = async ({ category, description, price, condition, name, location, images }) => {
    dispatch({ type: POSTAD_BEGINS });
    if (!category || !description || !price || !condition || !name || !location || images.length < 1) {
      displayAlert("error", "Please fill all required fields");
      return dispatch({ type: POSTAD_ERROR, payload: { status: true } });
    }

    try {
      // const { data } = await UsersService.PostAd({
      await UsersService.PostAd({
        category, description, price, condition, name, location, images,
      });
      dispatch({ type: POSTAD_SUCCESS, payload: { status: true } });
      // displayAlert("success", data.message);
      displayAlert("success", "Ads Posted Successfully");
    } 
    catch (error) {
      if (error.response && (error.response.status === 500 || error.response.status === 403)) {
        dispatch({ type: POSTAD_ERROR, payload: { status: true } });
        displayAlert("error", "Not authorized");
        removeUserFromLocalStorage();
        refresh();
        return;
      }
      dispatch({ type: POSTAD_ERROR, payload: { status: false } });
      displayAlert("error", error.response.data.message);
    }
  };

  const value = {
    ...state,
    initialState,
    register,
    login,
    dispatch,
    postAd,
    removeUserFromLocalStorage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
