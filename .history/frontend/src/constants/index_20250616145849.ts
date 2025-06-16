//Home Page
import { FaUser, FaUsers, FaBuilding , FaQuoteLeft} from "react-icons/fa";


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
    price: "Starting at E£204.00 per month",
    features: [" Access to 26,000+ top courses", "Certification prep", "Goal-focused recommendations","AI-powered coding exercises"],
    color: "bg-gray-800", 
  },
  {
    name: "Team Plan",
    icon: FaUsers,
    type: "For your team",
    price: "E£1,490.00 a month per user",
    features: ["Access to 13,000+ top courses", " Certification prep", "Goal-focused recommendations","AI-powered coding exercises","Analytics and adoption reports"],
    color: "bg-gray-600",
  },
  {
    name: "Organize Plan",
    icon: FaBuilding,
    type: "For your organization",
    price: "Contact sales for price",
    features: ["Access to 30,000+ top courses", "Certification prep", "Goal-focused recommendations","AI-powered coding exercises","Advanced analytics and insights","Dedicated customer success team","International course collection featuring 15 languages","Customizable content","Hands-on tech training with add-on","Strategic implementation services with add-on"],
    color: "bg-gray-400",
  },
];

export const heroTestimonials = [
  {
    id: 1,
    text: `This platform has completely transformed how I work. `,
    highlight: `Productivity skyrocketed`,
    name: "Ali ",
  },
  {
    id: 2,
    text: `I’ve never felt so organized. `,
    highlight: `The tools just make sense`,
    name: "Sara",
  },
  {
    id: 3,
    text: `After switching, our team felt more connected and focused. `,
    highlight: `Communication improved instantly`,
    name: "Omar",
  },
  {
    id: 4,
    text: `A must-have for any growing business. `,
    highlight: `It's simple yet powerful`,
    name: "Laila",
  },
];

