"use client";

import { useState } from "react";
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

interface CourseCardProps {
  image: string;
  title: string;
  rating: number;
  reviews: number;
  description: string;
  lessons: number;
  students: number;
  price: number;
  originalPrice?: number;
  onBook?: () => void;
}

export default function CourseCard({
  image,
  title,
  rating,
  reviews,
  description,
  lessons,
  students,
  price,
  originalPrice,
  onBook,
}: CourseCardProps) {
  const [favorite, setFavorite] = useState(false);

  return (
    <Card
      sx={{
        width: 300,
        height: 550,
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": { boxShadow: 6 },
        mx: "auto",
        mt: 5,
      }}
    >
      {/*IMAGE COURSE*/}
      <Box sx={{ position: "relative", width: 300, height: 257 }}>
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
      </Box>

      {/* content */}
      <CardContent
        sx={{
          width: 300,
          height: 290,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2,
        }}
      >
        {/* title*/}
        <Typography
          sx={{
            fontFamily: "Tajawal",
            fontWeight: 700,
            fontSize: 20,
            textTransform: "capitalize",
            lineHeight: "100%",
          }}
        >
          {title}
        </Typography>

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

        {/* description*/}
        <Typography
          sx={{
            fontFamily: "Tajawal",
            fontWeight: 400,
            fontSize: 16,
            color: "text.secondary",
            textTransform: "capitalize",
            lineHeight: "100%",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </Typography>

        {/* lessons and students */}
        <Box
          sx={{
            width: 268,
            height: 24,
            display: "flex",
            alignItems: "center",
            gap: 3,
            color: "text.secondary",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <MenuBookIcon fontSize="small" />
            <Typography variant="body2">{lessons} Lessons</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PeopleAltIcon fontSize="small" />
            <Typography variant="body2">{students} Students</Typography>
          </Box>
        </Box>

        {/* price and book*/}
        <CardActions
          sx={{
            width: 268,
            height: 50,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
            padding: 0,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            {/* after discount */}
            <Typography
              sx={{
                fontFamily: "Nunito",
                fontWeight: 600,
                fontStyle: "SemiBold",
                fontSize: "22px",
                lineHeight: "125%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "green",
              }}
            >
              ${price}
            </Typography>

            {/* original price */}
            {originalPrice && (
              <Typography
                sx={{
                  fontFamily: "Nunito",
                  fontWeight: 400,
                  fontStyle: "Regular",
                  fontSize: "18px",
                  lineHeight: "150%",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "gray",
                  textDecoration: "line-through",
                }}
              >
                ${originalPrice}
              </Typography>
            )}
          </Box>

          <Button
            onClick={onBook}
            variant="contained"
            sx={{
              width: 117,
              height: 44,
              borderRadius: "8px",
              backgroundColor: "#2c3b50ff",
              textTransform: "capitalize",
              opacity: 1,
              gap: "8px",
              paddingTop: "16px",
              paddingRight: "20px",
              paddingBottom: "16px",
              paddingLeft: "20px",
              "&:hover": { backgroundColor: "#111827" },
              fontFamily: "Inter",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "center",
              color: "#fff",
            }}
          >
            Book Now
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
