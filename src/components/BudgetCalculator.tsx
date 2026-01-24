import { motion } from "framer-motion";
import { DollarSign, Home, Palette, UtensilsCrossed, Camera, Package, Download } from "lucide-react";
import { Event, formatCurrency } from "@/lib/data";

interface BudgetCalculatorProps {
  budget: Event["budget"];
}

const budgetItems = [
  { key: "venue", label: "Venue Cost", icon: Home, color: "from-blue-500 to-cyan-500" },
  { key: "decoration", label: "Decoration Cost", icon: Palette, color: "from-pink-500 to-rose-500" },
  { key: "catering", label: "Food & Catering", icon: UtensilsCrossed, color: "from-orange-500 to-amber-500" },
  { key: "photography", label: "Photography", icon: Camera, color: "from-purple-500 to-indigo-500" },
  { key: "miscellaneous", label: "Miscellaneous", icon: Package, color: "from-green-500 to-emerald-500" },
];

export const BudgetCalculator = ({ budget }: BudgetCalculatorProps) => {
  const total = Object.values(budget).reduce((sum, val) => sum + val, 0);
  const maxBudget = Math.max(...Object.values(budget));

  const handleDownloadPDF = () => {
    // Create a simple text-based receipt
    const content = `
EVENT HANDLER - BUDGET ESTIMATION
=============================

${budgetItems.map(item => `${item.label}: ${formatCurrency(budget[item.key as keyof typeof budget])}`).join('\n')}

=============================
TOTAL BUDGET: ${formatCurrency(total)}
=============================

Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "event-budget.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6 lg:p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
            <DollarSign className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold">Budget Estimation</h2>
            <p className="text-muted-foreground text-sm">Detailed cost breakdown</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Download</span>
        </motion.button>
      </div>

      <div className="space-y-6">
        {budgetItems.map((item, index) => {
          const value = budget[item.key as keyof typeof budget];
          const percentage = (value / maxBudget) * 100;

          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color}`}>
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                <span className="font-bold text-lg">{formatCurrency(value)}</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Total */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20"
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Total Budget</span>
          <span className="text-3xl font-display font-bold gradient-text">
            {formatCurrency(total)}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
