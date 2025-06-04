import { useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

export default function SourceCard({ source, onRefresh }) {
  const [showInput, setShowInput] = useState(false);
  const [amount, setAmount] = useState("");

  const handleDeposit = async () => {
    try {
      await api.post(`/sources/${source._id}/deposit`, {
        amount: Number(amount),
      });
      toast.success("Money added successfully");
      onRefresh();
      setShowInput(false);
      setAmount("");
    } catch (err) {
      console.err(err.message);
      toast.error("Failed to add money");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded p-4 shadow space-y-2">
      <div className="font-semibold text-lg">{source.name}</div>
      <div className="text-sm text-gray-400">Balance: ₹{source.balance}</div>
      {showInput ? (
        <div className="space-y-2">
          <input
            type="number"
            className="input w-full"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={handleDeposit}
              className="btn bg-green-600 text-white"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowInput(false)}
              className="btn bg-gray-500 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="btn bg-blue-600 text-white w-full"
        >
          Add Money
        </button>
      )}
    </div>
  );
}
