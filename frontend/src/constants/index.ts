//Home Page
import {
  banner_1_img,
  banner_2_img,
  data_science_img,
  digital_marketing_img,
  full_stack_img,
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

export const courses = [
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
