import { travelsimApis, travelsimQueryKeys } from "@travelsim/api/index";
import { useMutation, useQuery } from "react-query";

export const useTravelsimSetPayment = () => {
  return useMutation((data) => travelsimApis?.setPayment(data));
};
