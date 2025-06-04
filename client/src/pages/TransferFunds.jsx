import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";

const schema = z.object({
  fromId: z.string().min(1),
  toId: z.string().min(1),
  amount: z.number().positive(),
});

export default function Transfers() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [sources, setSources] = useState([]);

  useEffect(() => {
    api.get("/sources").then((res) => setSources(res.data));
  }, []);

  const onSubmit = async (data) => {
    try {
      data.amount = Number(data.amount);
      if (data.fromId === data.toId) {
        toast.error("Cannot transfer to the same source");
        return;
      }
      await api.put("/sources/transfer", data);
      toast.success("Transfer successful");
      reset();
    } catch {
      toast.error("Transfer failed");
    }
  };

  return (
    <DashboardLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-4 space-y-4 bg-white dark:bg-gray-800 rounded shadow"
      >
        <h2 className="text-xl font-bold">Transfer Funds</h2>

        <select {...register("fromId")} className="input w-full">
          <option value="">From Source</option>
          {sources.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        <select {...register("toId")} className="input w-full">
          <option value="">To Source</option>
          {sources.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          {...register("amount", { valueAsNumber: true })}
          type="number"
          placeholder="Amount"
          className="input w-full"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount.message}</p>
        )}

        <button type="submit" className="btn bg-blue-600 text-white w-full">
          Transfer
        </button>
      </form>
    </DashboardLayout>
  );
}
