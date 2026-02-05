import { generateXAPISignature } from "@config/signature";
import axios from "axios";

import { mainConfig } from "./index";

export const apiTravelsim = axios.create({
  baseURL: mainConfig.travelsimBaseUrl,
  timeout: 65000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiAiralo = axios.create({
  baseURL: mainConfig.airaloBaseUrl,
  timeout: 65000,
});
apiAiralo.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// export const getAccessToken = () => {
//   return apiTravelsim.defaults.headers.common.Authorization?.split(" ")[1];
// };
//
// export const setInterceptor = (fn = function () {}, efn = function () {}) => {
//   apiTravelsim.interceptors.response.use(fn, efn);
// };
//
// apiTravelsim.interceptors.request.use(
//   (config) => {
//     config.headers["X-Api-Signature"] = generateXAPISignature(
//       config.data,
//       config.url
//     );
//
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const setTokenTravelsim = (token) => {
  if (token) {
    apiTravelsim.defaults.headers.common.Authorization = `Token ${token}`;
  }
};

export const setTokenAiralo = (token) => {
  if (token) {
    apiAiralo.defaults.headers.common.Authorization = `Token ${token}`;
  }
};
