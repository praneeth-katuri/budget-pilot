import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const schema = z.object({
  amount: z.number().positive(),
  category: z.string().min(1),
  note: z.string().optional(),
  sourceId: z.string().min(1),
  date: z.string().min(1),
});

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills",
  "Health",
  "Groceries",
  "Education",
  "Subscriptions",
  "Other",
];

export default function AddExpense() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
      await api.post("/expenses", data);
      toast.success("Expense added");
      reset();
    } catch {
      toast.error("Failed to add expense");
    }
  };

  return (
    <DashboardLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-4 space-y-4 bg-white dark:bg-gray-800 rounded shadow"
      >
        <h2 className="text-xl font-bold">Add Expense</h2>

        <input
          {...register("amount", { valueAsNumber: true })}
          type="number"
          placeholder="Amount"
          className="input w-full"
        />
        {errors.amount && (
          <p className="text-red-500">{errors.amount.message}</p>
        )}

        <select {...register("category")} className="input w-full">
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select {...register("sourceId")} className="input w-full">
          <option value="">Select source</option>
          {sources.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          {...register("note")}
          placeholder="Note (optional)"
          className="input w-full"
        />
        <input {...register("date")} type="date" className="input w-full" />

        <button type="submit" className="btn bg-blue-600 text-white w-full">
          Add Expense
        </button>
      </form>
    </DashboardLayout>
  );
}
