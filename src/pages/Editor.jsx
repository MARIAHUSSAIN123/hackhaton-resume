import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { notifySuccess, notifyError } from '../utils/notifications';
import { Save, Download, Plus, Trash2, ArrowLeft } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    personalInfo: { fullName: '', email: '', phone: '', jobTitle: '', summary: '', location: '' },
    education: [{ school: '', degree: '', year: '' }],
    experience: [{ company: '', role: '', duration: '', description: '' }],
    skills: '',
    languages: ''
  });

  useEffect(() => {
    if (id) {
      const fetchResume = async () => {
        const docRef = doc(db, "resumes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setFormData(docSnap.data());
      };
      fetchResume();
    }
  }, [id]);

  const handlePersonalChange = (e) => {
    setFormData({
      ...formData,
      personalInfo: { ...formData.personalInfo, [e.target.name]: e.target.value }
    });
  };

  const handleDynamicChange = (index, section, field, value) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][field] = value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  const addField = (section, schema) => {
    setFormData({ ...formData, [section]: [...formData[section], schema] });
  };

  const removeField = (index, section) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (id) {
        await updateDoc(doc(db, "resumes", id), formData);
        notifySuccess("Asset Synchronized!");
      } else {
        await addDoc(collection(db, "resumes"), {
          ...formData,
          userId: auth.currentUser.uid,
          createdAt: new Date()
        });
        notifySuccess("New Asset Deployed!");
        navigate('/dashboard');
      }
    } catch (err) {
      notifyError("System Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const input = document.getElementById('resume-preview');
    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${formData.personalInfo.fullName || 'NEON_ASSET'}.pdf`);
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#020202] text-white overflow-x-hidden font-sans">
      
      {/* LEFT: FORM SECTION (Scrollable on Desktop) */}
      <div className="w-full lg:w-1/2 p-5 md:p-10 lg:h-screen lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-white/5 custom-scrollbar relative z-10">
        
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-12 sticky top-0 bg-[#020202]/90 backdrop-blur-xl py-4 z-50">
          <button onClick={() => navigate('/dashboard')} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-gray-400 hover:text-white flex items-center gap-2 border border-white/5">
            <ArrowLeft size={20} /> <span className="hidden sm:inline font-black uppercase text-[10px] tracking-widest">Abort</span>
          </button>
          
          <button 
            onClick={handleSave} 
            disabled={loading} 
            className="bg-neonBlue text-black px-8 py-3.5 rounded-xl font-black uppercase text-xs flex items-center gap-2 hover:shadow-[0_0_25px_rgba(0,243,255,0.4)] transition-all active:scale-95 disabled:opacity-50"
          >
            <Save size={18} /> {loading ? 'Syncing...' : 'Save Asset'}
          </button>
        </div>

        <div className="max-w-2xl mx-auto space-y-12">
          
          {/* Section 01: Personal */}
          <section className="glass-card p-6 md:p-8 border-l-4 border-neonBlue rounded-[2rem] bg-white/[0.02]">
            <h3 className="text-xs font-black text-neonBlue mb-8 uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="w-8 h-[1px] bg-neonBlue"></span> Personal Data
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <input name="fullName" value={formData.personalInfo.fullName} onChange={handlePersonalChange} placeholder="Full Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-neonBlue outline-none transition-all placeholder:text-gray-700" />
              </div>
              <input name="jobTitle" value={formData.personalInfo.jobTitle} onChange={handlePersonalChange} placeholder="Target Role" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-neonBlue outline-none transition-all placeholder:text-gray-700" />
              <input name="email" value={formData.personalInfo.email} onChange={handlePersonalChange} placeholder="Email Access" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-neonBlue outline-none transition-all placeholder:text-gray-700" />
              <textarea name="summary" value={formData.personalInfo.summary} onChange={handlePersonalChange} placeholder="Brief your professional legacy..." className="sm:col-span-2 w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-neonBlue outline-none h-32 resize-none placeholder:text-gray-700" />
            </div>
          </section>

          {/* Section 02: Experience */}
          <section className="glass-card p-6 md:p-8 border-l-4 border-neonOrange rounded-[2rem] bg-white/[0.02]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xs font-black text-neonOrange uppercase tracking-[0.3em] flex items-center gap-3">
                <span className="w-8 h-[1px] bg-neonOrange"></span> Deployment History
              </h3>
              <button onClick={() => addField('experience', { company: '', role: '', duration: '', description: '' })} className="p-2 bg-neonOrange/10 text-neonOrange rounded-lg hover:bg-neonOrange hover:text-black transition-all">
                <Plus size={20}/>
              </button>
            </div>
            
            {formData.experience.map((exp, i) => (
              <div key={i} className="mb-8 p-6 bg-black/40 rounded-2xl relative border border-white/5 group">
                <button onClick={() => removeField(i, 'experience')} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110">
                  <Trash2 size={14}/>
                </button>
                <div className="space-y-4">
                  <input placeholder="Organization" value={exp.company} onChange={(e) => handleDynamicChange(i, 'experience', 'company', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-neonOrange outline-none" />
                  <input placeholder="Designation" value={exp.role} onChange={(e) => handleDynamicChange(i, 'experience', 'role', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-neonOrange outline-none" />
                  <input placeholder="Timeline (e.g., 2024 - PRESENT)" value={exp.duration} onChange={(e) => handleDynamicChange(i, 'experience', 'duration', e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-neonOrange outline-none font-mono text-[10px] tracking-widest" />
                </div>
              </div>
            ))}
          </section>

          {/* Section 03: Skills */}
          <section className="glass-card p-6 md:p-8 border-l-4 border-neonPurple rounded-[2rem] bg-white/[0.02] mb-10">
            <h3 className="text-xs font-black text-neonPurple mb-8 uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="w-8 h-[1px] bg-neonPurple"></span> Technical Arsenal
            </h3>
            <input 
              placeholder="NEURAL NETWORKS, REACT, GOLANG (Comma Separated)" 
              value={formData.skills} 
              onChange={(e) => setFormData({...formData, skills: e.target.value})} 
              className="w-full bg-white/5 border border-white/10 p-5 rounded-xl focus:border-neonPurple outline-none placeholder:text-gray-700 uppercase font-mono text-xs tracking-widest" 
            />
          </section>
        </div>
      </div>

      {/* RIGHT: LIVE PREVIEW (Fixed/Scaled for Mobile) */}
      <div className="w-full lg:w-1/2 bg-[#050505] p-4 md:p-10 lg:h-screen lg:overflow-y-auto flex flex-col items-center relative">
        <div className="w-full max-w-[210mm] flex justify-between items-center mb-10 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-neonBlue rounded-full animate-ping"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Live Render Alpha</span>
          </div>
          <button onClick={downloadPDF} className="bg-white text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] flex items-center gap-2 hover:bg-neonBlue transition-all shadow-2xl active:scale-95">
            <Download size={16} /> Export PDF
          </button>
        </div>

        {/* Scalable Resume Canvas */}
        <div className="w-full flex justify-center pb-20 overflow-hidden lg:overflow-visible">
          <div 
            id="resume-preview" 
            className="bg-white text-gray-900 w-[210mm] min-h-[297mm] p-16 shadow-[0_0_80px_rgba(0,0,0,0.5)] flex flex-col font-sans origin-top scale-[0.35] sm:scale-[0.55] md:scale-[0.75] lg:scale-100 mb-[-500px] sm:mb-[-300px] lg:mb-0"
          >
            {/* Template Header */}
            <div className="border-b-[15px] border-black pb-10 mb-12">
              <h1 className="text-7xl font-black text-black tracking-tighter uppercase leading-[0.8] mb-4">{formData.personalInfo.fullName || "IDENT_NULL"}</h1>
              <h2 className="text-3xl font-bold text-neonOrange uppercase tracking-[0.2em]">{formData.personalInfo.jobTitle || "OPERATIVE"}</h2>
              <div className="flex flex-wrap gap-6 mt-8 text-xs font-black uppercase tracking-widest text-gray-500">
                <span>{formData.personalInfo.email}</span>
                <span>{formData.personalInfo.phone}</span>
                <span>{formData.personalInfo.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-16 flex-grow">
              <div className="col-span-2 space-y-12">
                <section>
                  <h3 className="text-xl font-black border-b-4 border-black pb-2 mb-6 uppercase tracking-tighter">Manifesto</h3>
                  <p className="text-sm leading-relaxed font-medium text-gray-700">{formData.personalInfo.summary || "Awaiting system input..."}</p>
                </section>

                <section>
                  <h3 className="text-xl font-black border-b-4 border-black pb-2 mb-6 uppercase tracking-tighter">Mission History</h3>
                  {formData.experience.map((exp, i) => (
                    <div key={i} className="mb-8">
                      <div className="flex justify-between font-black text-black text-lg">
                        <span className="uppercase">{exp.role}</span>
                        <span className="font-mono text-sm tracking-tighter">{exp.duration}</span>
                      </div>
                      <p className="text-neonOrange font-black text-sm uppercase tracking-widest mt-1">{exp.company}</p>
                      <p className="text-xs mt-3 text-gray-600 font-medium leading-relaxed">{exp.description || "Execution details encrypted."}</p>
                    </div>
                  ))}
                </section>
              </div>

              <div className="col-span-1 space-y-12 border-l-2 border-gray-100 pl-10">
                <section>
                  <h3 className="text-xl font-black border-b-4 border-black pb-2 mb-8 uppercase tracking-tighter">Core Skills</h3>
                  <div className="flex flex-col gap-4">
                    {formData.skills.split(',').map((skill, i) => (
                      skill && (
                        <div key={i} className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Module {i+1}</span>
                          <span className="text-sm font-black bg-gray-50 p-3 border-r-4 border-neonBlue text-black uppercase">{skill.trim()}</span>
                        </div>
                      )
                    ))}
                  </div>
                </section>
              </div>
            </div>

            <footer className="mt-20 pt-10 border-t border-gray-100 text-[8px] font-black uppercase tracking-[0.5em] text-gray-300">
              NeonVault Generated Asset // 2026 High-Fidelity Output
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;