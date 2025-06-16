 import { heroTestimonials } from "@/constants";
import { FaQuoteLeft } from "react-icons/fa";

export default function HeroTestimonials() {
  return (
    <section className="w-full bg-gray-50 py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">What our users say</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {heroTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between h-full"
            >
              {/* Quote icon */}
              <div className="text-gray-300 text-4xl mb-4">
                <FaQuoteLeft />
              </div>

              {/* Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {item.text}
                <strong className="font-semibold text-gray-900"> {item.highlight}</strong>
              </p>

              {/* Avatar */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 bg-gray-800 text-white flex items-center justify-center rounded-full text-lg font-bold">
                  {item.name[0]}
                </div>
                <span className="text-gray-800 font-medium">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
