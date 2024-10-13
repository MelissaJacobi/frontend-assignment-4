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
        if (!dueDateInput) {
            alert("Please enter a due date!");
            return;
        }
        if (new Date(dueDateInput) < new Date()) {
            alert("The due date must be in the future!");
            return;
        }

        const newTask = { task: taskInput.trim(), dueDate: dueDateInput };
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

    return (
        <div className="task-list-container">
            <input
                type="text"
                placeholder="Enter task"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
            />
            <input
                type="date"
                value={dueDateInput}
                onChange={(e) => setDueDateInput(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>

            <div id="taskList">
                {tasks.map((task, index) => (
                    <div key={index} className={`task ${task.completed ? 'completed' : ''}`}>
                        <div onClick={() => toggleCompletion(index)}>
                            {task.task}
                            <span className="due-date"> Due: {task.dueDate}</span>
                        </div>
                        <button onClick={() => deleteTask(index)} className="deleteButton">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskList;
