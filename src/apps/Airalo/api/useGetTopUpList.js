import { airaloApis, airaloQueryKeys } from "@airalo/api/index";
import { useQuery } from "react-query";

export const useGetTopUpList = (iccid) => {
  return useQuery([airaloQueryKeys.TOP_UP_LIST, iccid], () =>
    airaloApis.getTopUpList(iccid)
  );
};
