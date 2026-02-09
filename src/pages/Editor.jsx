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

  // Fetch data if editing existing resume [cite: 37]
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

  // Handle Input Changes
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

  // Save to Firebase [cite: 32, 70]
  const handleSave = async () => {
    setLoading(true);
    try {
      if (id) {
        await updateDoc(doc(db, "resumes", id), formData);
        notifySuccess("Resume Updated Successfully!");
      } else {
        await addDoc(collection(db, "resumes"), {
          ...formData,
          userId: auth.currentUser.uid,
          createdAt: new Date()
        });
        notifySuccess("Resume Saved to Cloud!");
        navigate('/dashboard');
      }
    } catch (err) {
      notifyError("Firestore Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // PDF Export [cite: 39]
  const downloadPDF = () => {
    const input = document.getElementById('resume-preview');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${formData.personalInfo.fullName || 'Resume'}.pdf`);
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-darkBg overflow-hidden">
      {/* LEFT: FORM SECTION [cite: 6, 23] */}
      <div className="w-full md:w-1/2 p-6 overflow-y-auto border-r border-gray-800 custom-scrollbar">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-neonBlue flex items-center gap-2">
            <ArrowLeft size={20} /> Back
          </button>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={loading} className="bg-neonBlue text-black px-5 py-2 rounded-lg font-bold flex items-center gap-2 hover:shadow-neon-blue transition-all">
              <Save size={18} /> {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        <section className="space-y-8" data-aos="fade-right">
          {/* Personal Info [cite: 24] */}
          <div className="glass-card p-6 border-l-4 border-neonBlue">
            <h3 className="text-xl font-bold text-neonBlue mb-4 uppercase">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <input name="fullName" value={formData.personalInfo.fullName} onChange={handlePersonalChange} placeholder="Full Name" className="col-span-2 input-style" />
              <input name="jobTitle" value={formData.personalInfo.jobTitle} onChange={handlePersonalChange} placeholder="Job Title" className="input-style" />
              <input name="email" value={formData.personalInfo.email} onChange={handlePersonalChange} placeholder="Email" className="input-style" />
              <input name="phone" value={formData.personalInfo.phone} onChange={handlePersonalChange} placeholder="Phone" className="input-style" />
              <input name="location" value={formData.personalInfo.location} onChange={handlePersonalChange} placeholder="Location (City, Country)" className="input-style" />
              <textarea name="summary" value={formData.personalInfo.summary} onChange={handlePersonalChange} placeholder="Professional Summary" className="col-span-2 input-style h-24" />
            </div>
          </div>

          {/* Experience [cite: 26] */}
          <div className="glass-card p-6 border-l-4 border-neonOrange">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-neonOrange uppercase">Experience</h3>
              <button onClick={() => addField('experience', { company: '', role: '', duration: '', description: '' })} className="text-neonOrange hover:scale-110 transition-transform"><Plus /></button>
            </div>
            {formData.experience.map((exp, i) => (
              <div key={i} className="space-y-3 mb-6 p-4 bg-black/30 rounded-lg relative group">
                <button onClick={() => removeField(i, 'experience')} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                <input placeholder="Company" value={exp.company} onChange={(e) => handleDynamicChange(i, 'experience', 'company', e.target.value)} className="input-style" />
                <input placeholder="Role" value={exp.role} onChange={(e) => handleDynamicChange(i, 'experience', 'role', e.target.value)} className="input-style" />
                <input placeholder="Duration (e.g. 2021 - Present)" value={exp.duration} onChange={(e) => handleDynamicChange(i, 'experience', 'duration', e.target.value)} className="input-style" />
              </div>
            ))}
          </div>

          {/* Skills [cite: 27] */}
          <div className="glass-card p-6 border-l-4 border-neonPurple">
            <h3 className="text-xl font-bold text-neonPurple mb-4 uppercase">Skills</h3>
            <input 
              placeholder="React, Node.js, Tailwind (comma separated)" 
              value={formData.skills} 
              onChange={(e) => setFormData({...formData, skills: e.target.value})} 
              className="input-style" 
            />
          </div>
        </section>
      </div>

      {/* RIGHT: PREVIEW SECTION [cite: 36, 43] */}
      <div className="w-full md:w-1/2 bg-gray-900 p-4 md:p-10 overflow-y-auto flex flex-col items-center">
        <button onClick={downloadPDF} className="mb-6 bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-neonBlue transition-all self-end">
          <Download size={20} /> Download PDF
        </button>

        {/* Professional Template Design [cite: 43] */}
        <div id="resume-preview" className="bg-white text-gray-800 w-full max-w-[210mm] min-h-[297mm] p-12 shadow-2xl flex flex-col font-sans">
          <div className="border-b-8 border-black pb-6 mb-8">
            <h1 className="text-5xl font-black text-black tracking-tighter uppercase mb-2">{formData.personalInfo.fullName || "Your Name"}</h1>
            <h2 className="text-2xl font-bold text-neonOrange uppercase tracking-widest">{formData.personalInfo.jobTitle || "Job Title"}</h2>
            <div className="flex flex-wrap gap-4 mt-4 text-sm font-semibold text-gray-600">
              <span>{formData.personalInfo.email}</span>
              <span>{formData.personalInfo.phone}</span>
              <span>{formData.personalInfo.location}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-10 flex-grow">
            <div className="col-span-2 space-y-8">
              <section>
                <h3 className="text-lg font-black border-b-2 border-black mb-3 uppercase tracking-wider">Profile</h3>
                <p className="text-sm leading-relaxed text-gray-700">{formData.personalInfo.summary || "Summary text will appear here..."}</p>
              </section>

              <section>
                <h3 className="text-lg font-black border-b-2 border-black mb-3 uppercase tracking-wider">Experience</h3>
                {formData.experience.map((exp, i) => (
                  <div key={i} className="mb-5">
                    <div className="flex justify-between font-bold text-black">
                      <span>{exp.role}</span>
                      <span>{exp.duration}</span>
                    </div>
                    <p className="text-neonOrange font-bold text-sm uppercase">{exp.company}</p>
                    <p className="text-xs mt-1 text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </section>
            </div>

            <div className="col-span-1 space-y-8 border-l pl-8 border-gray-200">
              <section>
                <h3 className="text-lg font-black border-b-2 border-black mb-4 uppercase tracking-wider">Skills</h3>
                <div className="flex flex-col gap-2">
                  {formData.skills.split(',').map((skill, i) => (
                    skill && <span key={i} className="text-sm font-bold bg-gray-100 px-3 py-1 rounded text-black border-r-4 border-neonBlue">{skill.trim()}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;