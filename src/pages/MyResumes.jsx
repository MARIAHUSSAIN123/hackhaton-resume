import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export default function MyResumes() {
  const [resumes, setResumes] = useState([]);
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    if (!auth.currentUser) return;

    const resumeRef = ref(db, `resumes/${auth.currentUser.uid}`);

    onValue(resumeRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setResumes([]);
        return;
      }

      const list = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      setResumes(list);
    });
  }, []);

  return (
    <div>
      <h2>My Resumes</h2>

      {resumes.length === 0 && <p>No resumes saved yet</p>}

      {resumes.map((r) => (
        <div key={r.id}>
          <h3>{r.name}</h3>
          <p>{r.email}</p>
        </div>
      ))}
    </div>
  );
}
