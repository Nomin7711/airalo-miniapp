import { travelsimApis } from "@travelsim/api/index";
import { useMutation } from "react-query";

export const useHpsTraveilsimLogin = () => {
  return useMutation((loginDetails) =>
    travelsimApis.hpsUserLogin(loginDetails)
  );
};
