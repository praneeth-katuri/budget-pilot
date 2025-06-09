import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import { useRef, useState } from "react";
import { useUpdateUserBudget } from "@/hooks/useUpdateUserBudget";
import toast from "react-hot-toast";

export function BudgetButton() {
  const [openInput, setOpenInput] = useState(false);
  const toggleInput = () => setOpenInput((state) => !state);
  const inputRef = useRef(null);

  const { mutate: updateBudget, isLoading } = useUpdateUserBudget(setOpenInput);

  const setBudget = () => {
    const value = inputRef.current.value;
    if (!value.trim()) {
      toast.error("Amount is required");
      return;
    }

    if (!/^\d+$/.test(value)) {
      toast.error("Please enter a valid whole number");
      return;
    }

    updateBudget(Number(value));
  };

  return (
    <div className="flex justify-end gap-1">
      {openInput && (
        <>
          <Input
            type="text"
            ref={inputRef}
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Budget"
            className="w-24"
            disabled={isLoading}
          />

          <Button
            className="bg-green-500 hover:bg-green-600"
            onClick={setBudget}
          >
            <Check className="text-white w-5 h-5" strokeWidth={3} />
          </Button>

          <Button className="bg-red-500 hover:bg-red-600" onClick={toggleInput}>
            <X className="text-white w-5 h-5" strokeWidth={3} />
          </Button>
        </>
      )}

      {!openInput && (
        <Button className="cursor-pointer" onClick={toggleInput}>
          Set Budget
        </Button>
      )}
    </div>
  );
}
