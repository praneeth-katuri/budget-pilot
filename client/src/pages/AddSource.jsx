import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";

const schema = z.object({
  name: z.string().min(2, "Source name is too short"),
});

export default function AddSource() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/sources", data);
      toast.success("Source added");
      reset();
    } catch {
      toast.error("Failed to add source");
    }
  };

  return (
    <DashboardLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-4 space-y-4 bg-white dark:bg-gray-800 rounded shadow"
      >
        <h2 className="text-xl font-bold">Add Source</h2>
        <input
          {...register("name")}
          placeholder="Source name"
          className="input w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
        <button type="submit" className="btn bg-blue-600 text-white w-full">
          Add Source
        </button>
      </form>
    </DashboardLayout>
  );
}
