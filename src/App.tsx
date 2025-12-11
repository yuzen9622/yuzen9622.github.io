import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import LangLayout from "@/components/layouts/LangLayout";

function App() {
  return (
    <Routes>
      <Route path="/:lng/*" element={<LangLayout />} />
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
}

export default App;
