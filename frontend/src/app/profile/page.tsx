"use client";

import Loader from "@/components/common/Loader";
import NavUser from "@/components/user/profile/fixed/NavUser";
import ImageWithLinks from "@/components/user/profile/fixed/ImageWithLinks";
import { useProfileLogic } from "@/hooks/profile/useProfileLogic";

export default function ProfilePage() {
  const { loading, user } = useProfileLogic();

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
          <div>nothing</div>
        ))}
    </>
  );
}
