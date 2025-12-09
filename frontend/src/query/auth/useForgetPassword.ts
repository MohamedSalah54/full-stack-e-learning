import { forgetPasswordApi } from "@/axios/services/auth/auth"
import { useMutation } from "@tanstack/react-query"

export const useForgetPassword = () =>{
    return useMutation({
        mutationFn: forgetPasswordApi
    })
}