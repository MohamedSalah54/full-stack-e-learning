import { updateCategory } from "@/axios/services/categories/category"
import { useMutation } from "@tanstack/react-query"

export const useUpdateCategory = () =>{
    return useMutation({
        mutationFn:({id, data}:{id :string, data:{name:string, description?: string}}) => updateCategory(id,data)
    })
}