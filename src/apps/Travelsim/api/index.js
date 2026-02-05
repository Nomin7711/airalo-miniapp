import { apiAiralo, apiTravelsim } from "@config/apiClient";

export const travelsimApis = {
  async hpsUserLogin(data) {
    return (await apiTravelsim.post("api/user/check-user-hps", data))?.data;
  },
  async fetchUserTravelsim() {
    return (await apiTravelsim.get("api/user/user-info"))?.data;
  },
  async setPayment(data) {
    return (await apiTravelsim.post("api/order/init", data))?.data;
  },
  async travelsimList() {
    return (await apiTravelsim.get("api/lists/sims"))?.data;
  },
  async checkIccid(iccid) {
    return (await apiTravelsim.get(`api/lists/iccid?iccid=${iccid}`))?.data;
  },
  async getChargeList(iccid) {
    return (await apiTravelsim.get(`api/lists/charges?iccid=${iccid}`))?.data;
  },
  async getChargePackageList(data) {
    const { iccid, country } = data || {};
    return (
      await apiTravelsim.get(
        `api/lists/charge_packages?country=${country}&page=1&limit=50&iccid=${iccid}`
      )
    )?.data;
  },
};

export const travelsimQueryKeys = {
  COUNTRIES: "@travelsimQueryKeys.COUNTRIES",
  CHECK_ICCID: "@travelsimQueryKeys.CHECK_ICCID",
  ORDER_LIST: "@travelsimQueryKeys.ORDER_LIST",
  DEVICE_LIST: "@travelsimQueryKeys.DEVICE_LIST",
  PACKAGE_LIST: "@travelsimQueryKeys.PACKAGE_LIST",
  ESIM_INFO: "@travelsimQueryKeys.ESIM_INFO",
  TOP_UP_LIST: "@travelsimQueryKeys.TOP_UP_LIST",
  DATA_USAGE: "@travelsimQueryKeys.DATA_USAGE",
};
