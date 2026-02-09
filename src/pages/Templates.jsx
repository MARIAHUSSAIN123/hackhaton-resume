import TemplateCard from "../components/TemplateCard";

import temp1 from "../assets/templates/temp1.png";
import temp2 from "../assets/templates/temp2.png";
import temp3 from "../assets/templates/temp3.png";

const templates = [
  { id: "1", img: temp1 },
  { id: "2", img: temp2 },
  { id: "3", img: temp3 },
];

export default function Templates() {
  return (
    <div className="bg-black min-h-screen px-16 py-20">
      <h2 className="text-4xl font-bold text-white text-center mb-12">
        Choose Your <span className="text-orange-500">Template</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {templates.map((t) => (
          <TemplateCard key={t.id} id={t.id} img={t.img} />
        ))}
      </div>
    </div>
  );
}
