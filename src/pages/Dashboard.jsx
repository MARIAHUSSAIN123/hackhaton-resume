import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { 
  Plus, Trash2, Zap, Shield, Globe, Cpu, ArrowRight, X, Layers, 
  Star, Play, CheckCircle2, Search, Edit, Menu, Mail, Send, Palette 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { notifySuccess } from '../utils/notifications';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTemplate, setFilterTemplate] = useState('all');
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // --- THEME ENGINE STATE ---
  const themes = [
    { name: 'CYAN PROTOCOL', color: '#00f3ff' },
    { name: 'LIME PROTOCOL', color: '#39ff14' },
    { name: 'PURPLE PROTOCOL', color: '#bc13fe' },
    { name: 'AMBER PROTOCOL', color: '#ffaa00' },
    { name: 'ROSE PROTOCOL', color: '#ff007f' },
  ];
  const [currentThemeIdx, setCurrentThemeIdx] = useState(0);

  const rotateTheme = () => {
    const next = (currentThemeIdx + 1) % themes.length;
    setCurrentThemeIdx(next);
    document.documentElement.style.setProperty('--neon-main', themes[next].color);
  };

  const navigate = useNavigate();
  const templateImages = ["/assets/templates/temp1.png", "/assets/templates/temp2.png"];

  const SECTION_DETAILS = {
    process: {
      title: "The Architecture of Career Success",
      tag: "SYSTEM PROTOCOL 01",
      img: "/assets/templates/tech2.png",
      content: "NeonVault's deployment protocol is engineered for speed and precision. Phase 1: Visual Selection. Phase 2: Neural Injection (AI Optimization). Phase 3: Global Deployment."
    },
    ai_core: {
      title: "Neural AI Content Optimizer v4.0",
      tag: "SYSTEM PROTOCOL 02",
      img: "/assets/templates/temp1.png",
      content: "Our AI Core performs deep semantic analysis of your career history, cross-referencing skills with millions of successful assets for ATS dominance."
    },
    security: {
      title: "Fortified Cloud Storage",
      tag: "SYSTEM PROTOCOL 03",
      img: "/assets/templates/male.png",
      content: "Military-grade SSL-256 bit encryption ensures your personal information remains classified in our iron-clad vault."
    },
    about: {
      title: "The NeonVault Manifesto",
      tag: "CORE VISION",
      img: "/assets/templates/3.png",
      content: "Merging high-end aesthetics with data-driven results to build the future of professional identities."
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % templateImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const fetchResumes = async () => {
    try {
      if (!auth.currentUser) return;
      const q = query(collection(db, "resumes"), where("userId", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      setResumes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) { console.error(err); }
  };

  useEffect(() => { 
    fetchResumes();
    // Set initial theme
    document.documentElement.style.setProperty('--neon-main', themes[0].color);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Terminate this digital asset?")) {
      try {
        await deleteDoc(doc(db, "resumes", id));
        fetchResumes();
        notifySuccess("Asset deleted successfully.");
      } catch (err) { console.error(err); }
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const filteredResumes = resumes.filter(res => {
    const matchesSearch = res.personalInfo?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterTemplate === 'all' || res.templateId === filterTemplate;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-neonMain overflow-x-hidden font-sans transition-colors duration-500">
      
      {/* 🎨 THEME TOGGLE BUTTON (FLOATING) */}
      <motion.button 
        onClick={rotateTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-10 left-10 z-[5000] p-4 bg-black/50 border border-neonMain/30 rounded-full backdrop-blur-xl shadow-neon-main group overflow-hidden"
      >
        <div className="absolute inset-0 bg-neonMain opacity-10 group-hover:opacity-20 transition-opacity"></div>
        <Palette className="text-neonMain relative z-10" size={24} />
        <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-neonMain text-black text-[9px] font-black px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
           SWITCH: {themes[currentThemeIdx].name}
        </span>
      </motion.button>

      {/* 1. MASTER MODAL */}
      <AnimatePresence>
        {selectedInfo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl">
            <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} className="bg-[#0a0a0a] border border-white/10 max-w-5xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12 relative rounded-[2.5rem]">
              <button onClick={() => setSelectedInfo(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"><X size={32}/></button>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <img src={selectedInfo.img} className="rounded-3xl border border-white/10 shadow-2xl w-full" alt="Detail" />
                <div>
                  <span className="text-neonMain font-mono text-xs tracking-widest block mb-4 transition-colors">{selectedInfo.tag}</span>
                  <h2 className="text-4xl font-black uppercase italic mb-6 leading-tight">{selectedInfo.title}</h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-10">{selectedInfo.content}</p>
                  <button onClick={() => { setSelectedInfo(null); navigate('/editor'); }} className="bg-white text-black px-10 py-4 rounded-xl font-black uppercase text-xs flex items-center gap-3 hover:bg-neonMain transition-all">Activate Editor <ArrowRight size={18}/></button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. NAVIGATION */}
      <nav className="fixed top-0 w-full z-[1000] border-b border-white/5 bg-black/60 backdrop-blur-2xl px-6 md:px-12 h-20 flex justify-between items-center transition-all">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <div className="p-2.5 bg-neonMain rounded-xl shadow-neon-main group-hover:rotate-12 transition-all duration-500">
            <Zap className="text-black" fill="currentColor" size={20} />
          </div>
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">NEON<span className="text-neonMain transition-colors">VAULT</span></h1>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {['services', 'about', 'assets', 'contact'].map(item => (
            <button key={item} onClick={() => scrollToSection(item)} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-neonMain transition-all">{item}</button>
          ))}
          <button onClick={() => signOut(auth).then(() => navigate('/'))} className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">LOGOUT</button>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-white">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 bg-black z-[999] flex flex-col items-center justify-center gap-8">
            {['services', 'about', 'assets', 'contact'].map(item => (
              <button key={item} onClick={() => scrollToSection(item)} className="text-4xl font-black uppercase italic text-white hover:text-neonMain">{item}</button>
            ))}
            <button onClick={() => signOut(auth)} className="text-red-500 font-black uppercase tracking-widest border border-red-500/20 px-10 py-4 rounded-full">LOGOUT</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. HERO SECTION */}
      <main className="pt-40 px-6 max-w-7xl mx-auto">
        <section className="text-center mb-40 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-neonMain/5 blur-[120px] -z-10 transition-colors duration-1000"></div>
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <span className="text-neonMain font-mono text-[10px] tracking-[0.6em] uppercase mb-8 block transition-colors">Authorized User Dashboard</span>
            <h1 className="text-6xl md:text-[9rem] font-black uppercase italic leading-[0.8] tracking-tighter mb-12">
              FUTURE <br/> <span className="opacity-20 transition-all duration-700" style={{ WebkitTextStroke: '2px var(--neon-main)', color: 'transparent' }}>PIONEER.</span>
            </h1>
            <div className="flex flex-wrap justify-center gap-6">
              <button onClick={() => navigate('/editor')} className="px-12 py-6 bg-white text-black font-black uppercase rounded-2xl flex items-center gap-4 hover:bg-neonMain transition-all shadow-2xl group">
                Initiate Asset <Plus size={24} className="group-hover:rotate-90 transition-transform" />
              </button>
              <button onClick={() => scrollToSection('services')} className="px-12 py-6 border border-white/10 rounded-2xl font-black uppercase text-xs hover:bg-white/5 transition-all italic flex items-center gap-3">
                System Briefing <Play size={16} fill="white"/>
              </button>
            </div>
          </motion.div>
        </section>

        {/* 4. ASSETS GRID */}
        <section id="assets" className="mb-40 scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-5xl font-black uppercase italic tracking-tighter">Digital <span className="text-neonMain transition-colors">Assets</span></h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Classified Career Protocols</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="text" placeholder="Search..." className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-3 rounded-xl outline-none focus:border-neonMain text-sm transition-all" onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredResumes.map(res => (
              <motion.div key={res.id} layout className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5 hover:border-neonMain transition-all group relative overflow-hidden">
                <div className="relative z-10">
                  <CheckCircle2 className="text-neonMain mb-6 transition-colors" size={28} />
                  <h4 className="text-3xl font-black uppercase italic mb-1">{res.personalInfo?.fullName || "Agent Null"}</h4>
                  <p className="text-neonMain text-[10px] font-black uppercase tracking-widest mb-12 transition-colors">{res.personalInfo?.jobTitle || "Specialist"}</p>
                  <div className="flex gap-3">
                    <button onClick={() => navigate(`/editor/${res.id}`)} className="flex-grow bg-white text-black py-3.5 rounded-xl font-black uppercase text-[10px] hover:bg-neonMain transition-all">Edit Asset</button>
                    <button onClick={() => handleDelete(res.id)} className="p-3.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/10"><Trash2 size={20}/></button>
                  </div>
                </div>
              </motion.div>
            ))}
            <div onClick={() => navigate('/editor')} className="border-4 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center p-16 hover:border-neonMain hover:bg-neonMain/5 cursor-pointer transition-all group">
               <Plus size={48} className="text-gray-600 group-hover:text-neonMain mb-4 group-hover:rotate-90 transition-all" />
               <p className="text-gray-600 font-black uppercase text-[10px] tracking-widest group-hover:text-neonMain">New Protocol</p>
            </div>
          </div>
        </section>

        {/* 5. SERVICES (Bento Grid) */}
        <section id="services" className="py-32 scroll-mt-24 border-t border-white/5">
          <div className="text-center mb-20">
            <span className="text-neonMain font-mono text-[10px] tracking-[0.5em] uppercase transition-colors">Engineered Capabilities</span>
            <h2 className="text-5xl font-black uppercase italic tracking-tighter mt-4">Next-Gen <span className="text-neonMain opacity-70">Systems</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[650px]">
            <motion.div whileHover={{ y: -5 }} onClick={() => setSelectedInfo(SECTION_DETAILS.ai_core)} className="md:col-span-2 md:row-span-2 bg-white/5 rounded-[2.5rem] relative overflow-hidden group border border-white/10 p-12 flex flex-col justify-between cursor-pointer">
              <Cpu size={150} className="absolute -top-10 -right-10 opacity-5 group-hover:text-neonMain group-hover:opacity-20 transition-all" />
              <div>
                <div className="w-14 h-14 bg-neonMain/10 rounded-2xl flex items-center justify-center text-neonMain mb-8 border border-neonMain/20 transition-all"><Zap size={28} /></div>
                <h3 className="text-5xl font-black uppercase italic mb-6">Neural AI <br/> Optimization</h3>
                <p className="text-gray-400 text-lg max-w-md leading-relaxed">Rewriting career impact statements using high-frequency industry keywords that bypass ATS filters instantly.</p>
              </div>
              <button className="w-max px-8 py-4 bg-neonMain text-black font-black uppercase text-[10px] rounded-xl flex items-center gap-3 transition-colors">Launch Engine <ArrowRight size={16} /></button>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} onClick={() => setSelectedInfo(SECTION_DETAILS.security)} className="bg-white/5 rounded-[2rem] border border-white/10 p-8 flex flex-col justify-between group hover:border-neonMain transition-all cursor-pointer">
              <div className="p-4 w-fit bg-neonMain/10 rounded-xl text-neonMain border border-neonMain/20 transition-all"><Shield size={28} /></div>
              <div>
                <h4 className="text-xl font-black uppercase italic mb-2">Vault Security</h4>
                <p className="text-gray-500 text-xs italic uppercase tracking-widest font-bold">256-Bit SSL Protection</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} onClick={() => setSelectedInfo(SECTION_DETAILS.about)} className="bg-white/5 rounded-[2rem] border border-white/10 p-8 flex flex-col justify-between group hover:border-neonMain transition-all cursor-pointer">
              <div className="p-4 w-fit bg-neonMain/10 rounded-xl text-neonMain border border-neonMain/20 transition-all"><Globe size={28} /></div>
              <div>
                <h4 className="text-xl font-black uppercase italic mb-2">Universal Sync</h4>
                <p className="text-gray-500 text-xs italic uppercase tracking-widest font-bold">High-Fidelity PDF Export</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 6. ABOUT SECTION */}
        <section id="about" className="py-32 grid lg:grid-cols-2 gap-20 items-center border-t border-white/5 scroll-mt-24">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
            <h2 className="text-6xl font-black uppercase italic mb-8">Redefining <br/> <span className="text-neonMain transition-colors">Standards.</span></h2>
            <div className="space-y-6 text-gray-400 text-lg font-medium leading-relaxed">
              <p>NeonVault is a high-performance ecosystem built to transform static career data into dynamic visual narratives.</p>
              <p>Our mission is simple: To ensure your professional identity is as innovative as the code you write.</p>
            </div>
            <div className="mt-12 flex gap-6">
              <button onClick={() => navigate('/editor')} className="bg-white text-black px-10 py-4 rounded-xl font-black uppercase text-[10px] hover:bg-neonMain transition-all">Connect Now</button>
              <button className="px-10 py-4 border border-white/10 rounded-xl font-black uppercase text-[10px] hover:bg-white/5 transition-all">View Github</button>
            </div>
          </motion.div>

          <div className="relative h-[550px] flex items-center justify-center">
            <div className="absolute inset-0 bg-neonMain/5 blur-[100px] rounded-full animate-pulse transition-colors"></div>
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImg} src={templateImages[currentImg]} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.8 }}
                className="relative z-10 w-full h-full object-contain rounded-3xl"
              />
            </AnimatePresence>
          </div>
        </section>

        {/* 7. CONTACT SECTION */}
        <section id="contact" className="py-40 scroll-mt-24 border-t border-white/5 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-neonMain/10 blur-[120px] rounded-full pointer-events-none transition-colors"></div>

          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-neonMain font-mono text-[10px] tracking-[0.8em] uppercase mb-6 block transition-colors">Communication Protocol</span>
              <h2 className="text-7xl font-black uppercase italic leading-[0.85] tracking-tighter mb-8">Stay <br /> <span className="text-neonMain transition-colors">Synced.</span></h2>
              <p className="text-gray-500 text-lg font-medium max-w-md mb-12 leading-relaxed">Establish a direct neural link with our engineers. Our core is always listening.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-neonMain transition-all">
                    <Mail className="text-neonMain transition-colors" size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Direct Frequency</p>
                    <p className="text-lg font-bold">CORE@NEONVAULT.IO</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative group">
              <div className="absolute -inset-1 bg-neonMain rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition-all duration-1000"></div>
              <form className="relative bg-[#080808] border border-white/10 p-10 md:p-14 rounded-[2.5rem] space-y-8 backdrop-blur-xl">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <input 
                      type="text" required value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-neonMain transition-all peer text-sm font-bold"
                    />
                    <label className={`absolute left-0 transition-all pointer-events-none uppercase text-xs font-black tracking-widest ${contactForm.name ? '-top-4 text-neonMain' : 'top-4 text-gray-500 peer-focus:-top-4 peer-focus:text-neonMain'}`}>Operator Name</label>
                  </div>
                  <div className="relative">
                    <input 
                      type="email" required value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-neonMain transition-all peer text-sm font-bold"
                    />
                    <label className={`absolute left-0 transition-all pointer-events-none uppercase text-xs font-black tracking-widest ${contactForm.email ? '-top-4 text-neonMain' : 'top-4 text-gray-500 peer-focus:-top-4 peer-focus:text-neonMain'}`}>Email Address</label>
                  </div>
                </div>
                <div className="relative">
                  <textarea 
                    required rows="4" value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-neonMain transition-all peer text-sm font-bold resize-none"
                  ></textarea>
                  <label className={`absolute left-0 transition-all pointer-events-none uppercase text-xs font-black tracking-widest ${contactForm.message ? '-top-4 text-neonMain' : 'top-4 text-gray-500 peer-focus:-top-4 peer-focus:text-neonMain'}`}>Transmission Details</label>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-4 hover:bg-neonMain transition-all">
                  Send Transmission <Send size={20} className="animate-pulse" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      {/* 8. FOOTER */}
      <footer className="py-24 border-t border-white/5 bg-white/[0.01] px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16">
          <div className="max-w-md">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-6">Stay <br/> <span className="text-neonMain transition-colors">Synchronized.</span></h2>
            <p className="text-gray-600 font-bold uppercase text-[10px] tracking-[0.2em]">NeonVault is the definitive ecosystem for 2026 career management.</p>
          </div>
          <div className="grid grid-cols-2 gap-16">
            <div className="flex flex-col gap-4">
              <span className="text-white font-black uppercase text-[10px] tracking-widest mb-2">Modules</span>
              {['Templates', 'AI Core', 'Vault'].map(l => <button key={l} className="text-gray-600 hover:text-neonMain text-left text-[10px] font-black uppercase transition-colors">{l}</button>)}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-30 text-[8px] font-black uppercase tracking-[1em]">
          <p>© 2026 NEONVAULT ECOSYSTEM</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <Globe size={14} /> <Zap size={14} className="text-neonMain transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
