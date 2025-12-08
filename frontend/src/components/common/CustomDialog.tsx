import { error_modal, success_modal } from "@/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CustomDialog({
  type = "error",
  onClose,
}: {
  type?: "error" | "success";
  onClose: () => void;
}) {
  const isError = type === "error";
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl w-[866px] h-[475px] flex flex-col items-center justify-center shadow-xl p-6">
        {/* Circle Icon */}
        {isError ? (
          <Image src={error_modal} alt="error" />
        ) : (
          <Image src={success_modal} alt="success" />
        )}

        {/* Titles */}
        {isError ? (
          <>
            <p className="mt-4 font-nunito font-semibold text-[28px] leading-none text-gray-800 text-center">
              Oops
            </p>
            <p className="mt-2 font-nunito font-semibold text-[28px] leading-none text-red-600 text-center">
              Something went wrong
            </p>
          </>
        ) : (
          <>
            <p className="mt-4 font-nunito font-semibold text-[28px] leading-none text-gray-800 text-center">
              Message sent
            </p>
            <p className="mt-2 font-nunito font-semibold text-[28px] leading-none text-[#017345] text-center">
              Successfully
            </p>
          </>
        )}

        {/* Buttons */}
        {isError ? (
          <button
            onClick={onClose}
            className="mt-6 w-[414px] h-[45px] bg-gray-800 text-white rounded-lg cursor-pointer"
          >
            Try Again
          </button>
        ) : (
          <>
            <button
              onClick={onClose}
              className="mt-6 w-[414px] h-[45px] bg-gray-800 text-white rounded-lg cursor-pointer"
            >
              Done
            </button>
            <button
              className="mt-3 w-[414px] h-[45px] bg-white text-gray-800 border border-[#C5CAD3] rounded-lg cursor-pointer"
              onClick={() => router.push("/")}
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}
