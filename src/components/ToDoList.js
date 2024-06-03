import React, { useState, Fragment } from "react";
import "./to_do_list.css";

function ToDoList() {
  const [filter, setFilter] = useState("all");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = () => {
    if (title.trim()) {
      const newTask = {
        id: Date.now(),
        title,
        description,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTitle("");
      setDescription("");
    }
  };
  const startEditing = (task) => {
    setEditTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const stopEditing = () => {
    setEditTaskId(null);
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const saveTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, title: editTitle, description: editDescription }
          : task
      )
    );
    stopEditing();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "not-completed") return !task.completed;
    return true;
  });
  return (
    <div className="to_do_list">
      <header>
        <h1>To-Do List</h1>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task"
            className="title"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="des"
          />
          <button className="addButton" onClick={addTask}>
            Add
          </button>
        </div>
      </header>
      <section>
        <div className="filterButtons">
          <button
            className={filter === "all" ? "selected" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "completed" ? "selected" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={filter === "not-completed" ? "selected" : ""}
            onClick={() => setFilter("not-completed")}
          >
            Not Completed
          </button>
        </div>
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(task.id)}
              />
              {editTaskId === task.id ? (
                <Fragment>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <button onClick={() => saveTask(task.id)}>Save</button>
                </Fragment>
              ) : (
                <Fragment>
                  <span className="titleclass">{task.title}</span>
                  <span className="desclass">{task.description}</span>
                  <button onClick={() => startEditing(task)}>Edit</button>
                </Fragment>
              )}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default ToDoList;
