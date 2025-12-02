"use client";
import { FC } from "react";
import { TextField, MenuItem, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const FilterForInstructorMUI: FC = () => {
  return (
    <>
      {/* Title */}
      <span className="h-[33px] font-nunito font-semibold text-[24px] leading-[100%] mb-4 block w-fit">
        My Courses
      </span>

      {/* Main Container */}
      <Box className="flex items-center w-[1200px] h-[72px] gap-12 ">
        {/* Search */}
        <Box className="w-[300px] h-[72px] flex flex-col gap-1">
          <span className="text-[12px] text-gray-500">Search</span>
          <TextField
            placeholder="Search in your courses"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="medium" />
                </InputAdornment>
              ),
            }}
            sx={{ background: "#fff", height: 48 }}
          />
        </Box>

        {/* Sorted By */}
        <Box className="w-[240px] h-[72px] flex flex-col gap-1">
          <span className="text-[12px] text-gray-500">Sorted by</span>
          <TextField
            select
            defaultValue="latest"
            sx={{ background: "#fff", height: 48 }}
          >
            <MenuItem value="latest">Latest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="popular">Popular</MenuItem>
          </TextField>
        </Box>

        {/* Category */}
        <Box className="w-[240px] h-[72px] flex flex-col gap-1">
          <span className="text-[12px] text-gray-500">Category</span>
          <TextField
            select
            defaultValue="all"
            sx={{ background: "#fff", height: 48 }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="dev">Development</MenuItem>
            <MenuItem value="design">Design</MenuItem>
            <MenuItem value="marketing">Marketing</MenuItem>
          </TextField>
        </Box>

        {/* Rating */}
        <Box className="w-[240px] h-[72px] flex flex-col gap-1">
          <span className="text-[12px] text-gray-500">Rating</span>
          <TextField
            select
            defaultValue="4"
            sx={{ background: "#fff", height: 48 }}
          >
            <MenuItem value="4">4 stars & up</MenuItem>
            <MenuItem value="3">3 stars & up</MenuItem>
            <MenuItem value="2">2 stars & up</MenuItem>
          </TextField>
        </Box>
      </Box>
    </>
  );
};

export default FilterForInstructorMUI;
