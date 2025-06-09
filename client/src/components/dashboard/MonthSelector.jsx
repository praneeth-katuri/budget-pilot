import MonthSelectors from "../ui/MonthSelector";
import { BudgetButton } from "./BudgetButton";

export default function MonthSelector() {
  return (
    <div className="mb-4 flex justify-between">
      <MonthSelectors />
      <BudgetButton />
    </div>
  );
}
