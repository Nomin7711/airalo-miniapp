import { travelsimApis } from "@travelsim/api/index";
import { useMutation } from "react-query";

export const useGetChargePackageList = () => {
  return useMutation((data) => travelsimApis.getChargePackageList(data));
};
