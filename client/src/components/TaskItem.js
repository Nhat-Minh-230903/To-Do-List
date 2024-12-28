import React from "react";

const TaskItem = ({ task, setTasks, setEditingTask }) => {
  const handleDelete = () => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
  };

  const toggleComplete = () => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <li className={task.completed ? "completed" : ""}>
      <span onClick={toggleComplete}>{task.name}</span>
      <button onClick={() => setEditingTask(task)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TaskItem;
