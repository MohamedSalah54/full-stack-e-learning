import { confirmEmailApi } from "@/axios/services/auth/auth"
import { useMutation } from "@tanstack/react-query"

export const useConfirmEmail = () =>{
    return useMutation ({
        mutationFn: confirmEmailApi
    })
}