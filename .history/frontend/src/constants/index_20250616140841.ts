//Home Page
import { FaUser, FaUsers, FaBuilding } from "react-icons/fa";

export const heroSlides = [
    {
        image: "/banner1.jpg",
        title: "Skills that drive you forward",
        description: "Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive.",
    },
    {
        image: "/banner2.jpg",
        title: "Learning that gets you",
        description: "Skills for your present (and your future). Get started with us.",
    },
];

export const heroCategories = [
    {
        title: "Full Stack Web Development",
        image: "/full-stack.jpg",
        rating: 5.0,
        reviews: 2100,
    },
    {
        title: "Digital Marketing",
        image: "/digital-marketing.jpg",
        rating: 4.0,
        reviews: 980,
    },
    {
        title: "Data Science",
        image: "/data-science.jpg",
        rating: 4.5,
        reviews: 1234,
    },
];


export const heroPlans = [
  {
    name: "Personal Plan",
    icon: FaUser,
    type: "For you",
    price: "$300/month",
    features: ["1 User", "Basic Support", "Access to core features"],
    color: "bg-gray-800", // ← لون الحافة العلوية
  },
  {
    name: "Team Plan",
    icon: FaUsers,
    type: "For your team",
    price: "$1400/month",
    features: ["Up to 10 Users", "Priority Support", "All features included"],
    color: "bg-gray-600",
  },
  {
    name: "Organize Plan",
    icon: FaBuilding,
    type: "For your organization",
    price: "Contact sales for price",
    features: ["Unlimited Users", "Dedicated Support", "Custom Solutions"],
    color: "bg-gray-400",
  },
];
