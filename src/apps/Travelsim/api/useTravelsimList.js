import { airaloApis } from "@airalo/api";
import { travelsimApis, travelsimQueryKeys } from "@travelsim/api/index";
import { useMutation, useQuery } from "react-query";

export const useTravelsimList = () => {
  return useQuery([travelsimQueryKeys.ORDER_LIST], travelsimApis.travelsimList);
};

export const useMutateTravelsimList = () => {
  return useMutation(() => travelsimApis.travelsimList());
};
