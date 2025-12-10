const BalanceStrategies = () => {
  return (
    <div className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border">
      <h3 className="text-xl md:text-2xl font-bold text-center text-foreground">Pacing & The Balance Myth</h3>
      <p className="text-center mt-2 mb-6 text-muted-foreground text-sm md:text-base">
        "Work-life balance" is a flawed concept. It implies work and life are two separate, competing forces. The reality is that life unfolds in seasons. The goal is harmony, not a perfect 50/50 split.
      </p>

      <div className="text-center mb-8">
        <p className="text-xl md:text-2xl font-bold text-rose-500 line-through">The Myth: Work-Life Balance</p>
        <p className="text-xl md:text-2xl font-bold mt-2 text-emerald-600">The Reality: Work-Life Integration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="p-5 md:p-6 rounded-lg bg-muted">
          <h4 className="font-bold text-lg text-foreground">Strategy 1: Mindful Productivity</h4>
          <p className="mt-2 text-muted-foreground text-sm md:text-base">
            Match your high-energy, high-focus tasks with your natural energy peaks. Save low-energy tasks (like answering emails) for your energy valleys to maximize your effectiveness.
          </p>
        </div>
        <div className="p-5 md:p-6 rounded-lg bg-muted">
          <h4 className="font-bold text-lg text-foreground">Strategy 2: The Balance Blueprint</h4>
          <p className="mt-2 text-muted-foreground text-sm md:text-base">
            Perform a weekly check-in to ensure you are touching on all Six Pillars of your life, even the ones that are currently in "maintenance mode." This prevents neglect and burnout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BalanceStrategies;
