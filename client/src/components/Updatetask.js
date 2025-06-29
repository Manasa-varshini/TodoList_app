import './Updatetask.css';
import React, { useState } from 'react';
import axios from 'axios';

function Updatetask({ task, removePopup, updatetask }) {
  const [updatedText, setUpdatedText] = useState(task.todo);

  const handleUpdate = async () => {
    if (updatedText.trim() === '' || updatedText === task.todo) {
      removePopup();
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:8000/api/tasks/${task._id}`,
        {
          _id: task._id,
          todo: updatedText,
          isComplete: task.isComplete,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      updatetask(res.data);
      removePopup();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <input
          type="text"
          placeholder="Update Task . . ."
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
        />
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
}

export default Updatetask;
