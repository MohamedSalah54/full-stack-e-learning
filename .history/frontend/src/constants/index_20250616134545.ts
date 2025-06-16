//Home Page
import { CheckCircle, User, Users, Building2 } from "lucide-react";

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
    icon: <User className="w-8 h-8 text-blue-600" />,
    price: "$300/month",
    features: ["1 User", "Basic Support", "Access to core features"],
    color: "blue-600",
  },
  {
    name: "Team Plan",
    icon: <Users className="w-8 h-8 text-green-600" />,
    price: "$1400/month",
    features: ["Up to 10 Users", "Priority Support", "All features included"],
    color: "green-600",
  },
  {
    name: "Organize Plan",
    icon: <Building2 className="w-8 h-8 text-purple-600" />,
    price: "Contact sales for price",
    features: ["Unlimited Users", "Dedicated Support", "Custom Solutions"],
    color: "purple-600",
  },
];