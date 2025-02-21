import React, { useEffect, useState } from 'react';
import axios, { isAxiosError } from 'axios';
import { useAuth } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  description: string;
  is_complete: boolean;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');
  const [editedTaskDescription, setEditedTaskDescription] = useState('');
  const [editedTaskIsComplete, setEditedTaskIsComplete] = useState(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch tasks on component mount or when the token changes
  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 401) {
        // Invalid or expired token, handle logout
        console.log('Token is invalid or expired');
        logout();
        navigate('/login');
      } else {
        console.error('Failed to fetch tasks', error);
      }
    }
  };

  // Create a new task
  const createTask = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/tasks`,
        { title: newTaskTitle, description: newTaskDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTaskTitle('');
      setNewTaskDescription('');
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  // Update an existing task
  const updateTask = async (id: string) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`,
        { title: editedTaskTitle, description: editedTaskDescription, is_complete: editedTaskIsComplete },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingTaskId(null); // Exit edit mode
      setEditedTaskTitle('');
      setEditedTaskDescription('');
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  // Delete a task
  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  // Enter edit mode for a task
  const enterEditMode = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTaskTitle(task.title);
    setEditedTaskDescription(task.description);
    setEditedTaskIsComplete(task.is_complete);
  };

  // Exit edit mode
  const cancelEditMode = () => {
    setEditingTaskId(null);
    setEditedTaskTitle('');
    setEditedTaskDescription('');
  };

  // Toggeling the is_complete
  const toggleIsComplete = (task: Task) =>{
    setEditedTaskIsComplete(!task.is_complete);
    task.is_complete=!task.is_complete
  }

  // Handle logout
  const handleLogout = () => {
    logout(); // Call the logout function
    navigate('/login'); // Redirect to the login page
  };

  // Render the tasks list
  const renderTasks = () => {
    return tasks.map((task) => (
      <div key={task.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
        {editingTaskId === task.id ? (
          <div>
            <input
              type="text"
              value={editedTaskTitle}
              onChange={(e) => setEditedTaskTitle(e.target.value)}
              placeholder="Task Title"
            />
            <input
              type="text"
              value={editedTaskDescription}
              onChange={(e) => setEditedTaskDescription(e.target.value)}
              placeholder="Task Description"
            />
            <button onClick={() => toggleIsComplete(task)}>{task.is_complete?'Completed!':'Pending'}</button>
            <button onClick={() => updateTask(task.id)}>Save</button>
            <button onClick={cancelEditMode}>Cancel</button>
          </div>
        ) : (
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            {task.is_complete?<p>Completed!</p>:<p>Pending</p>}
            <button onClick={() => enterEditMode(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        )}
      </div>
    ));
  };

  // Render the create task form
  const renderCreateTaskForm = () => {
    return (
      <div style={{ marginBottom: '20px' }}>
        <h2>Create New Task</h2>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Task Title"
        />
        <input
          type="text"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Task Description"
        />
        <button onClick={createTask}>Create Task</button>
      </div>
    );
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
        <h1>Tasks</h1>
        <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button> {/* Logout button */}
      </header>
      {renderCreateTaskForm()}
      {tasks.length > 0 ? renderTasks() : <p>No tasks found. Create a new task!</p>}
    </div>
  );
};

export default Tasks;