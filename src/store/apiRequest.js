import axios from "axios";

let headers = {};
let headersWithImages = {'Content-Type':'multipart/form-data'};

async function makeApiCall(
  url, // FIRST PARAM  FOR END POINT
  method = "GET", // SECOND PARAM FOR METHOD TYPE BY DEFAULT GET
  data, //THIRD PARAM FOR DATA/BODY
  noAuth, //4TH IF WE HAVE TO DEAL WITH AUTH
  sendConfig,
  ...config
) {
  try {
    const access_token = localStorage.getItem("userToken");
    if (access_token !== null) {
      headers.Authorization = `Bearer ${access_token}`;
    }
    const response = await axios({
      method,
      data,
      headers,
      url: `${process.env.VUE_APP_API_URL}${url}`,
      ...config,
    });
    if (sendConfig) {
      return response;
    }
    return response;
  } catch (error) {
    if (error?.response && error?.response?.status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/onboardingscreen";
    }
  }

}

async function makeApiCallWithImages(
  url, // FIRST PARAM  FOR END POINT
  method = "GET", // SECOND PARAM FOR METHOD TYPE BY DEFAULT GET
  data, //THIRD PARAM FOR DATA/BODY
  noAuth, //4TH IF WE HAVE TO DEAL WITH AUTH
  sendConfig,
  ...config
) {
  try {
    const access_token = localStorage.getItem("userToken");
    if (access_token !== null) {
      headersWithImages.Authorization = `Bearer ${access_token}`;
    }
    const response = await axios({
      method,
      data,
      headers:headersWithImages,
      url: `${process.env.VUE_APP_API_URL}${url}`,
      ...config,
    });
    if (sendConfig) {
      return response;
    }
    return response;
  } catch (error) {
    if (error?.response && error?.response?.status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/onboardingscreen";
    }
  }
}

export { makeApiCall, makeApiCallWithImages };