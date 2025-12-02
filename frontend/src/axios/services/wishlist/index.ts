import API from "@/axios/API/api";
import { WishlistResponse, WishlistData } from "@/types/wishlist";

// ✅ إضافة كورس للمفضلة
export const addToWishlist = async (data: WishlistData) => {
  const response = await API.post<WishlistResponse>("/wishlist", data);
  return response.data;
};

// ✅ جلب المفضلة للمستخدم
export const getWishlist = async (userId: string) => {
  const response = await API.get<WishlistResponse>(`/wishlist/${userId}`);
  return response.data;
};

// ✅ حذف كورس من المفضلة
export const removeFromWishlist = async (userId: string, courseId: string) => {
  const response = await API.delete<WishlistResponse>(`/wishlist/${userId}/course/${courseId}`);
  return response.data;
};

// ✅ مسح كل المفضلة
export const clearWishlist = async (userId: string) => {
  const response = await API.delete<WishlistResponse>(`/wishlist/all/${userId}`);
  return response.data;
};
