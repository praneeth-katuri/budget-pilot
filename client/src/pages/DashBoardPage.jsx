import DashboardLayout from "@/components/layout/DashBoardLayout";
import MonthSelector from "@/components/dashboard/MonthSelector";
import BudgetBar from "@/components/dashboard/BudgetBar";
import ChartsSection from "@/components/dashboard/ChartsSection";
import SourceSection from "@/components/dashboard/SourceSection";
import ExpenseTable from "@/components/dashboard/ExpenseTable";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Month Filter + Budget Usage */}
      <MonthSelector />
      <BudgetBar />

      {/* Charts: Pie (by category), Bar (by source) */}
      <ChartsSection />

      {/* Source cards (with Add Money) */}
      <SourceSection />

      {/* Expense table */}
      <ExpenseTable />
    </DashboardLayout>
  );
}
