import { useEffect, useState } from "react";
import api from "@/services/api";
import SourceCard from "./SourceCard";

export default function SourceSection() {
  const [sources, setSources] = useState([]);

  const fetchSources = async () => {
    const res = await api.get("/sources");
    setSources(res.data);
  };

  useEffect(() => {
    fetchSources();
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-4">Sources</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {sources.map((source) => (
          <SourceCard
            key={source._id}
            source={source}
            onRefresh={fetchSources}
          />
        ))}
      </div>
    </div>
  );
}
