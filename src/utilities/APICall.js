import axios from "axios";
import { displayAlert } from "./utils";

export default async function APICall(url, method, data) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

  if (currentUser) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${currentUser.token}`;
    // axios.defaults.headers.common['Content-Type'] = 'application/json';
    // axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
  }

  let response = await axios({ method, url, data });

  console.log(url);

  if(response){
    if (!response.status || response.status === 0) {
      displayAlert("error", "Sorry it seems you are not connected to internet. Please check you network connection and try again");
      return null;
    }

    if (response.status === 401 || response.status === 403 || response.statusText === "Unauthorized") {
      localStorage.clear();
      window.location.href = "/login";
      return null;
    }
  }

  return !response ? null : response.data ? response : { status: 'success' }

}