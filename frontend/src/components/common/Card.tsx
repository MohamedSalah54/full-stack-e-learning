"use client";

import { useEffect, useState } from "react";
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
import { useEnrollmentStore } from "@/zustand/store/enrollment";

interface CourseCardProps {
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
  onEnroll?: () => void;
}

export default function CourseCard({
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
  const [favorite, setFavorite] = useState(false);

  return (
    <Card sx={mainContainer}>
      {/*IMAGE COURSE*/}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 250,
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          style={{
            objectFit: "cover",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
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

          <IconButton onClick={() => setFavorite(!favorite)}>
            {favorite ? (
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
            <Typography variant="body2">  {sections} {sections === 1 ? "Section" : "Sections"}</Typography>
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
            {/* after discount */}
            <Typography sx={priceAfterDiscount}>${price}</Typography>

            {/* original price */}
            {originalPrice && (
              <Typography sx={priceBeforeDiscount}>${originalPrice}</Typography>
            )}
          </Box>

          <Button onClick={onEnroll} sx={bookBtn(isEnrolled)}>
            {isEnrolled ? "Unenroll" : "Enroll Now"}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
