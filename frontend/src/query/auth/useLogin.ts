import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { loginApi } from "@/axios/services/auth/auth";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginApi,
  onSuccess: (res) => {
  Cookies.set("token", res.data.accessToken);
  queryClient.invalidateQueries({ queryKey: ["me"] });
},

  });
};
