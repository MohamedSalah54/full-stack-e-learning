import { signupApi } from "@/axios/services/auth/auth"
import { useMutation } from "@tanstack/react-query"

export const useSignUp = () =>{
    return useMutation ({
        mutationFn: signupApi
    })
}