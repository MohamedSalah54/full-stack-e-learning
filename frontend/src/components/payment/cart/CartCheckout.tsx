import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";

const CartCheckout = () => {
  return (
    <div className="w-full flex flex-col items-start">
      {/* ---- TITLE ---- */}
      <h2
        className="
        text-[#232323] font-nunito font-semibold
        text-[28px] leading-[100%] mb-4
        w-[120px] h-[38px]
      "
      >
        Checkout
      </h2>

      {/* ---- COURSE BOX ---- */}
      <div
        className="
        w-[866px] h-[151px]
        border border-[#C5CAD3]   rounded-[8px]
        flex items-center gap-6 px-4 py-3 bg-gray-200
      "
      >
        {/* Course Image */}
        <div className="w-[202px] h-[136px] rounded-[8px] overflow-hidden">
          <Image
            src="/image.png"
            alt="course"
            width={202}
            height={136}
            className="rounded-[8px] object-cover"
          />
        </div>

        {/* Right Side Content */}
        <div className="flex flex-col flex-1 ">
          <p className="text-[16px] font-nunito text-[#576175] mb-5">
            Course by:{" "}
            <span className="font-semibold text-[#232323]">
              Instructor name
            </span>
          </p>

          <p
            className="
            font-nunito font-semibold text-[20px] leading-[100%]
            w-[449px] h-[27px] mt-1
          "
          >
            Course Title Goes Here
          </p>

          <p className="mt-2 font-nunito font-semibold text-[18px] text-green-600">
            $49.99
          </p>
        </div>

        {/* Delete Icon */}
        <button className="bg-red-200 hover:bg-red-300 text-[#232323] p-2 rounded-full flex items-center justify-center cursor-pointer">
          <FiTrash2 size={22} />
        </button>
      </div>

      {/* ---- LINE ---- */}
      <div className="w-[866px] h-[1px] bg-gray-300 my-6" />

      {/* ---- ORDER SUMMARY BOX ---- */}
      <div
        className="
            w-[566px] 
            p-4 
            flex flex-col 
            ml-[150px] 
            bg-white 
            rounded-lg
        "
      >
        {/* Title */}
        <h3
          className="
                font-nunito font-semibold text-[28px] text-[#232323]
                leading-[100%] mb-4
                w-[250px] h-[38px]
                "
        >
          Order Summary
        </h3>

        {/* Coupon Discount */}
        <div className="flex justify-between items-center border-b border-gray-300 pb-3">
          <p className="font-nunito text-[16px] font-semibold text-[#576175] ">
            Coupon Discount:
          </p>
          <span className="font-nunito text-[16px] font-semibold text-[#232323]">
            0%
          </span>
        </div>

        {/* Courses in cart */}
        <div className="flex justify-between items-center border-b border-gray-300 py-3">
          <p className="font-nunito text-[16px] font-semibold text-[#576175]">
            Courses in cart:
          </p>
          <span className="font-nunito text-[16px] font-semibold text-[#232323]">
            1
          </span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-3">
          <p className="font-nunito text-[16px] font-semibold text-[#232323]">
            Total
          </p>
          <span className="font-nunito text-[18px] font-semibold text-green-600">
            $99.98
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;
