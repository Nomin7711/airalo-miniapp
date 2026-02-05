import { useMutation, useQueryClient } from "react-query";

import { airaloApis } from "./index";

export const useHpsUserLogin = () => {
  return useMutation((loginDetails) => airaloApis.hpsUserLogin(loginDetails));
};
