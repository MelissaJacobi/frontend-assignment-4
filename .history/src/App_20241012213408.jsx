import React, { useState } from 'react';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [dueDateInput, setDueDateInput] = useState('');

    const addTask = () => {
        if (!taskInput.trim()) {
            alert("Please enter a task!");
            return;
        }

        const newTask = { task: taskInput.trim(), dueDate: dueDateInput, completed: false };
        setTasks(prevTasks => [...prevTasks, newTask].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)));
        setTaskInput('');
        setDueDateInput('');
    };

    const deleteTask = (index) => {
        setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
    };

    const toggleCompletion = (index) => {
        setTasks(prevTasks => prevTasks.map((task, i) => 
            i === index ? { ...task, completed: !task.completed } : task
        ));
    };

    const remainingTasks = tasks.filter(task => !task.completed).length;

    return (
        <div className="task-list-container">
            <h2>Tasks Remaining: {remainingTasks}</h2>
            <input
                type="text"
                placeholder="Enter task"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
            />

            <button onClick={addTask}>Add Task</button>

            <div id="taskList">
                {tasks.map((task, index) => (
                    <div key={index} className={`task ${task.completed ? 'completed' : ''}`}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleCompletion(index)}
                        />
                        <span className="task-text">
                            {task.task}
                        </span>
                        <button onClick={() => deleteTask(index)} className="deleteButton">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskList;
