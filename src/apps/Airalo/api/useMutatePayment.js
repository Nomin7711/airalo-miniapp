import { airaloApis, airaloQueryKeys } from "@airalo/api/index";
import { useMutation, useQueryClient } from "react-query";

export const useMutatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => airaloApis.setPayment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(airaloQueryKeys.ESIM_INFO);
    },
  });
};
