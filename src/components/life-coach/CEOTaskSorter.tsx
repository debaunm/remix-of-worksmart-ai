import { useState } from "react";
import { motion } from "framer-motion";

const initialTasks = [
  { id: "1", text: "Setting quarterly personal goals", category: "unsorted" },
  { id: "2", text: "Paying monthly bills", category: "unsorted" },
  { id: "3", text: "Networking with a potential mentor", category: "unsorted" },
  { id: "4", text: "Grocery shopping and meal prep", category: "unsorted" },
  { id: "5", text: "Researching a new skill to learn", category: "unsorted" },
  { id: "6", text: "Scheduling appointments", category: "unsorted" },
  { id: "7", text: "Doing laundry", category: "unsorted" },
  { id: "8", text: "Defining your life's vision", category: "unsorted" },
];

type Task = { id: string; text: string; category: string };

const CEOTaskSorter = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const getTasksByCategory = (category: string) => tasks.filter((t) => t.category === category);

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const handleDrop = (category: string) => {
    if (!draggedTask) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === draggedTask ? { ...t, category } : t))
    );
    setDraggedTask(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const TaskColumn = ({ category, title, bgColor, textColor }: { category: string; title: string; bgColor: string; textColor: string }) => (
    <div className="flex-1">
      <h4 className={`font-bold text-lg text-center mb-3 ${textColor}`}>{title}</h4>
      <div
        className={`${bgColor} p-3 rounded-lg min-h-[250px] space-y-2 transition-all ${
          draggedTask ? "ring-2 ring-primary/30" : ""
        }`}
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(category)}
      >
        {getTasksByCategory(category).map((task) => (
          <motion.div
            key={task.id}
            draggable
            onDragStart={() => handleDragStart(task.id)}
            onDragEnd={handleDragEnd}
            className={`bg-card p-3 rounded shadow-sm cursor-grab active:cursor-grabbing text-sm ${
              draggedTask === task.id ? "opacity-50 scale-105" : ""
            }`}
            whileHover={{ scale: 1.02 }}
            layout
          >
            {task.text}
          </motion.div>
        ))}
      </div>
      <div className="mt-2 text-sm text-center text-muted-foreground">
        {getTasksByCategory(category).length} {category === "unsorted" ? "to sort" : "items"}
      </div>
    </div>
  );

  return (
    <div className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border">
      <h3 className="text-xl md:text-2xl font-bold text-center text-foreground">The CEO of Your Life Framework</h3>
      <p className="text-center mt-2 mb-6 text-muted-foreground text-sm md:text-base">
        Start acting like the CEO by focusing on high-level strategic work and delegating repeatable tasks. Drag and drop the tasks into the correct category.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <TaskColumn category="unsorted" title="Tasks to Sort" bgColor="bg-muted" textColor="text-foreground" />
        <TaskColumn category="ceo" title="CEO Tasks" bgColor="bg-sky-100" textColor="text-sky-700" />
        <TaskColumn category="operating" title="Operating Tasks" bgColor="bg-muted" textColor="text-foreground" />
      </div>
    </div>
  );
};

export default CEOTaskSorter;
