import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function BookService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);

  const [formData, setFormData] = useState({
    bookingDate: "",
    bookingTime: "",
    vehicleNumber: "",
    note: "",
  });

  // Fetch Selected Service
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await API.get("/services");

        const selected = response.data.services.find(
          (item) => item._id === id
        );

        setService(selected);
      } catch (error) {
        console.log(error);
      }
    };

    fetchService();
  }, [id]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Booking
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/bookings/book", {
        serviceId: id,
        bookingDate: formData.bookingDate,
        bookingTime: formData.bookingTime,
        vehicleNumber: formData.vehicleNumber,
        note: formData.note,
      });

      toast.success("Booking Created Successfully 🚗");

      navigate("/my-bookings");

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Booking Failed"
      );
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-2xl bg-slate-950">
        Loading Service...
      </div>
    );
  }

  return (
    <section className="bg-slate-950 min-h-screen pt-32 pb-20 text-white">
      <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl p-8 shadow-2xl">

        {/* Service Image */}

        <img
          src={
            service.image && service.image !== ""
              ? service.image
              : "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=900"
          }
          alt={service.serviceName}
          className="rounded-xl mb-8 w-full h-72 object-cover"
        />

        {/* Service Details */}

        <h2 className="text-4xl font-bold">
          {service.serviceName}
        </h2>

        <p className="text-gray-400 mt-3 text-lg">
          {service.description}
        </p>

        <div className="flex justify-between mt-6 text-xl">

          <span className="text-blue-400 font-bold">
            ₹{service.price}
          </span>

          <span className="text-green-400 font-semibold">
            {service.duration}
          </span>

        </div>

        {/* Booking Form */}

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">

          {/* Booking Date */}

          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              📅 Booking Date
            </label>

            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Booking Time */}

          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              ⏰ Booking Time
            </label>

            <input
              type="time"
              name="bookingTime"
              value={formData.bookingTime}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Vehicle Number */}

          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              🚗 Vehicle Number
            </label>

            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="Example: AP39AB1234"
              required
              className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Notes */}

          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              📝 Additional Notes
            </label>

            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows="4"
              placeholder="Any special instructions..."
              className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-lg text-lg font-semibold"
          >
            🚗 Confirm Booking
          </button>

        </form>

      </div>
    </section>
  );
}

export default BookService;