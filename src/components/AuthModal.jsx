import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-black text-white px-8 py-4 flex justify-between z-50">
      <h1 className="text-orange-500 font-bold text-xl">
        ResumeForge
      </h1>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-orange-500">Home</Link>
        <Link to="/editor" className="hover:text-orange-500">Dashboard</Link>
        <Link to="/login" className="hover:text-orange-500">Login</Link>
        <Link to="/signup" className="hover:text-orange-500">Signup</Link>
      </div>
    </nav>
  );
}
