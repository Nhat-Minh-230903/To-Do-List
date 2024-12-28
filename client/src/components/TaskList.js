import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, setTasks, setEditingTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          setTasks={setTasks}
          setEditingTask={setEditingTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
