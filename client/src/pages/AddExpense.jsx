import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api/api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashBoardLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const schema = z.object({
  amount: z.string().min(1),
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
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: "",
      category: "",
      note: "",
      sourceId: "",
      date: "",
    },
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
        <h2 className="text-xl font-bold text-center">Add Expense</h2>

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
          <p className="text-red-500">{errors.amount.message}</p>
        )}
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select value={field.value ?? ""} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="h-72">
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}

        <Controller
          name="sourceId"
          control={control}
          render={({ field }) => (
            <Select value={field.value ?? ""} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a source" />
              </SelectTrigger>
              <SelectContent className="h-32">
                {sources.map((source) => (
                  <SelectItem key={source._id} value={source._id}>
                    {source.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.sourceId && (
          <p className="text-red-500 text-sm">{errors.sourceId.message}</p>
        )}

        <Controller
          name="note"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Add a note (optional)"
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />

        <Controller
          name="date"
          control={control}
          render={({ field }) => {
            const parsedDate = field.value ? new Date(field.value) : undefined;

            return (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full text-left font-normal flex justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <p>
                      {field.value
                        ? format(parsedDate, "yyyy-MM-dd")
                        : "Pick a date"}
                    </p>
                    <CalendarIcon className="w-4 h-4 ml-2 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={parsedDate}
                    onSelect={(date) => {
                      if (date) {
                        field.onChange(format(date, "yyyy-MM-dd"));
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            );
          }}
        />

        <Button
          type="submit"
          className="btn bg-blue-500 hover:bg-blue-600 text-white w-full"
        >
          Add Expense
        </Button>
      </form>
    </DashboardLayout>
  );
}
