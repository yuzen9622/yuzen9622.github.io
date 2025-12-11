import { Languages } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

export function LangSwitcher() {
  const { lng } = useParams();
  const navigate = useNavigate();

  const switchTo = (newLng: string) => {
    const newPath = window.location.pathname.replace(`/${lng}`, `/${newLng}`);
    navigate(newPath);
  };

  return (
    <button onClick={() => switchTo(lng === "en" ? "zh" : "en")}>
      <Languages size={18} />
    </button>
  );
}
