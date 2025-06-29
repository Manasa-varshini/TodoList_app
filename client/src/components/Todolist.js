import './Todolist.css';
import React from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function Todolist(props) {
  const handleToggleComplete = async (task) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/tasks/${task._id}`,
        {
          _id: task._id,
          todo: task.todo,
          isComplete: !task.isComplete,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      props.taskComplete(res.data);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      props.removeTask(res.data);
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="tasklist">
      <ul>
        {props.todolist.map((task, index) => (
          <li key={index}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {task.isComplete ? (
                <CheckBoxIcon
                  className="checkicon"
                  onClick={() => handleToggleComplete(task)}
                />
              ) : (
                <CheckBoxOutlineBlankIcon
                  className="checkicon"
                  onClick={() => handleToggleComplete(task)}
                />
              )}
              <p className={task.isComplete ? 'taskcomplete' : ''}>
                {task.todo}
              </p>
            </div>
            <div>
              <EditIcon
                className="edit"
                onClick={() => {
                  props.tasktoUpdate(task);
                  props.showPopup();
                }}
              />
              <CloseIcon
                className="close"
                onClick={() => handleDelete(task._id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todolist;
