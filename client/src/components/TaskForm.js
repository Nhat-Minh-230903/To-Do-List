import React, { useState, useEffect } from "react";

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTaskName(editingTask.name);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, name: taskName } : task
        )
      );
      setEditingTask(null);
    } else {
      setTasks([...tasks, { id: Date.now(), name: taskName, completed: false }]);
    }
    setTaskName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />
      <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
