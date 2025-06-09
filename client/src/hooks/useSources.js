import { useQuery } from "@tanstack/react-query";
import { useSourceStore } from "@/context/sourceStore";

export const useSources = () => {
  const fetchSources = useSourceStore.getState().fetchSources;

  useQuery({
    queryKey: ["sources"],
    queryFn: fetchSources,
  });
};
