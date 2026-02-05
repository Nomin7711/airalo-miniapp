import { airaloApis, airaloQueryKeys } from "@airalo/api/index";
import { useQuery } from "react-query";

export const useGetDataUsage = (iccid) => {
  return useQuery([airaloQueryKeys.DATA_USAGE, iccid], () =>
    airaloApis.getDataUsage(iccid)
  );
};
