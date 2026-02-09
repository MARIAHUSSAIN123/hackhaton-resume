import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../firebase/config';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { 
  Plus, Trash2, Zap, Shield, Globe, Cpu, ArrowRight, X, 
  Play, CheckCircle2, Search, Mail, Send, Palette, Terminal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { notifySuccess } from '../utils/notifications';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [currentThemeIdx, setCurrentThemeIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const themes = [
    { name: 'CYAN PROTOCOL', color: '#00f3ff', bg: 'linear-gradient(135deg, #050505 0%, #001a1d 100%)', glow: 'rgba(0, 243, 255, 0.3)' },
    { name: 'PURPLE PROTOCOL', color: '#bc13fe', bg: 'linear-gradient(135deg, #050505 0%, #1a001d 100%)', glow: 'rgba(188, 19, 254, 0.3)' },
    { name: 'AMBER PROTOCOL', color: '#ffaa00', bg: 'linear-gradient(135deg, #050505 0%, #1d1400 100%)', glow: 'rgba(255, 170, 0, 0.3)' },
    { name: 'LIME PROTOCOL', color: '#39ff14', bg: 'linear-gradient(135deg, #050505 0%, #0a1d00 100%)', glow: 'rgba(57, 255, 20, 0.3)' },
  ];

  const rotateTheme = () => {
    const next = (currentThemeIdx + 1) % themes.length;
    setCurrentThemeIdx(next);
    const root = document.documentElement;
    root.style.setProperty('--neon-main', themes[next].color);
    root.style.setProperty('--neon-glow', themes[next].glow);
    root.style.setProperty('--body-bg', themes[next].bg);
    document.body.style.background = themes[next].bg;
  };

  const navigate = useNavigate();
  const templateImages = ["/assets/templates/temp1.png", "/assets/templates/temp2.png", "/assets/templates/3.png"];

  const SECTION_DETAILS = {
    ai_core: { title: "Neural AI Optimizer v4.0", tag: "SYSTEM PROTOCOL 02", img: "/assets/templates/temp1.png", content: "Deep semantic analysis for ATS dominance." },
    security: { title: "Fortified Cloud Storage", tag: "SYSTEM PROTOCOL 03", img: "/assets/templates/male.png", content: "Military-grade SSL-256 bit encryption." },
    about: { title: "The NeonVault Manifesto", tag: "CORE VISION", img: "/assets/templates/3.png", content: "Future-proof professional identities." }
  };

  useEffect(() => {
    fetchResumes();
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    rotateTheme(); // Initialize theme
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fetchResumes = async () => {
    if (!auth.currentUser) return;
    const q = query(collection(db, "resumes"), where("userId", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    setResumes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Terminate digital asset?")) {
      await deleteDoc(doc(db, "resumes", id));
      fetchResumes();
      notifySuccess("Asset Deleted.");
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredResumes = resumes.filter(res => 
    res.personalInfo?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen text-white selection:bg-neonMain font-sans transition-all duration-1000" style={{ background: 'var(--body-bg)' }}>
      
      {/* 🌌 CINEMATIC FX */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <motion.div 
          animate={{ x: mousePos.x - 300, y: mousePos.y - 300 }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
          className="w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,var(--neon-glow)_0%,transparent_70%)] opacity-40"
        />
      </div>

      {/* 🎨 THEME TOGGLE */}
      <motion.button onClick={rotateTheme} whileHover={{ scale: 1.2, rotate: 180 }} className="fixed bottom-10 left-10 z-[5000] p-5 bg-black/50 border-2 border-neonMain rounded-full backdrop-blur-3xl shadow-[0_0_50px_var(--neon-glow)]">
        <Palette className="text-neonMain" size={28} />
      </motion.button>

      {/* 1. NAV */}
      <nav className="fixed top-0 w-full z-[1000] border-b border-white/5 bg-black/20 backdrop-blur-3xl h-24 flex justify-between items-center px-12">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <Zap className="text-neonMain" fill="currentColor" size={30} />
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">NEON<span className="text-neonMain">VAULT</span></h1>
        </div>
        <div className="hidden lg:flex items-center gap-10">
          {['services', 'assets', 'about', 'contact'].map(item => (
            <button key={item} onClick={() => scrollToSection(item)} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-neonMain transition-all">{item}</button>
          ))}
          <button onClick={() => signOut(auth).then(() => navigate('/'))} className="border border-red-500/30 text-red-500 px-8 py-2 rounded-full text-[10px] font-black hover:bg-red-500 hover:text-white transition-all">TERMINATE</button>
        </div>
      </nav>

      <main className="relative z-10 pt-44 px-8 max-w-[1400px] mx-auto">
        
        {/* 2. HERO */}
        <section className="text-center mb-60">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="px-6 py-2 border border-neonMain/30 rounded-full text-neonMain font-mono text-[10px] tracking-widest uppercase bg-neonMain/5">Link Established // Node 4.0</span>
            <h1 className="text-8xl md:text-[13rem] font-black italic leading-[0.75] tracking-tighter mt-12 mb-16">
              FUTURE <br/> <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--neon-main)' }}>PIONEER.</span>
            </h1>
            <div className="flex justify-center gap-8">
              <button onClick={() => navigate('/editor')} className="px-14 py-6 bg-white text-black font-black uppercase text-[12px] rounded-2xl hover:bg-neonMain transition-all shadow-2xl flex items-center gap-4">Initialize Asset <Plus size={20}/></button>
              <button onClick={() => scrollToSection('services')} className="px-14 py-6 border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl font-black uppercase text-[12px] flex items-center gap-4 hover:bg-white/10">System Briefing <Play size={16}/></button>
            </div>
          </motion.div>
        </section>

        {/* 3. ASSETS GRID */}
        <section id="assets" className="mb-60 scroll-mt-32">
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-6xl font-black italic tracking-tighter uppercase">Stored <span className="text-neonMain">Protocols</span></h2>
            <div className="relative w-96">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neonMain" size={20}/>
              <input type="text" placeholder="Search Encrypted..." className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl outline-none focus:border-neonMain transition-all font-bold" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredResumes.map(res => (
              <motion.div key={res.id} whileHover={{ y: -10 }} className="p-10 bg-black/40 border border-white/5 rounded-[3rem] backdrop-blur-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:text-neonMain transition-colors"><Terminal size={80}/></div>
                <CheckCircle2 className="text-neonMain mb-6" size={30}/>
                <h4 className="text-3xl font-black uppercase italic mb-2">{res.personalInfo?.fullName || "Classified"}</h4>
                <p className="text-gray-500 font-mono text-[11px] uppercase tracking-widest mb-10">{res.personalInfo?.jobTitle || "Protocol Agent"}</p>
                <div className="flex gap-4">
                  <button onClick={() => navigate(`/editor/${res.id}`)} className="flex-grow bg-white text-black py-4 rounded-2xl font-black uppercase text-xs hover:bg-neonMain transition-all">Access</button>
                  <button onClick={() => handleDelete(res.id)} className="p-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={20}/></button>
                </div>
              </motion.div>
            ))}
            <div onClick={() => navigate('/editor')} className="border-2 border-dashed border-white/10 rounded-[3rem] flex flex-col items-center justify-center p-20 hover:border-neonMain/50 hover:bg-neonMain/5 cursor-pointer transition-all group">
               <Plus size={40} className="text-gray-500 group-hover:text-neonMain mb-4" />
               <p className="font-black uppercase text-xs tracking-widest text-gray-500">Deploy New</p>
            </div>
          </div>
        </section>

        {/* 4. SERVICES BENTO */}
        <section id="services" className="py-40 scroll-mt-32 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[750px]">
            <motion.div whileHover={{ scale: 0.99 }} onClick={() => setSelectedInfo(SECTION_DETAILS.ai_core)} className="md:col-span-8 bg-black/40 rounded-[4rem] border border-white/5 p-16 flex flex-col justify-between cursor-pointer relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--neon-glow),transparent_60%)] opacity-20 group-hover:opacity-40 transition-opacity" />
              <h3 className="text-7xl md:text-9xl font-black uppercase italic leading-[0.8] tracking-tighter z-10">NEURAL <br/> <span className="text-neonMain">AI ENGINE</span></h3>
              <p className="text-gray-400 text-2xl max-w-lg italic z-10">V4.0 Quantum analysis for instant market alignment.</p>
              <button className="w-fit px-12 py-5 bg-white text-black font-black uppercase text-xs rounded-2xl z-10 flex items-center gap-4 group-hover:bg-neonMain transition-all">Initialize <ArrowRight size={20}/></button>
            </motion.div>
            <div className="md:col-span-4 flex flex-col gap-8">
              <motion.div whileHover={{ x: 10 }} onClick={() => setSelectedInfo(SECTION_DETAILS.security)} className="flex-grow bg-white/5 rounded-[3rem] border border-white/5 p-12 flex flex-col justify-between hover:border-orange-500/40 transition-all cursor-pointer">
                <Shield className="text-orange-500" size={40} />
                <h4 className="text-4xl font-black italic uppercase">IRON <br/> VAULT</h4>
              </motion.div>
              <motion.div whileHover={{ x: 10 }} onClick={() => setSelectedInfo(SECTION_DETAILS.about)} className="flex-grow bg-white/5 rounded-[3rem] border border-white/5 p-12 flex flex-col justify-between hover:border-blue-500/40 transition-all cursor-pointer">
                <Globe className="text-blue-500" size={40} />
                <h4 className="text-4xl font-black italic uppercase">GLOBAL <br/> SYNC</h4>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. ABOUT */}
        <section id="about" className="py-40 grid lg:grid-cols-2 gap-32 items-center border-t border-white/5 scroll-mt-32">
          <div>
            <h2 className="text-8xl font-black uppercase italic mb-10 leading-[0.8]">BEYOND <br/> <span className="text-neonMain">LIMITS.</span></h2>
            <div className="space-y-8 text-gray-400 text-xl font-medium leading-relaxed max-w-xl italic">
              <p>NeonVault isn't just code; it's a professional <span className="text-white italic">evolutionary leap</span>.</p>
              <p>Our algorithms bridge the gap between human experience and digital impact.</p>
            </div>
            <div className="mt-16 flex gap-8">
              <button onClick={() => navigate('/editor')} className="px-12 py-5 bg-white text-black font-black uppercase text-xs rounded-2xl shadow-2xl">Connect Now</button>
              <button className="px-12 py-5 border border-white/10 rounded-2xl font-black uppercase text-xs hover:bg-white/5">Manifesto</button>
            </div>
          </div>
          <div className="relative h-[600px] group">
            <div className="absolute inset-0 bg-neonMain/20 blur-[120px] rounded-full animate-pulse"></div>
            <img src={templateImages[currentImg]} className="w-full h-full object-contain relative z-10 transition-all duration-1000" alt="CyberUI" />
          </div>
        </section>

        {/* 6. CONTACT */}
        <section id="contact" className="py-40 scroll-mt-32 border-t border-white/5 mb-20">
          <div className="grid lg:grid-cols-2 gap-40 items-center">
            <div>
              <span className="text-neonMain font-mono text-xs tracking-[0.6em] uppercase mb-8 block">Network Status: Online</span>
              <h2 className="text-8xl font-black uppercase italic leading-[0.8] mb-12">SEND <br /> <span className="text-orange-500">PULSE.</span></h2>
              <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5 w-fit flex items-center gap-8 group hover:border-neonMain transition-all">
                <Mail className="text-neonMain" size={40} />
                <div>
                  <p className="text-gray-500 font-black text-[10px] uppercase tracking-widest">Protocol Email</p>
                  <p className="text-2xl font-bold uppercase">CORE@NEONVAULT.IO</p>
                </div>
              </div>
            </div>
            <div className="bg-black/60 border border-white/10 p-16 rounded-[4rem] backdrop-blur-3xl shadow-2xl space-y-12">
              <input type="text" placeholder="OPERATOR NAME" className="w-full bg-transparent border-b-2 border-white/10 py-6 outline-none focus:border-neonMain transition-all text-xs font-black tracking-widest" />
              <input type="email" placeholder="EMAIL FREQUENCY" className="w-full bg-transparent border-b-2 border-white/10 py-6 outline-none focus:border-neonMain transition-all text-xs font-black tracking-widest" />
              <textarea rows="3" placeholder="TRANSMISSION DETAILS" className="w-full bg-transparent border-b-2 border-white/10 py-6 outline-none focus:border-neonMain transition-all text-xs font-black tracking-widest resize-none" />
              <button className="w-full py-8 bg-white text-black font-black uppercase tracking-[0.4em] text-xs rounded-2xl flex items-center justify-center gap-4 hover:bg-neonMain transition-all shadow-2xl">DEPLOY PULSE <Send size={20} /></button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
     {/* 8. ULTRA-PREMIUM CYBER FOOTER */}
      <footer className="relative mt-20 border-t border-white/5 bg-black/40 backdrop-blur-3xl overflow-hidden">
        
        {/* Animated Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neonMain to-transparent opacity-50 animate-pulse"></div>

        {/* Top Marquee Section - Aggressive Branding */}
        <div className="py-6 border-b border-white/5 bg-neonMain/[0.02] flex overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee items-center">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="flex items-center gap-10 mx-10 text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">
                <Zap size={14} className="text-neonMain" /> NEONVAULT // PROTOCOL ACTIVE 
                <Shield size={14} className="text-neonMain" /> SECURE DEPLOYMENT 
                <Globe size={14} className="text-neonMain" /> GLOBAL SYNC READY
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-12 py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
            
            {/* Column 1: Big Branding */}
            <div className="md:col-span-5 space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-neonMain rounded-xl shadow-[0_0_20px_var(--neon-glow)]">
                  <Zap className="text-black" fill="currentColor" size={24} />
                </div>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase">NEON<span className="text-neonMain">VAULT</span></h2>
              </div>
              <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-sm italic">
                Architecting professional identities for the <span className="text-white">Next Generation Grid</span>. Stand out or stay invisible.
              </p>
              <div className="flex gap-4">
                {['TWITCH', 'X-CORP', 'GITHUB'].map(social => (
                  <button key={social} className="px-5 py-2 border border-white/5 bg-white/5 rounded-lg text-[9px] font-black tracking-widest hover:border-neonMain hover:text-neonMain transition-all">
                    {social}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Nodes */}
            <div className="md:col-span-3 space-y-6">
              <h4 className="text-neonMain font-mono text-[10px] tracking-widest uppercase mb-8">System Nodes</h4>
              <ul className="space-y-4">
                {['Assets', 'Services', 'Neural Lab', 'Security'].map(link => (
                  <li key={link} onClick={() => scrollToSection(link.toLowerCase())} className="text-gray-400 font-bold uppercase text-[11px] tracking-widest hover:text-white cursor-pointer transition-all flex items-center gap-3 group">
                    <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-neonMain" />
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Live Status */}
            <div className="md:col-span-4 space-y-8">
               <div className="p-8 bg-white/5 border border-white/5 rounded-[2rem] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Cpu size={40}/></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 bg-neonMain rounded-full animate-ping"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Core Status: Optimal</span>
                  </div>
                  <h4 className="text-2xl font-black italic uppercase mb-2">Join the <br/> <span className="text-neonMain">Waitlist.</span></h4>
                  <div className="relative mt-6">
                    <input type="email" placeholder="ENCRYPTED EMAIL" className="w-full bg-black/40 border border-white/10 p-4 pl-6 rounded-xl outline-none focus:border-neonMain text-[10px] font-bold transition-all" />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neonMain hover:scale-110 transition-all"><Send size={18}/></button>
                  </div>
               </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] font-black text-gray-600 tracking-[0.4em] uppercase">
              © 2026 NEONVAULT ECOSYSTEM // EST- Karachi/02
            </p>
            <div className="flex gap-8 text-gray-600 font-mono text-[9px] tracking-widest">
              <span className="hover:text-neonMain cursor-pointer">PRIVACY_POLICY</span>
              <span className="hover:text-neonMain cursor-pointer">TERMS_OF_SERVICE</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Tailwind Config me ye animation add krna hogi (Agar config file hai) ya style tag me daal dein: */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            animation: marquee 30s linear infinite;
          }
        `}
      </style>

      {/* MODAL */}
      <AnimatePresence>
        {selectedInfo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[6000] flex items-center justify-center p-8 bg-black/98 backdrop-blur-2xl">
            <div className="bg-[#0a0a0a] border border-white/10 max-w-5xl w-full p-20 relative rounded-[4rem] grid md:grid-cols-2 gap-20 items-center">
              <button onClick={() => setSelectedInfo(null)} className="absolute top-12 right-12 text-gray-500 hover:text-neonMain"><X size={40}/></button>
              <img src={selectedInfo.img} className="rounded-3xl border border-white/5" />
              <div>
                <span className="text-neonMain font-mono text-xs tracking-widest block mb-6">{selectedInfo.tag}</span>
                <h2 className="text-5xl font-black uppercase italic mb-8">{selectedInfo.title}</h2>
                <p className="text-gray-400 text-xl italic mb-12">{selectedInfo.content}</p>
                <button onClick={() => { setSelectedInfo(null); navigate('/editor'); }} className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-xs flex items-center gap-4">Access Deployment <ArrowRight size={20}/></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
