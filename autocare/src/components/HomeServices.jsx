import { Link } from "react-router-dom";

function HomeServices() {
  const services = [
    {
      icon: "🚗",
      title: "Car Wash",
      desc: "Premium exterior & interior cleaning",
    },
    {
      icon: "🛢️",
      title: "Oil Change",
      desc: "Engine oil replacement with quality oils",
    },
    {
      icon: "🔧",
      title: "Engine Repair",
      desc: "Professional engine diagnostics & repair",
    },
    {
      icon: "⚙️",
      title: "Wheel Alignment",
      desc: "Improve safety and tire life",
    },
  ];

  return (
    <section className="bg-slate-950 py-20 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Our Popular Services
        </h2>

        <p className="text-center text-gray-400 mt-3 mb-12">
          Quality car care with experienced technicians.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl p-8 text-center shadow-xl hover:scale-105 duration-300"
            >
              <div className="text-6xl mb-5">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold">
                {service.title}
              </h3>

              <p className="text-gray-400 mt-3">
                {service.desc}
              </p>
            </div>
          ))}

        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold"
          >
            View All Services →
          </Link>
        </div>

      </div>
    </section>
  );
}

export default HomeServices;