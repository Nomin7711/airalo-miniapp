import { travelsimApis, travelsimQueryKeys } from "@travelsim/api/index";
import { useMutation, useQuery } from "react-query";

export const useCheckIccid = () => {
  return useMutation((data) => travelsimApis?.checkIccid(data));
};
