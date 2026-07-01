import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch My Bookings
  const fetchBookings = async () => {
    try {
      const response = await API.get("/bookings/my-bookings");

      setBookings(response.data.bookings);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  // Cancel Booking
  const cancelBooking = async (id) => {
    try {
      await API.delete(`/bookings/cancel/${id}`);

      toast.success("Booking Cancelled Successfully");

      fetchBookings();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to cancel booking"
      );
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white text-2xl">
        Loading Bookings...
      </div>
    );
  }

  return (
    <section className="bg-slate-950 min-h-screen pt-28 pb-20 text-white">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-10 text-center">
          📋 My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center text-gray-400 text-xl">
            No Bookings Found
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">

            {bookings.map((booking) => (

              <div
                key={booking._id}
                className="bg-slate-900 rounded-2xl p-6 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-blue-400">
                  {booking.service?.serviceName || "Service Deleted"}
                </h2>

                <p className="mt-3">
                  📅 <strong>Date:</strong> {booking.bookingDate}
                </p>

                <p>
                  ⏰ <strong>Time:</strong> {booking.bookingTime}
                </p>

                <p>
                  🚗 <strong>Vehicle:</strong> {booking.vehicleNumber}
                </p>

                <p>
                  📝 <strong>Note:</strong> {booking.note || "No Notes"}
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
                    onClick={() => cancelBooking(booking._id)}
                    className="mt-6 w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>

            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default MyBookings;