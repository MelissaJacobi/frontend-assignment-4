import React, { useState } from 'react';
import './App.css';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'

    const addTask = () => {
        if (!taskInput.trim()) {
            alert("Please enter a task!");
            return;
        }

        const newTask = { task: taskInput.trim(), completed: false };
        setTasks(prevTasks => [...prevTasks, newTask]);
        setTaskInput('');
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

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    return (
        <div className="task-list-container">
            <h1>Daily Planner</h1>
            <h2>Tasks Remaining: {remainingTasks}</h2>
            <input
                type="text"
                placeholder="Enter task"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>

            <div className="filter-buttons">
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('pending')}>Pending</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
            </div>

            <div id="taskList">
                {filteredTasks.map((task, index) => (
                    <div key={index} className={`task ${task.completed ? 'completed' : ''}`}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleCompletion(index)}
                            disabled={task.completed}
                        />
                        <span className="task-text">{task.task}</span>
                        <button onClick={() => deleteTask(index)} className="deleteButton">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskList;
