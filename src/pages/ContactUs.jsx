import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ContactUs() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      {/* Heading */}
      <div
        className="text-center mb-12"
        data-aos="fade-down"
      >
        <h1 className="text-4xl font-bold text-orange-500">
          Contact Us
        </h1>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Have questions about our Resume Builder or need help creating a
          professional resume? We’re here to help you grow.
        </p>
      </div>

      {/* Main Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        
        {/* Left Info */}
        <div data-aos="fade-right" className="space-y-6">
          <h2 className="text-2xl font-semibold">
            Let’s Talk 👋
          </h2>

          <p className="text-gray-400">
            Whether you’re a student, job seeker, or professional — our
            Resume Builder is designed to help you stand out.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-orange-500 text-xl">📧</span>
              <span>support@resumebuilder.com</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-orange-500 text-xl">📞</span>
              <span>+92 300 1234567</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-orange-500 text-xl">📍</span>
              <span>Karachi, Pakistan</span>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <form
          data-aos="fade-left"
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 space-y-6"
        >
          <div>
            <label className="block text-sm mb-2">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full bg-black border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-black border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full bg-black border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-orange-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-black font-semibold py-2 rounded hover:bg-orange-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
