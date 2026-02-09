import { useResume } from "../context/ResumeContext";

const { resumeData, setResumeData } = useResume();

<input
  type="text"
  placeholder="Full Name"
  value={resumeData.personal.name}
  onChange={(e) =>
    setResumeData({
      ...resumeData,
      personal: {
        ...resumeData.personal,
        name: e.target.value,
      },
    })
  }
/>
