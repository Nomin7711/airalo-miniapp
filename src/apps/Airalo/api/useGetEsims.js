import { airaloApis, airaloQueryKeys } from "@airalo/api/index";
import { useMutation, useQuery } from "react-query";

export const useGetEsims = () => {
  return useQuery([airaloQueryKeys.ESIM_INFO], airaloApis.getEsims);
};

export const useMutateGetEsims = () => {
  return useMutation(() => airaloApis.getEsimsMutate());
};
