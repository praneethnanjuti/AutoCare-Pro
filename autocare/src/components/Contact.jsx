import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

function Contact() {
  return (
    <section className="bg-slate-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Contact Us
        </h2>

        <p className="text-center text-gray-400 mt-3 mb-14">
          We'd love to hear from you. Reach out for bookings or support.
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact Info */}

          <div className="space-y-8">

            <div className="flex items-center gap-5">
              <FaMapMarkerAlt className="text-blue-500 text-3xl" />
              <div>
                <h3 className="font-semibold text-xl">Address</h3>
                <p className="text-gray-400">
                  Begumpet, Hyderabad, India
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaPhoneAlt className="text-blue-500 text-3xl" />
              <div>
                <h3 className="font-semibold text-xl">Phone</h3>
                <p className="text-gray-400">
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaEnvelope className="text-blue-500 text-3xl" />
              <div>
                <h3 className="font-semibold text-xl">Email</h3>
                <p className="text-gray-400">
                  support@autocarepro.in
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaClock className="text-blue-500 text-3xl" />
              <div>
                <h3 className="font-semibold text-xl">Working Hours</h3>
                <p className="text-gray-400">
                  Mon - Sat : 9 AM - 8 PM
                </p>
              </div>
            </div>

          </div>

          {/* Contact Form */}

          <div className="bg-slate-900 rounded-2xl p-8 shadow-xl">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full mb-5 p-4 rounded-lg bg-slate-800 outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full mb-5 p-4 rounded-lg bg-slate-800 outline-none"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full mb-5 p-4 rounded-lg bg-slate-800 outline-none"
            />

            <button
              className="bg-blue-600 hover:bg-blue-700 transition w-full py-4 rounded-lg font-semibold"
            >
              Send Message
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;