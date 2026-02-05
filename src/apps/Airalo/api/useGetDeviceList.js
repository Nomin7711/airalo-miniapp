import { airaloApis, airaloQueryKeys } from "@airalo/api/index";
import { useQuery } from "react-query";

export const useGetDeviceList = () => {
  return useQuery([airaloQueryKeys.DEVICE_LIST], airaloApis.getDeviceList);
};
