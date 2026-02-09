import { useResume } from "../context/ResumeContext";
import male from "../assets/templates/male.png";
import female from "../assets/templates/female.png";

export default function ResumePreview() {
  const { resumeData } = useResume();

  const {
    name,
    role,
    summary,
    skills,
    gender,
    template,
  } = resumeData;

  return (
    <div
      id="resume"
      className={`bg-white text-black p-10 min-h-[1000px] ${
        template === "template2"
          ? "border-l-8 border-orange-500"
          : template === "template3"
          ? "bg-gray-100"
          : ""
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={gender === "male" ? male : female}
          alt="avatar"
          className="w-24 h-24 rounded-full border-4 border-orange-500"
        />

        <div>
          <h1 className="text-4xl font-bold">{name || "Your Name"}</h1>
          <p className="text-orange-500 text-lg font-semibold">
            {role || "Your Role"}
          </p>
        </div>
      </div>

      {/* SUMMARY */}
      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-orange-500 mb-2">
          Profile Summary
        </h2>
        <p className="text-gray-700">
          {summary || "Write a short professional summary about yourself."}
        </p>
      </section>

      {/* SKILLS */}
      <section>
        <h2 className="text-xl font-bold border-b-2 border-orange-500 mb-2">
          Skills
        </h2>

        <ul className="grid grid-cols-2 gap-2">
          {skills
            ? skills.split(",").map((skill, i) => (
                <li
                  key={i}
                  className="bg-orange-100 text-orange-700 px-3 py-1 rounded"
                >
                  {skill.trim()}
                </li>
              ))
            : "Add skills separated by commas"}
        </ul>
      </section>
    </div>
  );
}
