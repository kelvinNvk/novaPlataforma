import { BrowserRouter, Routes, Route } from "react-router-dom";
import HealthPage from "./pages/health.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<h1 className="text-3xl font-bold">Home</h1>}
        />
        <Route path="/health" element={<HealthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
