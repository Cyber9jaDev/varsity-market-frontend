import axios from "axios";

export default async function APICall(url, method, data){
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null ;
  
  if(currentUser){
    axios.defaults.headers.common['Authorization'] = `Bearer ${currentUser.token}`;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
  }

  let response = await axios({ method: method, url: url, data: data });

  return !response ? null : response.data ? response : { status : 'success' }

}