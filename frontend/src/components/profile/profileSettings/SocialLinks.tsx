import { Facebook, Instagram, Youtube, Twitter, X } from "lucide-react";

export default function SocialLinks() {
  return (
    <div
      className="rounded-md p-6 flex flex-col gap-6 ml-[-25px]"
      style={{
        width: "866px",
        height: "345px",
        opacity: 1,
      }}
    >
      <h3 className="font-nunito font-semibold text-[24px] leading-[100%] text-gray-900 opacity-100">
        Social Links
      </h3>

      <div className="flex flex-col gap-5 mt-2">
        {/* Facebook */}
        <div className="flex items-center w-full h-[45px] border border-gray-300 rounded-md overflow-hidden">
          <div className="flex items-center justify-center gap-2 bg-gray-800 text-white px-3 h-full">
            <Facebook size={20} />
          </div>
          <input
            type="url"
            placeholder="Facebook profile link (Optional)"
            className="flex-1 h-full px-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Instagram */}
        <div className="flex items-center w-full h-[45px] border border-gray-300 rounded-md overflow-hidden">
          <div className="flex items-center justify-center gap-2 bg-gray-800 text-white px-3 h-full">
            <Instagram size={20} />
          </div>
          <input
            type="url"
            placeholder="Instagram profile link (Optional)"
            className="flex-1 h-full px-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* X (Twitter) */}
        <div className="flex items-center w-full h-[45px] border border-gray-300 rounded-md overflow-hidden">
          <div className="flex items-center justify-center gap-2 bg-gray-800 text-white px-3 h-full">
            <X size={20} />
          </div>
          <input
            type="url"
            placeholder="X profile link (Optional)"
            className="flex-1 h-full px-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* YouTube */}
        <div className="flex items-center w-full h-[45px] border border-gray-300 rounded-md overflow-hidden">
          <div className="flex items-center justify-center gap-2 bg-gray-800 text-white px-3 h-full">
            <Youtube size={20} />
          </div>
          <input
            type="url"
            placeholder="YouTube channel link (Optional)"
            className="flex-1 h-full px-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
