import { airaloApis, airaloQueryKeys } from "@airalo/api/index";
import { useMutation, useQueryClient } from "react-query";

export const useMutateTopupPayment = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => airaloApis.setTopUpPayment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(airaloQueryKeys.ESIM_INFO);
    },
  });
};
