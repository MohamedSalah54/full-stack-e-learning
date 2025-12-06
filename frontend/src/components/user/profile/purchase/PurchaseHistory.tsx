"use client";
import React, { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, Star, Users } from "lucide-react";
import Image from "next/image";
import { creditCard, currencyDollar, playCircle } from "@/assets";
import { coursesPurchaseHistory } from "@/constants";
import CardHorizontal from "@/components/common/CardHorizontal";

const PurchaseHistory: React.FC = () => {
  const today = new Date();

  //DATE
  const getDaySuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const day = today.getDate();
  const suffix = getDaySuffix(day);
  const month = today.toLocaleString("en-GB", { month: "long" });
  const year = today.getFullYear();
  const time = today.toLocaleString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = `${day}${suffix} ${month}, ${year} at ${time}`;

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div
      className={`border rounded-lg bg-[#F3F4F6] shadow-sm mx-auto mt-10 flex flex-col justify-between w-[1320px] px-[20px] transition-all duration-500 relative`}
      style={{
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#C5CAD3",
        overflow: "hidden",
      }}
    >
      {!isOpen && (
        <div className="flex flex-col py-[15px] relative">
          <p
            className="
          w-[249px]
          h-[24px]
          relative
          top-[16.5px]
          left-[20px]
          font-inter
          font-normal
          text-[18px]
          leading-[24px]
          tracking-[-1.5%]
          text-black
          opacity-100
          mb-6
        "
          >
            {formattedDate}
          </p>

          <div className="flex gap-6 ml-[20px] mt-[10px]">
            <div className="flex items-center gap-2 w-[110px] h-[28px] text-gray-800">
              <Image src={playCircle} alt="courses" />
              <span className="text-sm font-medium">2 Courses</span>
            </div>

            <div className="flex items-center gap-2 w-[120px] h-[28px] text-gray-800">
              <Image src={currencyDollar} alt="currency" />
              <span className="text-sm font-medium">$58.00 USD</span>
            </div>

            <div className="flex items-center gap-2 w-[110px] h-[28px] text-gray-800">
              <Image src={creditCard} alt="credit" />
              <span className="text-sm font-medium">Credit Card</span>
            </div>
          </div>

          <button
            onClick={toggleOpen}
            className="absolute top-8 right-4 p-2 rounded-full hover:bg-gray-200 transition"
          >
            {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>
      )}

      {/* Animated container */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden`}
        style={{
          maxHeight: isOpen ? "650px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        {isOpen && (
          <>
            {(() => {
              const totalPrice = coursesPurchaseHistory.reduce((sum, c) => sum + c.price, 0);

              return (
                <>
                  {coursesPurchaseHistory.map((course) => (
                    <div
                      key={course.id}
                      className="flex flex-row justify-between items-start mt-12 gap-6 pb-6"
                    >
                      <CardHorizontal
                        image={course.image}
                        title={course.title}
                        rating={course.rating}
                        reviews={course.reviews}
                        lessons={course.lessons}
                        students={course.students}
                        price={course.price}
                      />

                      {/*  Header right */}
                      <div className="flex flex-col py-[15px] relative mr-20 mt-10">
                        <p
                          className="
                      w-[249px]
                      h-[24px]
                      relative
                      top-[16.5px]
                      left-[20px]
                      font-inter
                      font-normal
                      text-[18px]
                      leading-[24px]
                      tracking-[-1.5%]
                      text-black
                      opacity-100
                      mb-6
                    "
                        >
                          {formattedDate}
                        </p>

                        <div className="flex gap-6 ml-[20px] mt-[10px]">
                          <div className="flex items-center gap-2 w-[110px] h-[28px] text-gray-800">
                            <Image src={playCircle} alt="courses" />
                            <span className="text-sm font-medium">
                              {coursesPurchaseHistory.length} Courses
                            </span>
                          </div>

                          <div className="flex items-center gap-2 w-[120px] h-[28px] text-gray-800">
                            <Image src={currencyDollar} alt="currency" />
                            <span className="text-sm font-medium">
                              ${course.price}.00 USD
                            </span>
                          </div>

                          <div className="flex items-center gap-2 w-[110px] h-[28px] text-gray-800">
                            <Image src={creditCard} alt="credit" />
                            <span className="text-sm font-medium">
                              Credit Card
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* total price  */}
                  {coursesPurchaseHistory.length > 1 && (
                    <div className="border-t pt-4 w-fit ml-auto mr-45 mb-10">
                      <p className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        Total Price:
                        <Image
                          src={currencyDollar}
                          alt="currency"
                          className="w-5 h-5 text-black"
                        />
                        <span className="text-gray-800">{totalPrice}</span>
                      </p>
                    </div>
                  )}
                </>
              );
            })()}
          </>
        )}

        <button
          onClick={toggleOpen}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition"
        >
          <ChevronUp size={24} />
        </button>
      </div>
    </div>
  );
};

export default PurchaseHistory;
