import { FileText, Sparkles, Users, Target } from "lucide-react";

export default function About() {
  return (
    <div className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">
            About <span className="text-orange-500">ResumePro</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            We help individuals transform their skills and experience into
            powerful, professional resumes that open doors to opportunities.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card
            icon={<FileText />}
            title="Who We Are"
            desc="A modern resume-building platform designed for students, professionals, and job seekers."
          />
          <Card
            icon={<Target />}
            title="Our Mission"
            desc="To empower individuals with ATS-friendly resumes that showcase confidence and clarity."
          />
          <Card
            icon={<Sparkles />}
            title="What We Offer"
            desc="Beautiful templates, smart editing, cloud storage, and seamless PDF downloads."
          />
          <Card
            icon={<Users />}
            title="Who It's For"
            desc="Students, developers, creatives, and professionals aiming to stand out."
          />
        </div>

        {/* Vision */}
        <div className="mt-20 bg-[#111] border border-gray-800 rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            We envision a future where no opportunity is missed because of a
            poorly designed resume. ResumePro exists to help you present your
            story with confidence, professionalism, and impact.
          </p>
        </div>
      </div>
    </div>
  );
}

function Card({ icon, title, desc }) {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 hover:border-orange-500 transition">
      <div className="text-orange-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}
