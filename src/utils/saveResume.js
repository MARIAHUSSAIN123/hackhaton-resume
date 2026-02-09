import { ref, set } from "firebase/database";
import { db } from "../firebase/config";

export const saveResume = async (uid, resumeData) => {
  const resumeId = Date.now();
  await set(ref(db, `resumes/${uid}/${resumeId}`), resumeData);
};
