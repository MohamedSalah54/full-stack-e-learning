import { resendCodeApi } from "@/axios/services/auth/auth"
import { useMutation } from "@tanstack/react-query"

export const  useResendCode = () =>{
    return useMutation({
        mutationFn: resendCodeApi
    })
}