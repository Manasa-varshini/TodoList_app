import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Addtask from './components/Addtask';
import Todolist from './components/Todolist';
import Updatetask from './components/Updatetask';
import Login from './components/Login';
import Register from './components/Register';

function TodoApp() {
  const [todolist, setTodolist] = useState([]);
  const [tasktoUpdate, setTasktoUpdate] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    axios
      .get('http://localhost:8000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTodolist(res.data))
      .catch((err) => console.log(err));
  }, [navigate]);

  const addTask = (newTask) => setTodolist([...todolist, newTask]);

  const taskComplete = (task) => {
    setTodolist((prev) =>
      prev.map((item) =>
        item._id === task._id ? { ...item, isComplete: task.isComplete } : item
      )
    );
  };

  const removeTask = (task) => {
    setTodolist((prev) => prev.filter((item) => item._id !== task._id));
  };

  const updatetask = (task) => {
    setTodolist((prev) =>
      prev.map((item) =>
        item._id === task._id ? { ...item, todo: task.todo } : item
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="app-wrapper">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <Addtask addTask={addTask} />
      <Todolist
        todolist={todolist}
        taskComplete={taskComplete}
        removeTask={removeTask}
        tasktoUpdate={(task) => setTasktoUpdate(task)}
        showPopup={() => setShowPopup(!showPopup)}
      />
      {showPopup && (
        <Updatetask
          task={tasktoUpdate}
          updatetask={updatetask}
          removePopup={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/todo" />
          ) : (
            <Login onLogin={() => setIsLoggedIn(true)} />
          )
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/todo"
        element={
          localStorage.getItem('token') ? <TodoApp /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
}

export default App;
