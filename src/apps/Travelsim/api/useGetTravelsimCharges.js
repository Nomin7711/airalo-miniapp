import { travelsimApis } from "@travelsim/api/index";
import { useMutation } from "react-query";

export const useGetTravelsimCharges = () => {
  return useMutation((iccid) => travelsimApis.getChargeList(iccid));
};
