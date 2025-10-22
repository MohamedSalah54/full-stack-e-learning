"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { useCourseStore } from "@/zustand/store/courseStore";
import { useCategoryStore } from "@/zustand/store/category";
import { useAuthStore } from "@/zustand/store/authStore";
import { uploadThumbnail } from "@/axios/services/course/courseService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { create_Course } from "@/assets";

const asId = (v: any): string | null => {
  if (!v && v !== 0) return null;
  if (typeof v === "string") return v;
  if (typeof v === "object") {
    if (v.$oid) return String(v.$oid);
    if (v._id) return asId(v._id);
  }
  return null;
};

export default function CreateCoursePage() {
  const router = useRouter();
  const { addCourse } = useCourseStore();

  const {
    categories,
    parentCategories,
    fetchCategories,
    fetchParentCategories,
    isLoading: catLoading,
    error: catError,
  } = useCategoryStore();

  const user = useAuthStore((state) => state.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [uploadedThumb, setUploadedThumb] = useState<{
    secure_url: string;
    public_id: string;
  } | null>(null);

  const [parentCategoryId, setParentCategoryId] = useState<string>("");
  const [trackId, setTrackId] = useState<string>("");

  const [level, setLevel] = useState<string>("");
  const [language, setLanguage] = useState<string>("English");
  const [price, setPrice] = useState<number>(0);

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);

  useEffect(() => {
    fetchCategories();
    fetchParentCategories();
  }, [fetchCategories, fetchParentCategories]);

  const tracksForParent = useMemo(() => {
    if (!parentCategoryId) return [] as any[];
    return categories.filter(
      (c: any) => asId(c.parentCategory) === parentCategoryId
    );
  }, [categories, parentCategoryId]);

  const handleUpload = async () => {
    if (!thumbnail) {
      alert("Please select a thumbnail first");
      return;
    }
    try {
      setUploading(true);
      const res = await uploadThumbnail(thumbnail);
      const data = (res as any).data ?? res;
      setUploadedThumb({
        secure_url: data.secure_url,
        public_id: data.public_id,
      });
    } catch (error) {
      console.error("Thumbnail upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedThumb) {
      alert("Please upload a thumbnail first");
      return;
    }
    if (!parentCategoryId || !trackId) {
      alert("Please select both Category and Track");
      return;
    }

    const payload = {
      title,
      description,
      image: uploadedThumb,
      category: trackId,
      level,
      instructor: user?._id,
      language: language || "English",
      price: Number(price),
      isPublished: true,
    };

    try {
      setSubmitting(true);
      await addCourse(payload as any);

      setTitle("");
      setDescription("");
      setThumbnail(null);
      setUploadedThumb(null);
      setFileInputKey((prev) => prev + 1);
      setParentCategoryId("");
      setTrackId("");
      setLevel("");
      setLanguage("English");
      setPrice(0);

      router.push("/instructor/createCourse/createSection");
      toast.success(
        "Your course has been submitted to the admin and is awaiting approval"
      );
    } catch (err: any) {
      console.error(
        "❌ Error in addCourse:",
        err.response?.data || err.message
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden md:block w-1/2 mt-5">
        <Image
          src={create_Course}
          alt="Course illustration"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <Container maxWidth="sm">
          <Box
            component="form"
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-md mt-10 mb-16 p-6 flex flex-col gap-4"
          >
            <Typography variant="h5" className="font-bold mb-2">
              Create Course
            </Typography>

            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="rounded-lg"
            />

            <TextField
              label="Description"
              multiline
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="rounded-lg"
            />

            {/* Thumbnail Upload */}
            <Box>
              <Button
                component="label"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#1f2937",
                  "&:hover": { backgroundColor: "#374151" },
                }}
              >
                Select Thumbnail
                <input
                  key={fileInputKey}
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    setThumbnail(e.target.files ? e.target.files[0] : null)
                  }
                />
              </Button>

              {thumbnail && (
                <Typography className="mt-1 text-sm text-gray-600">
                  {thumbnail.name}
                </Typography>
              )}

              <Button
                onClick={handleUpload}
                disabled={uploading}
                fullWidth
                className={`mt-2 rounded-lg ${
                  uploading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-gray-800 hover:bg-gray-700 text-white"
                }`}
              >
                {uploading ? "Uploading..." : "Upload Thumbnail"}
              </Button>

              {uploadedThumb && (
                <Box className="mt-3 text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <Image
                    src={uploadedThumb.secure_url}
                    alt="thumbnail"
                    className="w-full max-h-52 object-cover rounded-lg"
                  />
                </Box>
              )}
            </Box>

            {/* Parent Category */}
            <FormControl fullWidth required disabled={catLoading}>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={parentCategoryId}
                onChange={(e) => {
                  setParentCategoryId(String(e.target.value));
                  setTrackId("");
                }}
                className="rounded-lg"
              >
                {catLoading && <MenuItem disabled>Loading...</MenuItem>}
                {catError && (
                  <MenuItem disabled>Error loading categories</MenuItem>
                )}
                {parentCategories.map((cat: any) => (
                  <MenuItem
                    key={asId(cat._id) ?? String(cat._id)}
                    value={asId(cat._id) ?? String(cat._id)}
                  >
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
              {!parentCategoryId && (
                <FormHelperText>Select a category</FormHelperText>
              )}
            </FormControl>

            {/* Track */}
            <FormControl
              fullWidth
              required
              disabled={!parentCategoryId || catLoading}
            >
              <InputLabel>Track</InputLabel>
              <Select
                label="Track"
                value={trackId}
                onChange={(e) => setTrackId(String(e.target.value))}
                className="rounded-lg"
              >
                {!parentCategoryId && (
                  <MenuItem disabled>Select category first</MenuItem>
                )}
                {parentCategoryId && tracksForParent.length === 0 && (
                  <MenuItem disabled>No tracks for this category</MenuItem>
                )}
                {tracksForParent.map((trk: any) => (
                  <MenuItem
                    key={asId(trk._id) ?? String(trk._id)}
                    value={asId(trk._id) ?? String(trk._id)}
                  >
                    {trk.name}
                  </MenuItem>
                ))}
              </Select>
              {!trackId && parentCategoryId && (
                <FormHelperText>Select a track</FormHelperText>
              )}
            </FormControl>

            {/* Level */}
            <FormControl fullWidth required>
              <InputLabel>Level</InputLabel>
              <Select
                label="Level"
                value={level}
                onChange={(e) => setLevel(String(e.target.value))}
                className="rounded-lg"
              >
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
              </Select>
            </FormControl>

            {/* Language */}
            <FormControl fullWidth required>
              <InputLabel>Language</InputLabel>
              <Select
                label="Language"
                value={language}
                onChange={(e) => setLanguage(String(e.target.value))}
                className="rounded-lg"
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Arabic">Arabic</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="German">German</MenuItem>
              </Select>
            </FormControl>

            {/* Price */}
            <TextField
              type="number"
              label="Price"
              inputProps={{ min: 0, step: 0.01 }}
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value || "0"))}
              required
              className="rounded-lg"
            />

            <Button
              type="submit"
              fullWidth
              disabled={submitting}
              variant="contained"
              sx={{
                backgroundColor: "#1f2937",
                "&:hover": { backgroundColor: "#374151" },
              }}
            >
              {submitting ? <CircularProgress size={22} /> : "Create Course"}
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
}
