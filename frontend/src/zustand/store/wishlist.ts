import { WishlistItem, WishlistData } from "@/types/wishlist";
import { addToWishlist, getWishlist, removeFromWishlist, clearWishlist } from "@/axios/services/wishlist";
import { create } from "zustand";

interface WishlistState {
  wishlist: WishlistItem[];
  loading: boolean;
  error: string | null;
  fetchWishlist: (userId: string) => Promise<void>;
  addCourseToWishlist: (data: WishlistData) => Promise<void>;
  removeCourseFromWishlist: (userId: string, courseId: string) => Promise<void>;
  clearAllWishlist: (userId: string) => Promise<void>;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],
  loading: false,
  error: null,

  fetchWishlist: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await getWishlist(userId);
      set({ wishlist: response.data as WishlistItem[], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addCourseToWishlist: async (data: WishlistData) => {
    set({ loading: true, error: null });
    try {
      const response = await addToWishlist(data);
      const returned = response.data as WishlistItem | WishlistItem[];
      const itemsToAdd = Array.isArray(returned) ? returned : [returned];

      set((state) => ({
        wishlist: [...state.wishlist, ...itemsToAdd],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  removeCourseFromWishlist: async (userId: string, courseId: string) => {
    set({ loading: true, error: null });
    try {
      await removeFromWishlist(userId, courseId);
      set((state) => ({
        wishlist: state.wishlist.filter((item) => {
          const cid = typeof item.courseId === "string" ? item.courseId : item.courseId._id;
          return cid !== courseId;
        }),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  clearAllWishlist: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      await clearWishlist(userId);
      set({ wishlist: [], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
