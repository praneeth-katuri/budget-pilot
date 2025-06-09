import { useSourceStore } from "@/context/sourceStore";
import SourceCard from "./SourceCard";
import { useSources } from "@/hooks/useSources";
import { useState } from "react";
import { Button } from "../ui/button";

export default function SourceSection() {
  useSources(); // fetches and sets the sources DO NOT play with this
  const sources = useSourceStore((s) => s.sources);
  const updateSource = useSourceStore.getState().updateSource;

  const [viewAll, setViewAll] = useState(false);
  const toggleViewAll = () => setViewAll((s) => !s);

  const hiddenSources = sources.length > 3;
  const sourcesToView = !viewAll ? sources.slice(0, 3) : sources;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold uppercase">Sources</h2>
        {hiddenSources && (
          <Button onClick={toggleViewAll} className="cursor-pointer">
            {viewAll ? "View Less" : "View more"}
          </Button>
        )}
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {sourcesToView.map((source) => (
          <SourceCard
            key={source._id}
            source={source}
            updateSource={updateSource}
          />
        ))}
      </div>
    </div>
  );
}
