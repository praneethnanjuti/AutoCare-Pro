const testimonials = [
  {
    emoji: "👨‍💼",
    name: "Rahul Sharma",
    city: "Secunderabad",
    review:
      "Excellent service! My car was picked up and delivered on time. Highly recommended.",
  },
  {
    emoji: "👩‍💼",
    name: "Priya Reddy",
    city: "LB Nagar",
    review:
      "The booking process was very smooth, and the mechanics were professional.",
  },
  {
    emoji: "👨‍🔧",
    name: "Arjun Patel",
    city: "Begumpet",
    review:
      "Affordable pricing and quality work. I'll definitely use AutoCare Pro again.",
  },
];

function Testimonials() {
  return (
    <section className="bg-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          What Our Customers Say
        </h2>

        <p className="text-center text-gray-400 mt-3 mb-12">
          Trusted by thousands of happy customers across India.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition duration-300"
            >

              <div className="text-6xl text-center">
                {item.emoji}
              </div>

              <div className="text-center mt-4">

                <h3 className="text-xl font-semibold">
                  {item.name}
                </h3>

                <p className="text-blue-400">
                  {item.city}
                </p>

                <div className="text-yellow-400 text-2xl mt-3">
                  ⭐⭐⭐⭐⭐
                </div>

              </div>

              <p className="text-gray-300 mt-6 text-center leading-7">
                "{item.review}"
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;