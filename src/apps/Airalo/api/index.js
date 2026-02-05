import { apiAiralo } from "@config/apiClient";

export const airaloApis = {
  async hpsUserLogin(data) {
    return (await apiAiralo.post("api/user/check-user-hps/", data))?.data;
  },
  async fetchUserAiralo() {
    return (await apiAiralo.get("api/user/user-info"))?.data;
  },
  async getCountries() {
    return (await apiAiralo.get("api/dic/dic_country"))?.data?.dic_country;
  },
  async getBanner() {
    return (await apiAiralo.get("api/dic/banner"))?.data?.airalo_banner;
  },
  async getDeviceList() {
    return (await apiAiralo.get("api/device/list"))?.data?.data;
  },
  async getPackageList(filter, country) {
    let url = `api/packages/list?filter=${filter}`;
    if (country) {
      url += `&country=${country}`;
    }
    return (await apiAiralo.get(url))?.data?.data;
  },
  async setPayment(data) {
    return (await apiAiralo.post("api/order/init", data))?.data;
  },
  async getEsims() {
    return (await apiAiralo.get("api/e_sims/list"))?.data?.data;
  },
  async getEsimsMutate() {
    return (await apiAiralo.get("api/e_sims/list"))?.data;
  },
  async get() {
    return (await apiAiralo.get("api/e_sims/list"))?.data?.data;
  },
  async getTopUpList(iccid) {
    return (await apiAiralo.get(`api/e_sims/top_up_list?iccid=${iccid}`))?.data
      ?.data;
  },
  async getDataUsage(iccid) {
    return (await apiAiralo.get(`api/e_sims/usage?iccid=${iccid}`))?.data?.data;
  },
  async setTopUpPayment(data) {
    return (await apiAiralo.post("api/order/init/topup", data))?.data;
  },
};

export const airaloQueryKeys = {
  COUNTRIES: "@airaloQueryKeys.COUNTRIES",
  BANNER: "@airaloQueryKeys.BANNER",
  DEVICE_LIST: "@airaloQueryKeys.DEVICE_LIST",
  PACKAGE_LIST: "@airaloQueryKeys.PACKAGE_LIST",
  ESIM_INFO: "@airaloQueryKeys.ESIM_INFO",
  TOP_UP_LIST: "@airaloQueryKeys.TOP_UP_LIST",
  DATA_USAGE: "@airaloQueryKeys.DATA_USAGE",
};
