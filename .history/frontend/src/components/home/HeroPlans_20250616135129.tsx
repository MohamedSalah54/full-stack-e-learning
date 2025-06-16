import {
  FaUser,
  FaUsers,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";

const plans = heropla

export default function HeroPlans() {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-2">Choose Your Plan</h1>
        <span className="text-gray-600 mb-12 block">
          Flexible pricing for individuals, teams, and organizations.
        </span>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* Top Colored Border */}
              <div className={`h-2 bg-${plan.color}`}></div>

              <div className="p-6 flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
                <div className="mb-4">{plan.icon}</div>
                <p className="text-lg font-bold text-gray-800 mb-4">{plan.price}</p>

                <button className="bg-black text-white px-6 py-2 rounded-full mb-6 hover:bg-gray-800 transition">
                  Try it free
                </button>

                <ul className="text-left space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <FaCheckCircle className="text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
