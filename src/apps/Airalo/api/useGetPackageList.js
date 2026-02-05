import { airaloApis, airaloQueryKeys } from "@airalo/api/index";
import { useMutation, useQuery } from "react-query";

export const useGetPackageList = (filter, country) => {
  return useQuery([airaloQueryKeys.PACKAGE_LIST, country], () =>
    airaloApis.getPackageList(filter, country)
  );
};

export const useMutatePackageList = (filter) => {
  return useMutation((data) => airaloApis.getPackageList(filter));
};
