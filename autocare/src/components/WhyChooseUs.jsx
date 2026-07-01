import { FaTools, FaUserShield, FaClock, FaMoneyBillWave } from "react-icons/fa";

const features = [
  {
    icon: <FaTools size={40} className="text-blue-500" />,
    title: "Certified Mechanics",
    desc: "Experienced professionals for all car brands.",
  },
  {
    icon: <FaUserShield size={40} className="text-blue-500" />,
    title: "Trusted Service",
    desc: "Thousands of happy customers across India.",
  },
  {
    icon: <FaClock size={40} className="text-blue-500" />,
    title: "Quick Delivery",
    desc: "Fast and reliable servicing with timely updates.",
  },
  {
    icon: <FaMoneyBillWave size={40} className="text-blue-500" />,
    title: "Affordable Pricing",
    desc: "Transparent pricing with no hidden charges.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Why Choose AutoCare Pro?
        </h2>

        <p className="text-center text-gray-400 mt-3 mb-12">
          We provide trusted, affordable, and professional car services across India.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-8 text-center hover:scale-105 transition duration-300 shadow-lg"
            >
              <div className="flex justify-center mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-400">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;