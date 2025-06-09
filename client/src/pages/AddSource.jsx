import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api/api";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Source name is too short"),
  balance: z.string().optional(),
});

export default function AddSource() {
  const {
    control,
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
        <h2 className="text-xl font-bold text-center">Add Source</h2>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Source name"
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />

        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <Controller
          name="balance"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Intial Balance (optional)"
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
        <Button
          type="submit"
          className="btn bg-blue-500 hover:bg-blue-600 text-white w-full"
        >
          Add Source
        </Button>
      </form>
    </DashboardLayout>
  );
}
