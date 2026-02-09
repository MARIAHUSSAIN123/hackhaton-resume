import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-gray-800 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Resume<span className="text-orange-500">Pro</span>
          </h2>
          <p className="mt-4 text-sm">
            Build professional, ATS-friendly resumes with modern templates and
            smart tools.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>Templates</li>
            <li>Dashboard</li>
            <li>Preview Resume</li>
            <li>About Us</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>Resume Tips</li>
            <li>Career Guide</li>
            <li>FAQ</li>
            <li>Support</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
          <div className="flex gap-4">
            <Icon><Github /></Icon>
            <Icon><Linkedin /></Icon>
            <Icon><Twitter /></Icon>
            <Icon><Mail /></Icon>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-6 text-center text-sm">
        © {new Date().getFullYear()} ResumePro. All rights reserved.
      </div>
    </footer>
  );
}

function Icon({ children }) {
  return (
    <div className="p-2 rounded-full border border-gray-700 hover:border-orange-500 hover:text-orange-500 transition cursor-pointer">
      {children}
    </div>
  );
}
