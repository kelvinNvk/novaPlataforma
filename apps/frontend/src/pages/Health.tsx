import { useEffect, useState } from "react";
import api from "../services/api";

export default function HealthPage() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    api
      .get("/health")
      .then((res) => setStatus(res.data.status))
      .catch(() => setStatus("API OFFLINE"));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-green-600">
        API Status: {status}
      </h1>
    </div>
  );
}
