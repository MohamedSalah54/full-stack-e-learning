import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "@/axios/services/auth/auth";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await getMeApi();
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
