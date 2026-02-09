import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Plus, Trash2, Zap, Shield, Globe, Cpu, ArrowRight, X, Layers, Star, Play, CheckCircle2, Sparkles, Terminal, Activity, Send, Mail, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'firebase/auth';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const navigate = useNavigate();

  const SECTION_DETAILS = {
    process: {
      title: "Tactical Evolution Protocol",
      tag: "SYSTEM PROTOCOL 01",
      img: "/src/assets/templates/tech2.png",
      content: "Traditional applications are dead. NeonVault engineers a multi-dimensional professional presence. Our Phase-Shift technology ensures your data is rendered with high-fidelity aesthetics that bypass the noise and command immediate executive attention."
    },
    ai_core: {
      title: "Neural-Link Optimizer v9.4",
      tag: "SYSTEM PROTOCOL 02",
      img: "/src/assets/templates/temp1.png",
      content: "Beyond simple AI—our Neural Core performs predictive career modeling. It reconstructs your professional history into a narrative of dominance, ensuring every skill is optimized for the quantum-driven selection algorithms of the world's elite organizations."
    },
    security: {
      title: "Iron-Clad Digital Sovereignty",
      tag: "SYSTEM PROTOCOL 03",
      img: "/src/assets/templates/male.png",
      content: "Your professional DNA is shielded behind a decentralized cryptographic mesh. Utilizing zero-knowledge proof protocols, we ensure your assets are accessible only to you, providing a level of privacy that is unparalleled in the modern metaverse."
    },
    about: {
      title: "The NeonVault Supremacy",
      tag: "CORE VISION",
      img: "/src/assets/templates/3.png",
      content: "We are not a service; we are a movement. Founded on the principle of 'Aesthetic Dominance,' NeonVault provides the weaponry for the modern pioneer to disrupt the global hierarchy. We don't build resumes—we build legacies."
    }
  };

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const q = query(collection(db, "resumes"), where("userId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        setResumes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) { console.error(err); }
    };
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    if(window.confirm("Terminate this asset?")) {
      await deleteDoc(doc(db, "resumes", id));
      setResumes(resumes.filter(r => r.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-neonBlue overflow-x-hidden font-sans">
      
      {/* --- BACKGROUND FX --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-neonBlue/10 blur-[160px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neonPurple/10 blur-[160px] rounded-full opacity-50"></div>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedInfo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl">
            <motion.div initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }} className="glass-card max-w-6xl w-full border-white/10 p-10 md:p-16 relative shadow-[0_0_120px_rgba(0,243,255,0.15)] rounded-[4rem]">
              <button onClick={() => setSelectedInfo(null)} className="absolute top-10 right-10 text-gray-500 hover:text-white transition-all hover:rotate-90 duration-500"><X size={40}/></button>
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="relative group">
                   <div className="absolute -inset-4 bg-neonBlue/30 blur-[60px] rounded-full opacity-30"></div>
                   <img src={selectedInfo.img} className="relative rounded-[3rem] border border-white/20 shadow-2xl transition-all duration-700 hover:scale-[1.02]" alt="Preview" />
                </div>
                <div>
                  <span className="text-neonBlue font-mono text-[10px] tracking-[0.6em] font-black uppercase mb-6 block">{selectedInfo.tag}</span>
                  <h2 className="text-7xl font-black uppercase italic leading-[0.9] mb-8 tracking-tighter">{selectedInfo.title}</h2>
                  <p className="text-gray-400 text-xl leading-relaxed font-medium mb-12 border-l-2 border-neonBlue/30 pl-8">{selectedInfo.content}</p>
                  <button onClick={() => navigate('/editor')} className="bg-white text-black px-14 py-6 rounded-2xl font-black uppercase text-xs flex items-center gap-4 hover:bg-neonBlue transition-all active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)]">Initialize Module <ArrowRight size={20}/></button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NAV --- */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-black/60 backdrop-blur-3xl px-12 h-28 flex justify-between items-center">
        <div className="flex items-center gap-5 cursor-pointer group" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <div className="p-4 bg-neonBlue rounded-[1.2rem] shadow-[0_0_30px_rgba(0,243,255,0.4)] group-hover:rotate-[360deg] transition-all duration-1000">
            <Zap className="text-black" fill="currentColor" size={26} />
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">NEON<span className="text-neonBlue">VAULT</span></h1>
        </div>
        <div className="hidden lg:flex items-center gap-14">
          {['process', 'ai_core', 'about'].map(item => (
            <button key={item} onClick={() => setSelectedInfo(SECTION_DETAILS[item])} className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 hover:text-white transition-all relative group">
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-neonBlue transition-all group-hover:w-full"></span>
            </button>
          ))}
        </div>
        <button onClick={() => signOut(auth).then(() => navigate('/'))} className="text-[10px] font-black uppercase tracking-widest text-red-500 border border-red-500/20 px-10 py-4 rounded-full hover:bg-red-500 hover:text-white transition-all">TERMINATE ACCESS</button>
      </nav>

      {/* --- HERO --- */}
      <main className="pt-64 px-10 max-w-7xl mx-auto">
        <section className="text-center mb-80">
          <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-3 rounded-full mb-12 backdrop-blur-md">
              <div className="w-2 h-2 bg-neonBlue rounded-full animate-ping"></div>
              <span className="text-neonBlue font-mono text-[10px] tracking-[0.5em] uppercase">Status: System Operational</span>
            </div>
            <h1 className="text-9xl md:text-[15rem] font-black uppercase italic leading-[0.7] tracking-tighter mb-20">
              ELITE <br/> <span className="text-stroke-white opacity-10 hover:opacity-100 transition-all duration-1000">LEGACY.</span>
            </h1>
            <p className="max-w-3xl mx-auto text-gray-500 text-2xl font-medium mb-20 leading-relaxed italic">
              "In a world of noise, <span className="text-white">silence is not an option.</span> Command the digital landscape with absolute authority."
            </p>
            <div className="flex flex-wrap justify-center gap-10">
              <button onClick={() => navigate('/editor')} className="px-20 py-10 bg-white text-black font-black uppercase rounded-[2.5rem] text-xl flex items-center gap-8 hover:bg-neonBlue hover:scale-105 transition-all shadow-[0_30px_60px_rgba(255,255,255,0.1)] group">
                INITIATE PROTOCOL <Plus size={32} className="group-hover:rotate-90 transition-transform" />
              </button>
              <button onClick={() => setSelectedInfo(SECTION_DETAILS.process)} className="px-20 py-10 border border-white/10 rounded-[2.5rem] font-black uppercase text-sm hover:bg-white/5 transition-all flex items-center gap-5 italic group">
                MANIFESTO <Play fill="white" size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>
        </section>

        {/* --- BENTO GRID --- */}
        <section className="mb-80">
           <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-10 h-auto md:h-[900px]">
            <div onClick={() => setSelectedInfo(SECTION_DETAILS.ai_core)} className="md:col-span-2 md:row-span-2 glass-card p-20 border-white/5 hover:border-neonBlue cursor-pointer group relative overflow-hidden flex flex-col justify-end transition-all duration-700 rounded-[4rem]">
              <img src="/src/assets/templates/tech2.png" className="absolute top-0 right-0 w-full opacity-[0.03] group-hover:opacity-10 transition-all grayscale" alt="Overlay" />
              <div className="relative z-10">
                <Cpu className="text-neonBlue mb-10 group-hover:scale-110 transition-transform" size={100} />
                <h3 className="text-7xl font-black uppercase italic mb-8 leading-none tracking-tighter">Neural Core</h3>
                <p className="text-gray-400 text-2xl leading-relaxed max-w-sm">Autonomous intelligence engineered to optimize your professional hierarchy.</p>
              </div>
            </div>

            <div onClick={() => setSelectedInfo(SECTION_DETAILS.security)} className="md:col-span-2 glass-card p-14 border-white/5 hover:border-neonOrange cursor-pointer group flex items-center gap-12 transition-all duration-700 rounded-[3rem]">
              <div className="p-10 bg-neonOrange/10 rounded-[2.5rem] text-neonOrange group-hover:rotate-12 transition-all shadow-[0_0_50px_rgba(255,165,0,0.2)]">
                <Shield size={70} />
              </div>
              <div>
                <h4 className="text-5xl font-black uppercase italic mb-3 leading-none">Security</h4>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-[12px]">Quantum-Grade Vault Access</p>
              </div>
            </div>

            <div onClick={() => setSelectedInfo(SECTION_DETAILS.about)} className="glass-card p-12 border-white/5 hover:border-neonPurple cursor-pointer group flex flex-col items-center justify-center text-center transition-all duration-700 rounded-[3rem]">
              <Terminal className="text-neonPurple mb-8 group-hover:scale-110 transition-all" size={60} />
              <h4 className="text-2xl font-black uppercase italic">Protocol X</h4>
            </div>

            <div onClick={() => navigate('/editor')} className="glass-card p-12 border-white/5 hover:border-neonBlue cursor-pointer group flex flex-col items-center justify-center text-center transition-all duration-700 rounded-[3rem]">
              <Star className="text-neonBlue mb-8 group-hover:animate-spin-slow transition-all" size={60} />
              <h4 className="text-2xl font-black uppercase italic">Elite Status</h4>
            </div>
          </div>
        </section>

        {/* --- ASSETS --- */}
        <section className="pb-80">
           <div className="flex justify-between items-end mb-24 border-b border-white/5 pb-14">
              <div>
                <h2 className="text-7xl font-black uppercase italic tracking-tighter">Live <span className="text-neonBlue">Deployments</span></h2>
                <p className="text-gray-600 text-[12px] font-black uppercase tracking-[0.6em] mt-6 ml-1 italic text-stroke-white opacity-50">Authorized Encrypted Assets Only</p>
              </div>
              <div className="flex items-center gap-5 bg-white/5 px-10 py-5 rounded-3xl border border-white/10 backdrop-blur-3xl shadow-2xl">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_20px_#22c55e]"></div>
                <span className="text-[12px] font-black uppercase text-gray-400 tracking-[0.5em]">Network: Secure</span>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
              {resumes.map(res => (
                <motion.div key={res.id} whileHover={{ y: -20 }} className="glass-card p-14 border-white/5 hover:border-neonBlue transition-all group relative overflow-hidden rounded-[3.5rem]">
                  <img src="/src/assets/templates/1.png" className="absolute -right-28 -top-28 w-[400px] opacity-[0.02] group-hover:opacity-20 transition-all rotate-[35deg]" alt="Ghost" />
                  <div className="relative z-10">
                    <CheckCircle2 className="text-neonBlue mb-10 group-hover:scale-110 transition-transform" size={45} />
                    <h4 className="text-5xl font-black uppercase italic mb-3 leading-none tracking-tighter">{res.personalInfo?.fullName || "Subject Null"}</h4>
                    <p className="text-neonBlue text-sm font-black uppercase tracking-[0.5em] mb-20">{res.personalInfo?.jobTitle || "Undisclosed Rank"}</p>
                    <div className="flex gap-5">
                      <button onClick={() => navigate(`/editor/${res.id}`)} className="flex-grow bg-white text-black py-5 rounded-2xl font-black uppercase text-xs hover:bg-neonBlue transition-all shadow-xl active:scale-95">Re-Engineer</button>
                      <button onClick={() => handleDelete(res.id)} className="p-5 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/10"><Trash2 size={24}/></button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <div onClick={() => navigate('/editor')} className="border-[6px] border-dashed border-white/5 rounded-[4rem] flex flex-col items-center justify-center p-24 hover:border-neonBlue hover:bg-neonBlue/5 cursor-pointer transition-all duration-700 group">
                <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-neonBlue group-hover:rotate-180 transition-all duration-1000 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  <Plus size={50} className="text-gray-500 group-hover:text-black" />
                </div>
                <p className="text-gray-600 group-hover:text-neonBlue font-black uppercase text-xs tracking-[0.8em] text-center italic">New Node <br/> Deployment</p>
              </div>
           </div>
        </section>

        {/* --- CONTACT FORM SECTION --- */}
       
        {/* --- COMMAND CENTER (CONTACT FORM) --- */}
<section className="pb-80 relative">
  {/* Floating Decorative Elements */}
  <div className="absolute -top-20 -left-20 w-64 h-64 bg-neonBlue/20 blur-[100px] rounded-full animate-pulse"></div>
  
  <div className="glass-card p-1 md:p-2 rounded-[5rem] bg-gradient-to-br from-white/10 to-transparent border-white/5 shadow-2xl overflow-hidden">
    <div className="bg-[#050505]/90 rounded-[4.8rem] p-12 md:p-24 relative overflow-hidden">
      
      {/* Background Decorative Text */}
      <div className="absolute top-0 right-0 p-10 select-none pointer-events-none opacity-[0.03]">
        <h2 className="text-[20rem] font-black italic leading-none">UPLINK</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-32 relative z-10">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[2px] w-12 bg-neonBlue"></div>
            <span className="text-neonBlue font-mono text-xs tracking-[0.8em] uppercase">Communication Channel</span>
          </div>
          
          <h2 className="text-7xl md:text-8xl font-black uppercase italic leading-[0.85] tracking-tighter mb-12">
            DIRECT <br/> 
            <span className="text-neonBlue drop-shadow-[0_0_20px_rgba(0,243,255,0.4)]">COMMAND.</span>
          </h2>
          
          <p className="text-gray-400 text-2xl font-medium mb-16 max-w-md leading-relaxed">
            Require strategic intervention or technical clearance? <span className="text-white">Our high-rank specialists</span> are standing by for global synchronization.
          </p>

          <div className="space-y-10">
            <div className="flex items-center gap-8 group cursor-pointer">
              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl group-hover:bg-neonBlue group-hover:text-black transition-all duration-500 shadow-xl">
                <Mail size={32}/>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Encrypted Mail</p>
                <span className="text-lg font-bold uppercase tracking-widest group-hover:text-neonBlue transition-colors">Core@NeonVault.sys</span>
              </div>
            </div>

            <div className="flex items-center gap-8 group cursor-pointer">
              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl group-hover:bg-neonPurple group-hover:text-black transition-all duration-500 shadow-xl">
                <MessageSquare size={32}/>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Priority Signal</p>
                <span className="text-lg font-bold uppercase tracking-widest group-hover:text-neonPurple transition-colors">Neural Sync Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-neonBlue/20 to-neonPurple/20 blur-2xl opacity-50 rounded-[3rem]"></div>
          <form className="relative bg-[#080808] border border-white/10 p-12 md:p-16 rounded-[4rem] space-y-8 shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] ml-4">Agent Identity</label>
                <input type="text" placeholder="Full Name" className="w-full bg-white/[0.03] border border-white/10 p-6 rounded-2xl font-bold text-white placeholder:text-gray-700 focus:border-neonBlue focus:bg-white/[0.06] outline-none transition-all" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] ml-4">Secure Channel</label>
                <input type="email" placeholder="Email Address" className="w-full bg-white/[0.03] border border-white/10 p-6 rounded-2xl font-bold text-white placeholder:text-gray-700 focus:border-neonBlue focus:bg-white/[0.06] outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] ml-4">Transmission Intel</label>
              <textarea rows="5" placeholder="Enter your mission details..." className="w-full bg-white/[0.03] border border-white/10 p-6 rounded-2xl font-bold text-white placeholder:text-gray-700 focus:border-neonBlue focus:bg-white/[0.06] outline-none transition-all resize-none"></textarea>
            </div>

            <button className="w-full group bg-white text-black py-8 rounded-3xl font-black uppercase text-sm tracking-[0.6em] flex justify-center items-center gap-6 hover:bg-neonBlue transition-all duration-500 shadow-[0_20px_50px_rgba(0,243,255,0.15)] active:scale-95 overflow-hidden relative">
              <span className="relative z-10 flex items-center gap-4">SEND UPLINK <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-40 border-t border-white/5 bg-white/[0.01] px-12 relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-24">
          <div className="text-left">
            <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-10 leading-none">DOMINATE <br/> <span className="text-neonBlue">THY LANDSCAPE.</span></h2>
            <p className="text-gray-600 font-medium max-w-sm uppercase text-[12px] tracking-[0.4em] leading-loose italic">Precision. Authority. Aesthetic. The three pillars of the NeonVault ecosystem. Established 2026.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-28">
            <div className="flex flex-col gap-8">
              <span className="text-white font-black uppercase text-[12px] tracking-[0.5em] border-b border-neonBlue/30 pb-4">Ecosystem</span>
              {['Protocols', 'AI Synthesis', 'The Vault'].map(link => (
                <button key={link} className="text-gray-600 hover:text-white text-[11px] font-black uppercase tracking-widest text-left transition-all hover:translate-x-3">{link}</button>
              ))}
            </div>
            <div className="flex flex-col gap-8">
              <span className="text-white font-black uppercase text-[12px] tracking-[0.5em] border-b border-neonPurple/30 pb-4">Legal</span>
              {['Classified', 'Encryption', 'Privacy'].map(link => (
                <button key={link} className="text-gray-600 hover:text-white text-[11px] font-black uppercase tracking-widest text-left transition-all hover:translate-x-3">{link}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-40 pt-14 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-[10px] text-gray-800 font-black uppercase tracking-[2.5em] ml-10">NEONVAULT SYSTEM © 2026.02.09</p>
          <div className="flex gap-14 opacity-20">
            <Activity size={20} className="hover:text-neonBlue cursor-pointer" />
            <Globe size={20} className="hover:text-neonBlue cursor-pointer" />
            <Terminal size={20} className="hover:text-neonBlue cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;