import { GLOBAL_URL } from "./constant";
import axios from "axios";
import configureStore from "app/Redux/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const httpClient = axios.create({
  baseURL: `${GLOBAL_URL}/api/`,
});
// const httpClientJW = axios.create({
//   baseURL: `https://justoworks.co.in/`,
// });

const httpClientJW = axios.create({
  baseURL: `http://demoapi.justoworks.co.in/`,
});
const httpClientJWDemo = axios.create({
  baseURL: `http://demoapi.justoworks.co.in/`,
});


export function setDefaultHeader(header: any, value: any) {
  httpClient.defaults.headers.common[header] = value;
}


export async function apiCall(
  method: any,
  url: any,
  data: any,
  header = { "Content-Type": "application/json", "access-control-allow-origin": "*" }
) {
  // console.log('url: ', url);
  // console.log('data: ', data);
  // console.log('method: ', method);
  console.log("API URL : ", url);
  const { response } = configureStore().store.getState().login;
  const generatedToken = await AsyncStorage.getItem("token");
  let headers = {
    ...header,
    "token": response?.token ? response?.token : generatedToken
  }
  try {
    const response = await httpClient({
      method,
      url,
      data,
      headers: headers,
      // withCredentials: false,
    });
    if (response.status === 200) {
      return response;
    }
    if (response.status === 201) {
      return response;
    }
    if (response.status === 202) {
      return response;
    }
  } catch (error: any) {
    // console.log('errordsfdfdfs: ', error);
    if (error.response) {
      if (error.response.status === 401) {
        // console.log(`${url}: `, error.response);
        return error.response;
      }
      return error.response;
    } else if (error.request) {
      // console.log("Error request 1: ", error.request);
      return error.response;
    } else {
      // console.log("Error message 2: ", error.message);
    }
    // return error;
    return error.response;
  }
}
export async function apiCallJW(
  method: any,
  url: any,
  data: any,
  header = { "Content-Type": "application/json", "access-control-allow-origin": "*" }
) {
  try {
    const response = await httpClientJW({
      method,
      url,
      data,
      headers: header,
      // withCredentials: false,
    });
    if (response.status === 200) {
      return response;
    }
    if (response.status === 201) {
      return response;
    }
    if (response.status === 202) {
      return response;
    }
  } catch (error: any) {
    // console.log('errordsfdfdfs: ', error);
    if (error.response) {
      if (error.response.status === 401) {
        // console.log(`${url}: `, error.response);
        return error.response;
      }
      return error.response;
    } else if (error.request) {
      // console.log("Error request 1: ", error.request);
      return error.response;
    } else {
      // console.log("Error message 2: ", error.message);
    }
    // return error;
    return error.response;
  }
}
export async function apiCallJWDemo(
  method: any,
  url: any,
  data: any,
  header = { "Content-Type": "application/json", "access-control-allow-origin": "*" }
) {
  try {
    const response = await httpClientJWDemo({
      method,
      url,
      data,
      headers: header,
      // withCredentials: false,
    });
    if (response.status === 200) {
      return response;
    }
    if (response.status === 201) {
      return response;
    }
    if (response.status === 202) {
      return response;
    }
  } catch (error: any) {
    // console.log('errordsfdfdfs: ', error);
    if (error.response) {
      if (error.response.status === 401) {
        // console.log(`${url}: `, error.response);
        return error.response;
      }
      return error.response;
    } else if (error.request) {
      // console.log("Error request 1: ", error.request);
      return error.response;
    } else {
      // console.log("Error message 2: ", error.message);
    }
    // return error;
    return error.response;
  }
}



