"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCourseStore } from "@/zustand/store/courseStore";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
} from "@mui/material";

export default function TrackCoursesPage() {
  const { id } = useParams();
  const { courses, getCourses } = useCourseStore();
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    getCourses().then(() => {
      console.log("Fetched courses:", courses);
    });
  }, []);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  useEffect(() => {
    if (!courses.length || !id) return;
    setFilteredCourses(
      courses.filter(
        (course) =>
          String(
            course.category?._id || course.category?.$oid || course.category
          ) === id
      )
    );
  }, [courses, id]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-12">
      {/* العنوان */}
 <div className="text-center mb-10">
  <h1 className="text-4xl font-bold mb-2">📚 Courses Catalog</h1>
  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
    Unlock your potential with premium courses designed by industry experts — start mastering your track today.
  </p>
</div>


      {/* الكروت */}
      {filteredCourses.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card
              key={course._id}
              className="shadow-lg rounded-xl overflow-hidden transition-transform duration-300 cursor-pointer"
            >
              <CardMedia
                component="img"
                height="180"
                image={course.thumbnail?.secure_url}
                alt={course.title}
              />
              <CardContent className="flex flex-col gap-3">
                {/* العنوان */}
                <Typography variant="h6" className="font-bold">
                  {course.title}
                </Typography>

                {/* الوصف */}
                <Typography variant="body2" className="text-gray-600">
                  {course.description}
                </Typography>

                {/* الريتنج */}
                <Box display="flex" alignItems="center">
                  <Rating value={course.rating} readOnly />
                  <Typography variant="body2" className="ml-2 text-gray-500">
                    ({course.rating})
                  </Typography>
                </Box>

                {/* الإنستراكتور */}
                <Typography
                  variant="body2"
                  className="text-gray-700 font-medium"
                >
                  👨‍🏫 Instructor:{" "}
                  {course.instructor?.firstName
                    ? course.instructor.firstName.charAt(0).toUpperCase() +
                      course.instructor.firstName.slice(1)
                    : ""}{" "}
                  {course.instructor?.lastName
                    ? course.instructor.lastName.charAt(0).toUpperCase() +
                      course.instructor.lastName.slice(1)
                    : ""}
                </Typography>

                {/* المستوى واللغة */}
                <Typography variant="body2" className="text-gray-500">
                  Level: {course.level} | Language: {course.language}
                </Typography>

                {/* السعر */}
                <Typography variant="h6" className="text-green-600 font-bold">
                  ${course.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No courses available for this track yet.
        </p>
      )}
    </div>
  );
}
