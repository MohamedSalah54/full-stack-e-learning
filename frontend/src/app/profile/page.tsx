"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/zustand/store/authStore";
import Loader from "@/components/common/Loader";
import NavUser from "@/components/user/profile/fixed/NavUser";
import ImageWithLinks from "@/components/user/profile/fixed/ImageWithLinks";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const user = useAuthStore((state) => state.user);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <Loader loading={loading} />
      </div>
      {!loading &&
        (user?.role === "student" ? (
          <>
            <div className="mt-10">
              <ImageWithLinks />
            </div>
            <div className="mt-10">
              <NavUser />
            </div>
          </>
        ) : (
          <>
            <div>nothing</div>
          </>
        ))}
    </>
    
  );
}
