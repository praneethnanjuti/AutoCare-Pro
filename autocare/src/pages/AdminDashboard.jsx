import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

function AdminDashboard() {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [serviceData, setServiceData] = useState({
    serviceName: "",
    description: "",
    price: "",
    duration: "",
    image: "",
  });

  // ==========================
  // Fetch Services
  // ==========================

  const fetchServices = async () => {
    try {
      const res = await API.get("/services");
      setServices(res.data.services);
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Fetch Bookings
  // ==========================

  const fetchBookings = async () => {
  try {
    const res = await API.get("/bookings/my-bookings");
    setBookings(res.data.bookings);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchServices();
    fetchBookings();
  }, []);

  // ==========================
  // Handle Input
  // ==========================

  const handleChange = (e) => {
    setServiceData({
      ...serviceData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // Add Service
  // ==========================

  const addService = async (e) => {
    e.preventDefault();

    try {
      await API.post("/services/add", serviceData);

      toast.success("Service Added Successfully");

      setServiceData({
        serviceName: "",
        description: "",
        price: "",
        duration: "",
        image: "",
      });

      fetchServices();

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to Add Service"
      );
    }
  };

  // ==========================
  // Delete Service
  // ==========================

  const deleteService = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmDelete) return;

    try {

      const response = await API.delete(
        `/services/delete/${id}`
      );

      toast.success(response.data.message);

      fetchServices();

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to Delete Service"
      );

    }

  };
// ==========================
// Update Booking Status
// ==========================

const updateStatus = async (id, status) => {
  try {
    const response = await API.put(
      `/bookings/status/${id}`,
      { status }
    );

    toast.success(response.data.message);

    fetchBookings();

  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to update booking"
    );

  }
};
  return (
    <section className="bg-slate-950 min-h-screen pt-28 pb-20 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-center mb-12">
          👨‍💼 Admin Dashboard
        </h1>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          <div className="bg-slate-900 rounded-xl p-6 text-center">
            <h2 className="text-3xl font-bold text-blue-400">
              {services.length}
            </h2>
            <p>Total Services</p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 text-center">
            <h2 className="text-3xl font-bold text-green-400">
              {bookings.length}
            </h2>
            <p>My Bookings</p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 text-center">
            <h2 className="text-3xl font-bold text-yellow-400">
              {
                bookings.filter(
                  (booking) => booking.status === "Pending"
                ).length
              }
            </h2>

            <p>Pending</p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 text-center">
            <h2 className="text-3xl font-bold text-purple-400">
              {
                bookings.filter(
                  (booking) => booking.status === "Completed"
                ).length
              }
            </h2>

            <p>Completed</p>
          </div>

        </div>

        {/* Add Service */}

        <div className="bg-slate-900 rounded-2xl p-8 mb-12">

          <h2 className="text-3xl font-bold mb-6">
            ➕ Add New Service
          </h2>

          <form
            onSubmit={addService}
            className="grid md:grid-cols-2 gap-5"
          >

            <input
              type="text"
              name="serviceName"
              placeholder="Service Name"
              value={serviceData.serviceName}
              onChange={handleChange}
              className="p-4 rounded-lg bg-slate-800"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={serviceData.price}
              onChange={handleChange}
              className="p-4 rounded-lg bg-slate-800"
              required
            />

            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={serviceData.duration}
              onChange={handleChange}
              className="p-4 rounded-lg bg-slate-800"
              required
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={serviceData.image}
              onChange={handleChange}
              className="p-4 rounded-lg bg-slate-800"
            />

            <textarea
              name="description"
              placeholder="Description"
              rows="3"
              value={serviceData.description}
              onChange={handleChange}
              className="md:col-span-2 p-4 rounded-lg bg-slate-800"
              required
            />

            <button
              type="submit"
              className="md:col-span-2 bg-blue-600 hover:bg-blue-700 py-4 rounded-lg text-lg font-bold"
            >
              ➕ Add Service
            </button>

          </form>

        </div>

        {/* Services */}

        <h2 className="text-3xl font-bold mb-6">
          🚗 Available Services
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map((service) => (

            <div
              key={service._id}
              className="bg-slate-900 rounded-xl p-6 shadow-lg"
            >

              <h3 className="text-2xl font-bold text-blue-400">
                {service.serviceName}
              </h3>

              <p className="text-gray-400 mt-3">
                {service.description}
              </p>

              <div className="flex justify-between mt-4">

                <span className="font-bold text-green-400">
                  ₹{service.price}
                </span>

                <span>
                  {service.duration}
                </span>

              </div>

              <button
                onClick={() => deleteService(service._id)}
                className="mt-6 w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition"
              >
                🗑 Delete Service
              </button>

            </div>

          ))}
{/* ========================== */}
{/* All Bookings */}
{/* ========================== */}

<div className="mt-16">

  <h2 className="text-3xl font-bold mb-6">
    📋 All Bookings
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    {bookings.map((booking) => (

      <div
        key={booking._id}
        className="bg-slate-900 rounded-xl p-6 shadow-lg"
      >

        <h3 className="text-2xl font-bold text-blue-400">
          {booking.user?.name}
        </h3>

        <p className="text-gray-400">
          {booking.user?.email}
        </p>

        <hr className="my-4 border-slate-700" />

        <p>
          <strong>🚗 Service:</strong>{" "}
          {booking.service?.serviceName}
        </p>

        <p>
          <strong>📅 Date:</strong>{" "}
          {booking.bookingDate}
        </p>

        <p>
          <strong>⏰ Time:</strong>{" "}
          {booking.bookingTime}
        </p>

        <p>
          <strong>🚘 Vehicle:</strong>{" "}
          {booking.vehicleNumber}
        </p>

        <p className="mt-3">
          <strong>Status:</strong>{" "}
          <span
            className={
              booking.status === "Pending"
                ? "text-yellow-400"
                : booking.status === "Completed"
                ? "text-green-400"
                : "text-red-400"
            }
          >
            {booking.status}
          </span>
        </p>

        {booking.status === "Pending" && (
          <button
            onClick={() =>
              updateStatus(
                booking._id,
                "Completed"
              )
            }
            className="mt-5 w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold"
          >
            ✅ Mark Completed
          </button>
        )}

      </div>

    ))}

  </div>

</div>
        </div>

      </div>

    </section>
  );
}

export default AdminDashboard;