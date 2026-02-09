import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut 
} from "firebase/auth";
import { notifySuccess, notifyError } from '../utils/notifications';
import { LogIn, UserPlus, KeyRound, LogOut } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle Login/Signup [cite: 19, 20]
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        notifySuccess("Welcome Back! Logging you in...");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        notifySuccess("Account Created! Welcome to the futurist builder.");
      }
    } catch (error) {
      notifyError(error.message);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async () => {
    if (!email) return notifyError("Please enter your email first!");
    try {
      await sendPasswordResetEmail(auth, email);
      notifySuccess("Password reset link sent to your email!");
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBg px-4">
      <div 
        data-aos="zoom-in" 
        className="glass-card p-8 w-full max-w-md border-t-4 border-neonBlue shadow-neon-blue"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white uppercase tracking-widest">
          {isLogin ? <span className="text-neonBlue">Login</span> : <span className="text-neonOrange">Sign Up</span>}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-neonBlue text-white transition-all"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-neonOrange text-white transition-all"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className={`w-full py-3 rounded-lg font-bold uppercase tracking-tighter transition-all transform hover:scale-105 ${
              isLogin ? 'bg-neonBlue text-black hover:shadow-[0_0_20px_#00f3ff]' : 'bg-neonOrange text-white hover:shadow-[0_0_20px_#ff6b00]'
            }`}
          >
            {isLogin ? 'Enter Dashboard' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 flex flex-col space-y-4 text-center text-sm">
          <button onClick={handleForgotPassword} className="text-gray-500 hover:text-neonBlue transition-colors">
            Forgot Password?
          </button>
          
          <p className="text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"} 
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="ml-2 text-neonOrange font-bold hover:underline"
            >
              {isLogin ? 'Register Now' : 'Login Here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;