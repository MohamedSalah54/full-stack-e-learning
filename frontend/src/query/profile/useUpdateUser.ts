// hooks/useProfileMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/axios/services/profile/profile";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: any;
    }) => updateUser(userId, data),

    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["me"], updatedUser);
    },
  });
};
