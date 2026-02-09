import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

// images
import img1 from "../assets/templates/1.png";
import img2 from "../assets/templates/2.png";
import img3 from "../assets/templates/3.png";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="flex flex-col md:flex-row items-center justify-between px-16 py-20">
        
        {/* TEXT */}
        <div className="max-w-xl space-y-6 animate-fadeIn">
          <h1 className="text-5xl font-extrabold leading-tight">
            Build Your{" "}
            <span className="text-orange-500">Professional</span> Resume
          </h1>

          <p className="text-gray-400 text-lg">
            Create stunning, job-ready resumes with modern templates,
            real-time previews, and secure cloud storage.
          </p>

          <a
            href="#templates"
            className="inline-block px-8 py-4 bg-orange-500 text-black font-semibold rounded-xl
                       shadow-[0_0_25px_#ff7a00] hover:shadow-[0_0_40px_#ff7a00] transition"
          >
            Explore Templates
          </a>
        </div>

        {/* IMAGES */}
        <div className="relative mt-16 md:mt-0">
          <img
            src={img1}
            className="w-52 absolute -top-10 -left-10 animate-float rounded-xl shadow-[0_0_20px_#ff7a00]"
          />
          <img
            src={img2}
            className="w-56 relative z-10 animate-floatDelay rounded-xl shadow-[0_0_25px_#ff7a00]"
          />
          <img
            src={img3}
            className="w-52 absolute -bottom-10 -right-10 animate-floatSlow rounded-xl shadow-[0_0_20px_#ff7a00]"
          />
        </div>
      </section>

      {/* ================= TEMPLATES ================= */}
      <section id="templates" className="px-16 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Resume <span className="text-orange-500">Templates</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[img1, img2, img3].map((img, i) => (
            <div
              key={i}
              className="bg-[#111] p-6 rounded-2xl border border-orange-500/30
                         shadow-[0_0_20px_#ff7a00]
                         hover:scale-105 transition"
            >
              <img src={img} className="rounded-xl mb-4" />

              <button
                onClick={() =>
                  Swal.fire({
                    icon: "info",
                    title: "Template Selected ✨",
                    text: "Resume editor will open next",
                    background: "#000",
                    color: "#fff",
                    confirmButtonColor: "#f97316",
                  })
                }
                className="w-full py-2 bg-orange-500 text-black rounded-lg
                           font-semibold hover:bg-orange-600 transition"
              >
                Use Template
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT US ================= */}
      <section id="about" className="px-16 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div className="animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-6">
              About <span className="text-orange-500">ResumeBuilder</span>
            </h2>

            <p className="text-gray-400 mb-6">
              ResumeBuilder helps you create professional, job-ready resumes
              using modern designs and real-time previews.
            </p>

            <p className="text-gray-400 mb-8">
              Perfect for students, developers, and professionals.
            </p>

            <button
              onClick={() =>
                Swal.fire({
                  icon: "success",
                  title: "More Coming 🚀",
                  text: "Advanced features coming very soon!",
                  background: "#000",
                  color: "#fff",
                  confirmButtonColor: "#f97316",
                })
              }
              className="px-6 py-3 bg-orange-500 text-black rounded-lg
                         shadow-[0_0_20px_#ff7a00] hover:bg-orange-600 transition"
            >
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              "Modern Templates",
              "Live Preview",
              "Cloud Save",
              "Easy Export",
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-[#111] rounded-xl border border-orange-500/30
                           hover:scale-105 transition shadow-[0_0_15px_#ff7a00]"
              >
                <h3 className="text-orange-500 font-semibold mb-2">{item}</h3>
                <p className="text-gray-400 text-sm">
                  High quality resume experience
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= CONTACT US ================= */}
      <section
        id="contact"
        className="px-16 py-24 bg-gradient-to-b from-black to-[#0a0a0a]"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-4">
              Get In <span className="text-orange-500">Touch</span>
            </h2>

            <p className="text-gray-400 mb-6">
              Need help or have suggestions? We’re always here for you.
            </p>

            <ul className="space-y-3 text-gray-400">
              <li>📧 support@resumebuilder.com</li>
              <li>📞 +92 300 1234567</li>
              <li>📍 Pakistan</li>
            </ul>
          </div>

          {/* FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              Swal.fire({
                icon: "success",
                title: "Message Sent 🚀",
                text: "We’ll contact you very soon!",
                background: "#000",
                color: "#fff",
                confirmButtonColor: "#f97316",
              });
              e.target.reset();
            }}
            className="bg-[#111] p-8 rounded-2xl border border-orange-500/40
                       shadow-[0_0_35px_#ff7a00]"
          >
            <h3 className="text-2xl font-semibold mb-6 text-orange-500">
              Contact Form
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                required
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl bg-black text-white
                           border border-orange-500/40 focus:ring-2 focus:ring-orange-500"
              />

              <input
                type="email"
                required
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl bg-black text-white
                           border border-orange-500/40 focus:ring-2 focus:ring-orange-500"
              />

              <textarea
                rows="5"
                required
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-xl bg-black text-white
                           border border-orange-500/40 focus:ring-2 focus:ring-orange-500"
              ></textarea>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange-500 text-black
                           font-semibold shadow-[0_0_25px_#ff7a00]
                           hover:shadow-[0_0_40px_#ff7a00] transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
