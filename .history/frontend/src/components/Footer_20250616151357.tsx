import { FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700">
      {/* Top Footer */}
      <div className="w-full px-6 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>Blog</li>
              <li>Investors</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Discover</h3>
            <ul className="space-y-2 text-sm">
              <li>What We Offer</li>
              <li>Testimonials</li>
              <li>Our Pricing</li>
              <li>New Features</li>
              <li>Partners</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Udemy for Business</h3>
            <ul className="space-y-2 text-sm">
              <li>Enterprise</li>
              <li>Teams</li>
              <li>Education</li>
              <li>Government</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal & Accessibility</h3>
            <ul className="space-y-2 text-sm">
              <li>Terms</li>
              <li>Privacy Policy</li>
              <li>Accessibility</li>
              <li>Sitemap</li>
            </ul>
          </div>
        </div>

        {/* Bottom note below columns */}
        <div className="mt-12 text-sm text-gray-500">
          © 2025 Your Company Name. All rights reserved.
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white" />

      {/* Bottom Footer */}
      <div className="bg-gray-800 text-white py-4 px-6 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-center text-sm">
        {/* Left side */}
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <span>© 2025 Your Company</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <FaGlobe className="w-4 h-4" />
          <span>English</span>
        </div>
      </div>
    </footer>
  );
}
