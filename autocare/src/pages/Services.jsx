import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import carWash from "../assets/car-wash.jpg";
import oilChange from "../assets/oil-change.jpg";
import engineRepair from "../assets/engine-repair.jpg";
import wheelAlignment from "../assets/wheel-alignment.jpg";

const serviceImages = {
  "Car Wash": carWash,
  "Oil Change": oilChange,
  "Engine Repair": engineRepair,
  "Wheel Alignment": wheelAlignment,
};

function Services() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Services
  const fetchServices = async () => {
    try {
      const response = await API.get("/services");

      console.log(response.data);

      setServices(response.data.services);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-2xl">
        Loading Services...
      </div>
    );
  }

  return (
    <section className="bg-slate-950 min-h-screen py-20 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Our Services
        </h2>

        <p className="text-center text-gray-400 mt-3 mb-12">
          Professional car care at affordable prices.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service) => (

            <div
              key={service._id}
              className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden hover:scale-105 duration-300"
            >

              <img 
              src={service.image}
              alt={service.serviceName}
              className="h-56 w-full object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  {service.serviceName}
                </h3>

                <p className="text-gray-400 mt-2">
                  {service.description}
                </p>

                <div className="mt-4 flex justify-between">

                  <span className="text-blue-400 text-xl font-bold">
                    ₹{service.price}
                  </span>

                  <span className="text-green-400">
                    {service.duration}
                  </span>

                </div>

                <button
                  onClick={() => navigate(`/book/${service._id}`)}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold"
                >
                  Book Now
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Services;