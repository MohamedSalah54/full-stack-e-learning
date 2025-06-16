import { heroPlans } from "@/constants";
import { FaCheck, FaArrowRight } from "react-icons/fa";

export default function HeroPlans() {
    return (
        <section className="w-full bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-4 text-center">Accelerate growth — for you or your organization</h1>
                <span className="text-gray-600 mb-12 block text-center">
                    Reach goals faster with one of our plans or programs. Try one free today or contact sales to learn more.
                </span>

                <div className="grid md:grid-cols-3 gap-8">
                    {heroPlans.map((plan, index) => {
                        const Icon = plan.icon;
                        return (
                            <div
                                key={index}
                                className="rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300 flex flex-col min-h-[550px]"
                            >
                                {/* Top Border */}
                                <div className={`h-2 ${plan.color}`}></div>

                                <div className="p-6 flex flex-col flex-grow">
                                    {/* Title Section */}
                                    <div className="mb-6 text-center">
                                        <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
                                        <div className="flex justify-center items-center gap-2 text-xs text-gray-600">
                                            <Icon className="w-4 h-4" />
                                            <span className="capitalize">{plan.type}</span>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <p className="text-2xl font-bold text-gray-900 text-center mb-6">
                                        {plan.price}
                                    </p>

                                    {/* Button */}
                                    <div className="flex justify-center mb-6">
                                        <button className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition">
                                            Try it free
                                            <FaArrowRight className="w-3 h-3" />
                                        </button>
                                    </div>

                                    {/* Features */}
                                    <ul className="text-sm text-gray-700 space-y-3">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <FaCheck className="text-gray-400 w-4 h-4" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Spacer to push features down */}
                                    <div className="flex-grow" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
