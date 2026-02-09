import { useNavigate } from "react-router-dom";

export default function TemplateCard({ id, img }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/editor/${id}`)}
      className="cursor-pointer rounded-xl overflow-hidden
      border border-orange-500 hover:scale-105 transition
      shadow-[0_0_25px_#ff7a00]"
    >
      <img src={img} alt="Template" />
    </div>
  );
}
