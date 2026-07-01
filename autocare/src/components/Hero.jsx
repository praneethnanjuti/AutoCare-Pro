import { Link } from "react-router-dom";
import heroCar from "../assets/hero-car.webp";

function Hero() {
  return (
    <section className="bg-slate-900 text-white min-h-[90vh] pt-24 flex items-center">
      <div className="max-w-7xl mx-auto px-8 py-16 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div>

          <span className="bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
            🇮🇳 India's Trusted Car Service Platform
          </span>

          <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold leading-tight">
            Premium Car
            <br />
            <span className="text-blue-500">
              Service & Maintenance
            </span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg leading-8">
            Book trusted car services online with certified mechanics.
            From Car Wash to Engine Repair, AutoCare Pro keeps your
            vehicle running like new.
          </p>

          <div className="mt-10 flex gap-5">

            <Link
              to="/services"
              className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-xl font-semibold shadow-lg"
            >
              🚗 Book Service
            </Link>

            <Link
              to="/services"
              className="border border-white hover:bg-white hover:text-black transition px-8 py-4 rounded-xl font-semibold"
            >
              View Services
            </Link>

          </div>

          <div className="grid grid-cols-3 gap-8 mt-12">

            <div>
              <h2 className="text-4xl font-bold text-blue-500">
                5000+
              </h2>

              <p className="text-gray-400 mt-2">
                Happy Customers
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-blue-500">
                10+
              </h2>

              <p className="text-gray-400 mt-2">
                Years Experience
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-blue-500">
                24×7
              </h2>

              <p className="text-gray-400 mt-2">
                Customer Support
              </p>
            </div>

          </div>

        </div>

        {/* Right Image */}

        <div className="flex justify-center">

          <img
            src={heroCar}
            alt="AutoCare Pro"
            className="w-full max-w-2xl drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)]"
          />

        </div>

      </div>
    </section>
  );
}

export default Hero;