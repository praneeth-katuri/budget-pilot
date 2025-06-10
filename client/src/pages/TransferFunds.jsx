import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import api from "@/services/api/api";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/layout/DashBoardLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  fromId: z.string().min(1),
  toId: z.string().min(1),
  amount: z.number().positive(),
});

export default function Transfers() {
  const {
    control,
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

        <Controller
          name="fromId"
          control={control}
          render={({ field }) => (
            <Select value={field.value ?? ""} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select source account" />
              </SelectTrigger>
              <SelectContent className="max-h-44">
                {sources.map((source) => (
                  <SelectItem key={source._id} value={source._id}>
                    {source.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.fromId && (
          <p className="text-red-500 text-sm">{errors.fromId.message}</p>
        )}

        <Controller
          name="toId"
          control={control}
          render={({ field }) => (
            <Select value={field.value ?? ""} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {sources.map((source) => (
                  <SelectItem key={source._id} value={source._id}>
                    {source.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.toId && (
          <p className="text-red-500 text-sm">{errors.toId.message}</p>
        )}
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter amount"
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />

        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount.message}</p>
        )}

        <Button
          type="submit"
          className="btn bg-blue-500 hover:bg-blue-600 text-white w-full"
        >
          Transfer
        </Button>
      </form>
    </DashboardLayout>
  );
}
