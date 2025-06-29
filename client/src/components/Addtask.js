import './Addtask.css';
import React, { useState } from 'react';
import axios from 'axios';

function Addtask(props) {
  const [task, setTask] = useState('');

  const addTask = async () => {
    if (task.trim() === '') {
      alert('Please enter a task.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found. Please login again.');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:8000/api/tasks',
        {
          todo: task,
          isComplete: false
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTask('');
      props.addTask(res.data);
    } catch (err) {
      console.error('Add Task Error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to add task. Please ensure you are logged in.');
    }
  };

  return (
    <div className="addtask">
      <input
        type="text"
        placeholder="Add Task . . ."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

export default Addtask;
