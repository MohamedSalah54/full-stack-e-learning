import { FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700">
      {/* Top Footer */}
     {/* Footer العلوي */}
<div className="w-full bg-gray-800 text-white py-12 px-6">
  <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
    {/* العمود الأول */}
    <div>
      <h3 className="font-semibold mb-4">About</h3>
      <ul className="space-y-2 text-sm">
        <li>About Us</li>
        <li>Careers</li>
        <li>Contact Us</li>
        <li>Blog</li>
        <li>Investors</li>
      </ul>
    </div>

    {/* العمود الثاني */}
    <div>
      <h3 className="font-semibold mb-4">Discover</h3>
      <ul className="space-y-2 text-sm">
        <li>Categories</li>
        <li>New Courses</li>
        <li>Community</li>
        <li>Mobile App</li>
      </ul>
    </div>

    {/* العمود الثالث */}
    <div>
      <h3 className="font-semibold mb-4">Udemy for Business</h3>
      <ul className="space-y-2 text-sm">
        <li>Enterprise</li>
        <li>Teams</li>
        <li>Instructor</li>
        <li>Government</li>
      </ul>
    </div>

    {/* العمود الرابع */}
    <div>
      <h3 className="font-semibold mb-4">Legal & Accessibility</h3>
      <ul className="space-y-2 text-sm">
        <li>Terms</li>
        <li>Privacy Policy</li>
        <li>Accessibility</li>
        <li>Sitemap</li>
      </ul>
    </div>

    {/* العمود الخامس (اختياري) */}
    <div>
      <h3 className="font-semibold mb-4">More</h3>
      <ul className="space-y-2 text-sm">
        <li>Help</li>
        <li>Affiliates</li>
        <li>Resources</li>
        <li>Partners</li>
      </ul>
    </div>
  </div>

  {/* الخط الفاصل */}
  <div className="border-t border-white my-6" />

  {/* نص تحت الأعمدة */}
  <p className="text-sm text-center">Join millions of learners from around the world.</p>
</div>


      {/* Divider */}
      <div className="border-t border-white" />

      {/* Bottom Footer */}
      {/* Footer السفلي */}
<div className="w-full bg-gray-800 text-white px-6 py-4 flex justify-between items-center text-sm">
  <div className="flex items-center gap-2">
    <img src="/logo.svg" alt="Logo" className="h-6" />
    <span>© 2025 YourSite. All rights reserved.</span>
  </div>

  <div className="flex items-center gap-2">
    🌐
    <span>English</span>
  </div>
</div>

    </footer>
  );
}
