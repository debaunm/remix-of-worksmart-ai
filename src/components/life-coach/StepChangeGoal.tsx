import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const StepChangeGoal = () => {
  const [goal, setGoal] = useState("");

  return (
    <div className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border">
      <h3 className="text-xl md:text-2xl font-bold text-center text-foreground">Define Your Step-change Growth Goal</h3>
      <p className="text-center mt-2 mb-6 text-muted-foreground text-sm md:text-base">
        Incremental goals make something better; a Step-change goal makes something different. It's a significant leap that establishes a new normal. Write one ambitious goal that would represent a major step-change in your life over the next 6-12 months.
      </p>
      <Textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Example: In 6 months, I will transition to a new job that pays 20% more by developing a new technical skill..."
        className="min-h-[120px] resize-none"
      />
    </div>
  );
};

export default StepChangeGoal;
