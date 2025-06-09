import { useRef, useState } from "react";
import api from "@/services/api/api";
import toast from "react-hot-toast";
import { DeleteDialog } from "./DeleteDialog";
import { useSourceStore } from "@/context/sourceStore";

export default function SourceCard({ source, updateSource }) {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);
  const deleteSource = useSourceStore.getState().deleteSource;

  const handleDeposit = async () => {
    try {
      const amount = inputRef.current.value;
      if (!amount.trim()) {
        inputRef.current.value = "";
        toast.error("Amount is required");
        return;
      }

      if (!/^\d+$/.test(amount)) {
        inputRef.current.value = "";
        toast.error("Please enter a valid whole number");
        return;
      }
      await api.post(`/sources/${source._id}/deposit`, {
        amount: Number(amount),
      });
      updateSource(source._id, amount);
      toast.success("Money added successfully");
      setShowInput(false);
    } catch (err) {
      console.err(err.message);
      toast.error("Failed to add money");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow space-y-2">
      <div className="flex justify-between items-center">
        <div className="font-semibold uppercase text-lg">{source.name}</div>

        <DeleteDialog deleteSource={deleteSource} sid={source._id} />
      </div>
      <div className="text-sm font-mono text-gray-400">
        Balance: ₹{source.balance}
      </div>
      {showInput ? (
        <div className="space-y-2">
          <input
            type="text"
            inputMode="numeric"
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            placeholder="Enter amount"
            ref={inputRef}
          />

          <div className="flex gap-2">
            <button
              onClick={handleDeposit}
              className="btn bg-green-600 rounded py-1 px-2 text-white"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowInput(false)}
              className="btn bg-gray-500 py-1 px-2 rounded text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="btn bg-blue-600 text-white rounded p-2 w-full"
        >
          Add Money
        </button>
      )}
    </div>
  );
}
