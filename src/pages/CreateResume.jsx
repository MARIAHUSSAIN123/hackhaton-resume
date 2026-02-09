import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateResume() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    role: "",
    summary: "",
    gender: "male",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePreview = () => {
    localStorage.setItem(
      "resumeData",
      JSON.stringify({ ...form, templateId: id })
    );
    navigate(`/preview/${id}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <div className="bg-[#111] p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-orange-500 mb-6">
          Create Your Resume
        </h2>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full mb-4 p-2 bg-black border border-gray-600 rounded"
        />

        <input
          name="role"
          placeholder="Job Title"
          onChange={handleChange}
          className="w-full mb-4 p-2 bg-black border border-gray-600 rounded"
        />

        <textarea
          name="summary"
          placeholder="Profile Summary"
          onChange={handleChange}
          className="w-full mb-4 p-2 bg-black border border-gray-600 rounded"
        />

        <select
          name="gender"
          onChange={handleChange}
          className="w-full mb-6 p-2 bg-black border border-gray-600 rounded"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button
          onClick={handlePreview}
          className="w-full bg-orange-500 text-black py-2 rounded font-semibold"
        >
          Preview Resume
        </button>
      </div>
    </div>
  );
}
