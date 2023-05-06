import React, { useState, useEffect } from 'react';
import './Todo.css';
import Confetti from 'react-confetti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';



function Task({ task, index, completeTask, removeTask }) {
    const deadlineColor = () => {
        const currentDate = new Date();
        const deadlineDate = new Date(task.deadline);
        const daysDifference = Math.ceil((deadlineDate - currentDate) / (1000 * 60 * 60 * 24));

        if (daysDifference <= 1) {
            return "red";
        } else if (daysDifference === 2) {
            return "yellow";
        } else {
            return "";
        }
    };

    return (
        <div
            className="task"
            style={{
                textDecoration: task.completed ? "line-through" : "",
                color: deadlineColor(),
            }}
        >

            <div className="task-title">{task.title}
                <label>
                    <input
                        type="checkbox"
                        unchecked={task.open}
                        checked={task.completed}
                        onChange={() => completeTask(index)}
                    />
                </label>
                <button style={{ background: "red" }} onClick={() => removeTask(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>

            <div className="task-deadline">{task.deadline}</div>

        </div>
    );
}

function CreateTask({ addTask }) {
    const [title, setTitle] = useState("");
    const [deadline, setDeadline] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        if (title.trim()) {
            const deadlineDate = new Date(deadline);
            const formattedDeadline = deadlineDate.toISOString();

            addTask({ title: title.trim(), completed: false, deadline: formattedDeadline });
            setTitle("");
            setDeadline("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-container">
                <input
                    className="input-text"
                    type="text"
                    value={title}
                    placeholder="Add a new task"
                    onChange={event => setTitle(event.target.value)}
                />
                <input
                    className="input-datetime"
                    type="datetime-local"
                    value={deadline}
                    onChange={event => setDeadline(event.target.value)}
                />
                <button type="submit">Add</button>
            </div>

        </form>
    );
}

function Todo() {
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        setTasksRemaining(tasks.filter((task) => !task.completed).length);


    }, [tasks]);

    const addTask = (task) => {
        const newTasks = [...tasks, task];
        setTasks(newTasks);
    };

    const completeTask = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks);
        setShowConfetti(true);

        const completedTask = newTasks[index];
        const newCompletedTasks = [...completedTasks, completedTask];
        setCompletedTasks(newCompletedTasks);

        // Remove completed task from pending tasks
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const removeTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    return (
        <div className="todo-container">
            <div className="header">Pending tasks ({tasksRemaining})</div>
            <div className="create-task">
                <CreateTask addTask={addTask} />
            </div>
            <div className="tasks">
                {tasks.map((task, index) => (
                    <Task
                        task={task}
                        index={index}
                        completeTask={completeTask}
                        removeTask={removeTask}
                        key={index}
                    />
                ))}
            </div>
            <div className="header">Completed tasks ({completedTasks.length})</div>
            <div className="tasks">
                {completedTasks.map((task, index) => (
                    <Task
                        task={task}
                        index={index}
                        completeTask={completeTask}
                        removeTask={removeTask}
                        key={index}
                    />
                ))}
            </div>
            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={200}
                />
            )}
        </div>
    );
}



export default
    Todo;
