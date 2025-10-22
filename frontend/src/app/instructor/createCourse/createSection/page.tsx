"use client";
import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { Course } from "@/types/course";
import { Section } from "@/types/section";
import { fetchCourses } from "@/axios/services/course/courseService";
import { createSectionApi } from "@/axios/services/course/section/sectionService";
import { toast } from "react-toastify";
import { useAuthStore } from "@/zustand/store/authStore";
import { useRouter } from "next/navigation";
import { create_section } from "@/assets";

export default function CreateSectionPage() {
  const user = useAuthStore((state) => state.user);
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState<Omit<Section, "_id">>({
    courseId: "",
    title: "",
    order: 1,
    description: "",
  });
  const router = useRouter();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadCourses();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("📤 Sending formData:", formData); 
      await createSectionApi(formData);
      setFormData({ courseId: "", title: "", order: 0, description: "" });
      router.push("/instructor/createCourse/createSection/createLesson");
      toast.success("Section created successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create section");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side image */}
      <div className="relative w-1/2 hidden md:block mt-5">
        <Image
          src={create_section}
          alt="Course illustration"
          className="h-full w-full object-cover"
        />
        <div />
      </div>

      {/* Right side form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent>
            <Typography
              variant="h4"
              sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}
            >
              Course Content – Add Section
            </Typography>

            <form onSubmit={handleSubmit}>
              {/* Course select */}
              <TextField
                select
                fullWidth
                label="Select Course"
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
              >
                {courses.map((course) => (
                  <MenuItem key={course._id} value={course._id}>
                    {course.title}
                  </MenuItem>
                ))}
              </TextField>

              {/* Title */}
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
              />

              {/* Order */}
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

              {/* Description */}
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />

              {/* Submit button */}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  py: 1.5,
                  fontSize: "1rem",
                  backgroundColor: "#1f2937",
                  "&:hover": { backgroundColor: "#374151" },
                }}
              >
                Create Section
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
