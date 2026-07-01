import { FaCalendarCheck, FaCarSide, FaTools, FaSmile } from "react-icons/fa";

const steps = [
  {
    icon: <FaCalendarCheck size={45} className="text-blue-500" />,
    title: "Book Online",
    desc: "Choose your required service and book an appointment in just a few clicks.",
  },
  {
    icon: <FaCarSide size={45} className="text-blue-500" />,
    title: "Vehicle Pickup",
    desc: "Our team picks up your vehicle from your location if required.",
  },
  {
    icon: <FaTools size={45} className="text-blue-500" />,
    title: "Professional Service",
    desc: "Certified mechanics inspect and service your vehicle using quality parts.",
  },
  {
    icon: <FaSmile size={45} className="text-blue-500" />,
    title: "Delivery",
    desc: "Your serviced vehicle is delivered safely and on time.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-slate-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          How It Works
        </h2>

        <p className="text-gray-400 text-center mt-3 mb-12">
          Book your service in four simple steps.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl p-8 text-center shadow-lg hover:-translate-y-2 transition duration-300"
            >
              <div className="flex justify-center mb-5">
                {step.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {step.title}
              </h3>

              <p className="text-gray-400">
                {step.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;