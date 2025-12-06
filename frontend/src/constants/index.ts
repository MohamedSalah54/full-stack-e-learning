//Home Page
import {
  banner_1_img,
  banner_2_img,
  data_science_img,
  digital_marketing_img,
  full_stack_img,
  sidebar_create_course_white,
  sidebar_earnings_white,
  sidebar_help_white,
  sidebar_home_white,
  sidebar_message_white,
  sidebar_mycoursees_white,
  sidebar_settings_white,
} from "@/assets";
import { FaUser, FaUsers, FaBuilding, FaQuoteLeft } from "react-icons/fa";

export const heroSlides = [
  {
    image: banner_1_img,
    title: "Skills that drive you forward",
    description:
      "Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive.",
  },
  {
    image: banner_2_img,
    title: "Learning that gets you",
    description:
      "Skills for your present (and your future). Get started with us.",
  },
];

export const heroCategories = [
  {
    title: "Full Stack Web Development",
    image: full_stack_img,
    rating: 5.0,
    reviews: 2100,
  },
  {
    title: "Digital Marketing",
    image: digital_marketing_img,
    rating: 4.0,
    reviews: 980,
  },
  {
    title: "Data Science",
    image: data_science_img,
    rating: 4.5,
    reviews: 1234,
  },
];

export const heroPlans = [
  {
    name: "Personal Plan",
    icon: FaUser,
    type: "For you",
    price: "Starting at E£204.00 per month",
    features: [
      " Access to 26,000+ top courses",
      "Certification prep",
      "Goal-focused recommendations",
      "AI-powered coding exercises",
    ],
    color: "bg-gray-800",
  },
  {
    name: "Team Plan",
    icon: FaUsers,
    type: "For your team",
    price: "E£1,490.00 a month per user",
    features: [
      "Access to 13,000+ top courses",
      " Certification prep",
      "Goal-focused recommendations",
      "AI-powered coding exercises",
      "Analytics and adoption reports",
    ],
    color: "bg-gray-600",
  },
  {
    name: "Organize Plan",
    icon: FaBuilding,
    type: "For your organization",
    price: "Contact sales for price",
    features: [
      "Access to 30,000+ top courses",
      "Certification prep",
      "Goal-focused recommendations",
      "AI-powered coding exercises",
      "Advanced analytics and insights",
      "Dedicated customer success team",
      "International course collection featuring 15 languages",
      "Customizable content",
      "Hands-on tech training with add-on",
      "Strategic implementation services with add-on",
    ],
    color: "bg-gray-400",
  },
];

export const heroTestimonials = [
  {
    id: 1,
    text: `This platform has completely transformed how I work. `,
    highlight: `Productivity skyrocketed`,
    name: "John Doe",
  },
  {
    id: 2,
    text: `I’ve never felt so organized. `,
    highlight: `The tools just make sense`,
    name: "Alvin Lim",
  },
  {
    id: 3,
    text: `After switching, our team felt more connected and focused. `,
    highlight: `Communication improved instantly`,
    name: "William A. Wachlin",
  },
  {
    id: 4,
    text: `A must-have for any growing business. `,
    highlight: `It's simple yet powerful`,
    name: "Ian Stevens",
  },
];

export const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-us" },
  { name: "Events", href: "/events" },
  { name: "Courses", href: "/courses" },
  { name: "Contact Us", href: "/contact-us" },
];

export const avatarColors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
];

export const navUser = [
  { id: "courses", label: "My Courses" },
  { id: "wishlist", label: "Wishlist" },
  { id: "messages", label: "Messages" },
  { id: "history", label: "Purchase History" },
  { id: "settings", label: "Settings" },
];

export const coursesPurchaseHistory = [
  {
    id: 1,
    title: "Next.js Mastery Course",
    rating: 4.8,
    reviews: 210,
    lessons: 40,
    students: 500,
    price: 59,
    image: "/image.png",
  },
  {
    id: 2,
    title: "React Advanced Workshop",
    rating: 4.7,
    reviews: 180,
    lessons: 35,
    students: 420,
    price: 49,
    image: "/image.png",
  },
];

export const sidebarList = [
  {
    id: 1,
    title: "Dashboard",
    image: sidebar_home_white,
    path: "/instructor/dashboard/",
  },
  {
    id: 2,
    title: "Create New Course",
    image: sidebar_create_course_white,
    path: "/instructor/course/create",
  },
  {
    id: 3,
    title: "My Courses",
    image: sidebar_mycoursees_white,
    path: "/instructor/myCourses",
  },
  {
    id: 4,
    title: "Earnings",
    image: sidebar_earnings_white,
    path: "/instructor/earning/",
  },
  {
    id: 5,
    title: "Messages",
    image: sidebar_message_white,
    path: "/instructor/messages/",
  },
  {
    id: 6,
    title: "Settings",
    image: sidebar_settings_white,
    path: "/instructor/settings/",
  },
  {
    id: 7,
    title: "Help",
    image: sidebar_help_white,
    path: "/instructor/help/",
  },
];

export const records = [
  { id: 1, date: "21 Sep, 2021 at 2:14 AM", method: "Mastercard", amount: "$1,200", status: "Pending" },
  { id: 2, date: "22 Sep, 2021 at 4:00 PM", method: "Visa", amount: "$800", status: "Completed" },
  { id: 3, date: "23 Sep, 2021 at 10:30 AM", method: "PayPal", amount: "$500", status: "Canceled" },
  { id: 4, date: "24 Sep, 2021 at 1:45 PM", method: "Mastercard", amount: "$2,000", status: "Completed" },
  { id: 5, date: "25 Sep, 2021 at 3:20 PM", method: "Visa", amount: "$1,500", status: "Pending" },
  { id: 6, date: "26 Sep, 2021 at 5:10 PM", method: "PayPal", amount: "$700", status: "Completed" },
  { id: 7, date: "27 Sep, 2021 at 11:00 AM", method: "Mastercard", amount: "$1,000", status: "Pending" },
];