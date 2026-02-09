import hero1 from "src/assets/tech.png";
import hero2 from "src/assets/1.png";
import hero3 from "src/assets/2.png";
import hero4 from "src/assets/3.png"
import { useNavigate } from "react-router-dom";


export default function Hero() {
  const navigate = useNavigate();

  return (
   

    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

      {/* background glow */}
     

     <div className="relative flex justify-center items-center">

  {/* LEFT IMAGE – only lg+ */}
  <img
    src={resume1}
    className="hidden lg:block w-56 rounded-xl shadow-xl absolute -top-20 -left-10 rotate-[-6deg]"
  />

  {/* CENTER IMAGE – always visible */}
  <img
    src={resume2}
    className="w-64 sm:w-72 rounded-xl shadow-2xl z-10"
  />

  {/* RIGHT IMAGE – md+ */}
  <img
    src={resume3}
    className="hidden md:block w-56 rounded-xl shadow-xl absolute -bottom-20 -right-10 rotate-[6deg]"
  />

</div>


      {/* content */}
      <div className="relative z-10 text-center max-w-3xl px-6">
        <h1
          className="text-5xl md:text-6xl font-extrabold text-white"
          data-aos="fade-up"
        >
          Build Your{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
            Professional Resume
          </span>
        </h1>

        <p
          className="mt-6 text-gray-300 text-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Create, customize & download modern ATS-friendly resumes in minutes.
        </p>

       <button
  onClick={() => navigate("/templates")}
  className="bg-orange-500 hover:bg-orange-600 transition px-8 py-3 rounded-xl font-semibold"
>
  Get Started
</button>

      </div>
    </section>
  );
}
