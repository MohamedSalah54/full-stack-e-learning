import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getMeApi } from "@/axios/services/auth/auth";

export const useGetMe = () => {
  const token = Cookies.get("token");

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await getMeApi();
      return res.data.user;
    },
    enabled: !!token, 
    staleTime: 1000 * 60 * 5,
  });
};
