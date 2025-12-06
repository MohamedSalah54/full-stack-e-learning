// components/AboutInstructor.tsx
import Image from "next/image";

interface AboutInstructorProps {
  instructorName: string;
  instructorImage: string;
  stats?: { label: string; value: number }[];
  whatYouWillLearn?: string[];
  courseAudience?: string[];
}

const AboutInstructor: React.FC<AboutInstructorProps> = ({
  instructorName,
  instructorImage,
  stats = [
    { label: "Total learners", value: "102,332" },
    { label: "Reviews", value: "10,541" },
  ],
  whatYouWillLearn = [
    "Understand basics",
    "Improve skills",
    "Build projects",
    "Get certificate",
  ],
  courseAudience = [
    "Beginners",
    "Intermediate learners",
    "Professionals",
    "Anyone interested",
  ],
}) => {
  return (
    <div className="px-6 md:px-20 lg:px-32 py-8 space-y-2 text-black">
      {/* About the Instructor */}
      <h1
        className="font-extrabold text-[40px] leading-none text-[#232323] font-nunito mt-5 mb-5"
        style={{
          fontSize: 32,
          lineHeight: "normal",
          width: 400,
          opacity: 1,
        }}
      >
        About the Instructor
      </h1>

      {/* Instructor Name */}
      <p
        className="font-nunito "
        style={{
          fontSize: 24,
          lineHeight: "normal",
          width: 230,
          opacity: 1,
        }}
      >
        {instructorName}
      </p>

      <div className="flex items-start space-x-6">
        {/* Left side: stats + button under them */}
        <div className="flex flex-col space-y-10">
          {/* Stats */}
          <div className="flex space-x-8 mt-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-nunito font-bold text-lg">
                  {stat.value}
                </span>
                <span className="font-nunito font-medium">{stat.label}</span>
              </div>
            ))}
          </div>

          <button className="w-[201px] h-[55px] bg-gray-800 text-white rounded-[4px] px-6 py-3 flex items-center justify-center gap-2 cursor-pointer">
            Visit Instructor Page
          </button>
        </div>

        <div className="w-[200px] h-full -mt-10">
          <div className="w-[250px] h-[250px] rounded-full bg-gray-800 overflow-hidden">
            <Image
              src={instructorImage}
              alt={instructorName}
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* What You Will Learn */}
      <h2
        className="font-nunito font-extrabold mt-8"
        style={{
          fontSize: 24,
          lineHeight: "normal",
          width: 400,
          opacity: 1,
        }}
      >
        What You Will Learn
      </h2>
      <ul className="space-y-2">
        {whatYouWillLearn.map((item, idx) => (
          <li key={idx} className="flex items-center space-x-2">
            <span className="text-black font-bold">✔</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Who This Course Is For */}
      <h2
        className="font-nunito font-extrabold mt-8"
        style={{
          fontSize: 24,
          lineHeight: "normal",
          width: 400,
          opacity: 1,
        }}
      >
        Who This Course Is For
      </h2>
      <p className="font-nunito">{courseAudience.join(", ")}.</p>
      <button className="w-[150px] h-[40px] bg-green-600 text-white rounded-[4px] px-6 py-3 flex items-center justify-center gap-2 mt-4 cursor-pointer">
        Add To Cart
      </button>
    </div>
  );
};

export default AboutInstructor;
