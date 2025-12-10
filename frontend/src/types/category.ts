import { categoryIcons } from "@/constants/icons";

export type Category = {
  _id: string;
  name: string;
  description?: string;
  parentCategory?: string | null;
  iconKey?: keyof typeof categoryIcons;
};
