import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "@/zustand/store/authStore";
import { useEnrollmentStore } from "@/zustand/store/enrollment";

export const useUnenroll = (COURSES_PER_PAGE: number = 8) => {
  const { enrollments, getUserEnrollments, removeEnrollment } = useEnrollmentStore();
  const user = useAuthStore((state) => state.user);
  const [localEnrollments, setLocalEnrollments] = useState<any[]>([]);

  useEffect(() => {
    if (user?.id) {
      getUserEnrollments(user.id);
    }
  }, [user?.id]);

  useEffect(() => {
    setLocalEnrollments(enrollments);
  }, [enrollments]);

  const handleUnenroll = async (
    courseId: string,
    enrollId: string,
    currentPage: number,
    setCurrentPage: (page: number) => void
  ) => {
    try {
      await removeEnrollment(enrollId);

      setLocalEnrollments((prev) => {
        const updated = prev.filter((e) => e.courseId._id !== courseId);

        const totalAfterDelete = updated.length;
        const newTotalPages = Math.ceil(totalAfterDelete / COURSES_PER_PAGE);

        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }

        return updated;
      });

      toast.success("Unenrolled successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Unenroll failed");
    }
  };

  return {
    localEnrollments,
    setLocalEnrollments,
    handleUnenroll,
    hasCourses: localEnrollments.length > 0,
  };
};
