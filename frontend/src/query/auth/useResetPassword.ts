import { resetPasswordApi } from "@/axios/services/auth/auth"
import { useMutation } from "@tanstack/react-query"

export const useResetPassword = () =>{
    return useMutation({
        mutationFn: resetPasswordApi
    })
}