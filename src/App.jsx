import { Routes, Route, Navigate } from 'react-router-dom'; // Router yahan se hata diya
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config'; 
import AOS from 'aos';
import 'aos/dist/aos.css';

// Pages
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-darkBg flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-neonBlue border-solid shadow-neon-blue"></div>
      </div>
    );
  }

  return (
    <div className="bg-darkBg min-h-screen text-white">
      {/* Router yahan se delete kar diya kyunke wo main.jsx mein hai */}
      <Routes>
        <Route 
          path="/" 
          element={!user ? <Auth /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/editor" 
          element={user ? <Editor /> : <Navigate to="/" />} 
        />
        <Route 
          path="/editor/:id" 
          element={user ? <Editor /> : <Navigate to="/" />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;