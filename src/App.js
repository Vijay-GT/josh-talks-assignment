import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([ ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Low',
    status: 'In Progress',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => {
    if (isEditing) {
      setTasks(tasks.map(task => (task.id === currentTaskId ? newTask : task)));
      setIsEditing(false);
    } else {
      setTasks([{ ...newTask, id: tasks.length + 1 }, ...tasks]);
    }
    setNewTask({ title: '', description: '', priority: 'Low', status: 'In Progress' });
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setNewTask(task);
    setCurrentTaskId(task.id);
  };

  const handleCompleteTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: task.status === 'Completed' ? 'In Progress' : 'Completed' } : task
      )
    );
  };

  const handleSortTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const priorities = { High: 1, Medium: 2, Low: 3 };
      return priorities[a.priority] - priorities[b.priority];
    });
    setTasks(sortedTasks);
  };

  return (
    <div className="app">
      <h1>Task Management</h1>

      <div className="task-form">
        <h2>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={newTask.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={newTask.description}
          onChange={handleInputChange}
          required
        />
        <select name="priority" value={newTask.priority} onChange={handleInputChange}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={handleAddTask}>{isEditing ? 'Update Task' : 'Add Task'}</button>
        <button onClick={handleSortTasks}>Sort by Priority</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className={`task-card ${task.priority.toLowerCase()}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-meta">
              <div className="task-meta-item">
                <span>{task.time}</span>
              </div>
              <div className="task-meta-item">
                <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
              </div>
              <div className="task-meta-item">
                <span className={`status ${task.status === 'Completed' ? 'completed' : 'in-progress'}`}>
                  {task.status}
                </span>
              </div>
            </div>
            <div className="task-actions">
              <button onClick={() => handleCompleteTask(task.id)}>
                {task.status === 'Completed' ? 'Mark as In Progress' : 'Mark as Completed'}
              </button>
              <button onClick={() => handleEditTask(task)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;





