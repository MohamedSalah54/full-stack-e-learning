"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
  Rating,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { BookA, CircleUserRound, Code, Gauge } from "lucide-react";
import {
  bookBtn,
  mainContainer,
  mainContent,
  mainDescription,
  mainTitle,
  priceAfterDiscount,
  priceBeforeDiscount,
  priceContainer,
} from "@/styles/card";
import { CourseLevel } from "@/types/course";
import { toast } from "react-toastify";
import { useWishlistStore } from "@/zustand/store/wishlist";
import { useAuthStore } from "@/zustand/store/authStore";
import { useEffect, useState } from "react";

interface CourseCardProps {
  courseId: string;
  userId?: string;
  image: string;
  title: string;
  rating: number;
  category: string;
  instructor: string;
  reviews: number;
  description: string;
  sections: number;
  students: number;
  price: number;
  level: CourseLevel;
  language: string;
  originalPrice?: number;
  isEnrolled?: boolean;
  customActions?: React.ReactNode;
  onEnroll?: () => void;
}

export default function CourseCard({
  courseId,
  userId,
  customActions,
  image,
  title,
  rating,
  category,
  instructor,
  reviews,
  description,
  sections,
  students,
  price,
  originalPrice,
  level,
  language,
  isEnrolled,
  onEnroll,
}: CourseCardProps) {
  const {
    wishlist,
    addCourseToWishlist,
    removeCourseFromWishlist,
    fetchWishlist,
  } = useWishlistStore();
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    if (user) {
      fetchWishlist(user.id);
    }
  }, [user, fetchWishlist]);

  const isFavorite = wishlist.some((item) => {
    const cid =
      typeof item.courseId === "string" ? item.courseId : item.courseId._id;
    return cid === courseId;
  });

  const handleToggleFavorite = async () => {
    if (!user) return toast.error("Please log in first");
    if (!courseId) return toast.error("Course ID not found");

    try {
      if (isFavorite) {
        await removeCourseFromWishlist(user.id, courseId);
        toast.success("Removed from wishlist");
      } else {
        await addCourseToWishlist({ userId: user.id, courseId });
        toast.success("Added to wishlist");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Wishlist action failed");
    }
  };

  return (
    <Card sx={mainContainer}>
      {/*IMAGE COURSE*/}
      <Box
        sx={{
          width: "100%",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Image
          src={image}
          alt={title}
          width={500} 
          height={300} 
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </Box>

      {/* content */}
      <CardContent sx={mainContent}>
        {/* title*/}
        <Typography sx={mainTitle}>{title}</Typography>

        {/* rating and add to fav*/}
        <Box
          sx={{
            width: 268,
            height: 21,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Rating
              name="rating"
              value={rating}
              precision={0.5}
              readOnly
              size="small"
              icon={<StarIcon fontSize="inherit" />}
              emptyIcon={<StarIcon fontSize="inherit" sx={{ opacity: 0.3 }} />}
            />

            <Typography variant="body2" sx={{ color: "text.primary", ml: 0.3 }}>
              {rating.toFixed(1)}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ({reviews})
            </Typography>
          </Box>

          <IconButton onClick={handleToggleFavorite}>
            {isFavorite ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "gray" }} />
            )}
          </IconButton>
        </Box>
        {/* category */}

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Code fontSize="small" />
          <Typography variant="body2">{category}</Typography>
        </Box>

        {/* instructor name */}

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <CircleUserRound fontSize="small" color="oklch(62.7% 0.265 303.9)" />
          <Typography variant="body2">{instructor}</Typography>
        </Box>

        {/* description*/}
        <Typography sx={mainDescription}>{description}</Typography>

        {/* lessons and students */}
        <Box
          sx={{
            width: 268,
            height: 24,
            display: "flex",
            alignItems: "center",
            gap: 4.5,
            color: "text.secondary",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <MenuBookIcon
              fontSize="small"
              sx={{ color: "oklch(58.5% 0.233 277.117)" }}
            />
            <Typography variant="body2">
              {" "}
              {sections} {sections === 1 ? "Section" : "Sections"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PeopleAltIcon
              fontSize="small"
              sx={{ color: "oklch(76.9% 0.188 70.08)" }}
            />
            <Typography variant="body2">
              {students} {students === 1 ? "Student" : "Students"}
            </Typography>
          </Box>
        </Box>

        {/* language & level */}
        <Box
          sx={{
            width: 268,
            height: 24,
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "text.secondary",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <BookA fontSize="small" color="oklch(69.6% 0.17 162.48)" />
            <Typography variant="body2"> {language} </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Gauge fontSize="small" color="red" />
            <Typography variant="body2"> {level}</Typography>
          </Box>
        </Box>

        {/* price and book*/}
    <CardActions sx={priceContainer}>
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
    <Typography sx={priceAfterDiscount}>${price}</Typography>

    {originalPrice && (
      <Typography sx={priceBeforeDiscount}>${originalPrice}</Typography>
    )}
  </Box>

  {/* استخدم customActions لو موجود */}
  {customActions ? (
    customActions
  ) : (
    <Button onClick={onEnroll} sx={bookBtn(isEnrolled)}>
      {isEnrolled ? "Unenroll" : "Enroll Now"}
    </Button>
  )}
</CardActions>

      </CardContent>
    </Card>
  );
}
