"use client";
import { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import { Lesson, LessonType } from "@/types/lesson";
import { toast } from "react-toastify";
import { useAuthStore } from "@/zustand/store/authStore";
import { useSectionStore } from "@/zustand/store/course/section/sectionStore";

export default function CreateLessonPage() {
  const user = useAuthStore((state) => state.user);
  const { sections, fetchSections } = useSectionStore(); 

  const [formData, setFormData] = useState<Omit<Lesson, "_id">>({
    sectionId: "",
    title: "",
    type: LessonType.VIDEO,
    videoUrl: "",
    content: "",
    duration: 0,
    order: 1,
  });

  useEffect(() => {
    if (user?._id) {
      fetchSections(); 
    }
  }, [user, fetchSections]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("📤 Sending Lesson:", formData);
      await createLessonApi(formData);
      toast.success("Lesson created successfully!");
      setFormData({
        sectionId: "",
        title: "",
        type: LessonType.VIDEO,
        videoUrl: "",
        content: "",
        duration: 0,
        order: 1,
      });
    } catch (error: any) {
      console.error("❌ API Error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to create lesson");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left image */}
      <div className="relative w-1/2 hidden md:block mt-5">
      <img
          src="/create-lesson.png"
          alt="Course illustration"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right form */}
<div className="w-full md:w-1/2 flex items-center justify-end p-8">
        <Card className="w-full max-w-lg shadow-xl">
          <CardContent>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}>
              Course Content – Add Lesson
            </Typography>
            <form onSubmit={handleSubmit}>
              
              {/* 👇 بدل TextField sectionId بخاصية select */}
              <TextField
                select
                fullWidth
                label="Select Section"
                name="sectionId"
                value={formData.sectionId}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
              >
                {sections.length > 0 ? (
                  sections.map((section) => (
                    <MenuItem key={section._id} value={section._id}>
                      {section.title}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No sections available</MenuItem>
                )}
              </TextField>

              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
              />

              <TextField
                select
                fullWidth
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                sx={{ mb: 3 }}
              >
                {Object.values(LessonType).map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                label="Video URL"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="Content"
                name="content"
                multiline
                rows={4}
                value={formData.content}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />

              <TextField
                type="number"
                fullWidth
                label="Duration (minutes)"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />

              <TextField
                type="number"
                fullWidth
                label="Order"
                name="order"
                value={formData.order}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
              />

              <Button variant="contained" color="primary" type="submit" fullWidth     sx={{
                  py: 1.5,
                  fontSize: "1rem",
                  backgroundColor: "#1f2937",
                  "&:hover": { backgroundColor: "#374151" },
                }}>
                Save Lesson
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
