import { airaloApis, airaloQueryKeys } from "@airalo/api/index";
import { useQuery } from "react-query";

export const useGetBanner = () => {
  return useQuery([airaloQueryKeys.BANNER], airaloApis.getBanner);
};
