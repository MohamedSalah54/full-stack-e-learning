import { contact_us } from "@/assets";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";

export default function ContactUs() {
  return (
    <div className="flex min-h-120">
      {/* left side */}
      <div className="w-[100%] h-170 flex items-center justify-center bg-gray-50">
        <div className="w-[85%] h-[85%] bg-white shadow-lg rounded-2xl flex overflow-hidden">
          {/* left */}
          <div className="w-[60%] p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
              <div className="w-16 h-[2px] bg-black mb-6"></div>

              <h3 className="text-lg font-medium mb-4">Leave us a message</h3>

              <form className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                ></textarea>
                <button
                  type="submit"
                  className="bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition cursor-pointer"
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* right */}
          <div className="w-[40%] bg-white p-8 flex flex-col justify-between">
            <Image
              src={contact_us}
              alt="About us"
              className="w-full object-cover relative"
            />
            <div className="space-y-5  absolute bottom-1/5 right-1/7 ">
              <div className="flex items-center space-x-3">
                <MapPin className="text-indigo-500" />
                <p>123 Street, Cairo, Egypt</p>
              </div>
              <div className="flex items-center space-x-3 ">
                <Phone className="text-indigo-500" />
                <p>+20 123 456 7890</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-indigo-500" />
                <p>info@example.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-indigo-500" />
                <p>Mon - Fri: 9 AM - 6 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* right side */}
      {/* <div className="w-[50%] h-screen mt-20 mr-5">
   
      </div> */}
    </div>
  );
}
