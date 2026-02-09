import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import { LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ userEmail }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Services', path: '#services' },
    { name: 'About Us', path: '#about' },
    { name: 'Contact', path: '#contact' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }} animate={{ y: 0 }}
      className="bg-black/90 backdrop-blur-md border-b border-neonBlue p-4 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-black text-neonBlue italic tracking-tighter">
          NEON<span className="text-neonOrange">RESUME</span>
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="text-gray-300 hover:text-neonBlue transition-colors font-semibold uppercase text-xs tracking-widest">
              {link.name}
            </Link>
          ))}
          <button onClick={() => signOut(auth)} className="bg-red-600/20 text-red-500 p-2 rounded-lg hover:bg-red-600 hover:text-white transition-all">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};
export default Navbar;