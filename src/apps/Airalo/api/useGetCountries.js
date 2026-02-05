import { airaloApis, airaloQueryKeys } from "@airalo/api/index";
import { useQuery } from "react-query";

export const useGetCountries = () => {
  return useQuery([airaloQueryKeys.COUNTRIES], airaloApis.getCountries);
};
