import axios from "axios";
import Constants from "./Constants";
import { displayAlert } from "./utility";


export default async function APICall(Url, Method, Data = null, timeoutOverride, silent) {
  if (localStorage.getItem("currentUser")) {
    const currentUser = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${currentUser.token}`;
    axios.defaults.headers.common["Content-Type"] = `application/json`;
  }

  axios.defaults.withCredentials = true;
  axios.interceptors.response.use(
    (response) => {
      if (response?.data?.authorization) {
        localStorage.setItem("token", response.data.authorization);
      }
      return response;
    },
    (error) => {
      return error.response;

    }
  );

  let baseUrl = Constants.apiBaseUrl;
  if (!baseUrl.endsWith("/")) {
    baseUrl = baseUrl + "/";
  }

  if (Url.startsWith("/")) {
    Url = Url.substring(1);
  }

  let response = await axios({
    method: Method,
    url: baseUrl + Url.trim(),
    data: Data,
    timeout: timeoutOverride || process.env.REACT_APP_REQUEST_TIMEOUT,
  })

  if (response) {
    if (!response.status || response.status === 0) {
      if (!silent) displayAlert("error", "Sorry it seems you are not connected to internet. Please check you network connection and try again");
      return null;
    }
    if (response.status === 401 || response.statusText === "Unauthorized") {
      localStorage.clear();
      window.location.href = "/login";
      return null;
    }
    if (response.status >= 400 && response.status < 500) {
      let message = "Sorry your request is invalid. please check your request and try again";
      if (response.data) {
        if (response.data.title) {
          message = `${response.data.title} : ${response.data.details}`;
        } else {
          message = response.data
        }
      }
      if (!silent) displayAlert("warning", message);
      return null;
    }
    if (response.status >= 500) {
      let message = "Sorry your request cannot be processed at this moment please try again later";
      if (response.data) {
        message = `${response.data.title} : ${response.data.details ?? ''}`;
      }
      if (!silent) displayAlert("error", message);
      return null;
    }

  }
  else {
    if (!silent) {
      displayAlert(
        "error",
        "Your request generated an error. Please check your network connection"
      );
    }
  }
  return !response ? null : response.data ? response.data : { status: "succes" };
}
