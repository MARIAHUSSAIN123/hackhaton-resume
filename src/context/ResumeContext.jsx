import { createContext, useContext, useState } from "react";
import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState({
    name: "",
    role: "",
    gender: "female",
    skills: "",
    summary: "",
    template: "template1",
  });

  const saveResume = async (data) => {
    if (!user) return;
    await setDoc(doc(db, "resumes", user.uid), data);
  };

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, saveResume }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
