"use client";
import CustomDialog from "@/components/common/CustomDialog";
import { StepperContainer } from "@/components/organisms/StepperContainer";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"error" | "success">("error");

  const openSuccess = () => {
    setType("success");
    setOpen(true);
  };

  const openError = () => {
    setType("error");
    setOpen(true);
  };

  return (
    <div className="mb-10 mt-10 flex justify-center">
      <div className="w-full max-w-[600px] mx-auto">
        <StepperContainer onSuccess={openSuccess} onError={openError} />

        {open && <CustomDialog type={type} onClose={() => setOpen(false)} />}
      </div>
    </div>
  );
}
