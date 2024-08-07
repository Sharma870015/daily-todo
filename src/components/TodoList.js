import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import ReminderModal from './ReminderModal';
import ReminderAlert from './ReminderAlert';
import { TodosContext } from './TodosContext';
import { useLocation } from 'react-router-dom';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import './TodoList.css';

const TodoList = () => {
  const { todos, setTodos, isFetched } = useContext(TodosContext);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDescription, setEditingDescription] = useState('');
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [error, setError] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const location = useLocation();
  const username = location.state?.username || localStorage.getItem('username') || '';

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);

    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkReminders();
    }, 1000);

    return () => clearInterval(interval);
  }, [todos]);

  const handleAddTodo = () => {
    if (!newTitle.trim() && !newDescription.trim()) {
      setError('Please enter a title or description.');
      return;
    }

    const currentDate = new Date().toLocaleString();
    const newTodoItem = {
      userId: 1,
      id: todos.length + 1,
      title: newTitle,
      description: newDescription,
      createdAt: currentDate,
      completed: false,
    };
    const updatedTodos = [newTodoItem, ...todos];
    setTodos(updatedTodos);
    setNewTitle('');
    setNewDescription('');
    setSelectedTodo(newTodoItem);
    setIsReminderModalOpen(true);
    setError('');
  };

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
    setError('');
  };

  const handleInputFocus = () => {
    setError('');
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
    setIsDeleteModalOpen(false);
    setTodoToDelete(null);
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setEditingTitle(todo.title);
    setEditingDescription(todo.description);
  };

  const handleUpdateTodo = async () => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${editingTodo.id}`, { ...editingTodo, title: editingTitle, description: editingDescription });
      const updatedTodos = todos.map((todo) => (todo.id === editingTodo.id ? response.data : todo));
      setTodos(sortTodosByDate(updatedTodos));
      setEditingTodo(null);
      setEditingTitle('');
      setEditingDescription('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleSaveReminder = (date, time) => {
    const updatedTodo = { ...selectedTodo, reminderDate: date, reminderTime: time };
    const updatedTodos = todos.map((todo) => (todo.id === selectedTodo.id ? updatedTodo : todo));
    setTodos(updatedTodos);
    setIsReminderModalOpen(false);
  };

  const checkReminders = () => {
    const currentTime = new Date();
    todos.forEach((todo) => {
      if (todo.reminderDate && todo.reminderTime) {
        const reminderDateTime = new Date(`${todo.reminderDate}T${todo.reminderTime}:00`);
        if (currentTime >= reminderDateTime) {
          setAlertTitle(todo.title);
          setAlertDescription(todo.description);
          setIsAlertOpen(true);
          const updatedTodos = todos.map((t) => {
            if (t.id === todo.id) {
              return { ...t, reminderDate: null, reminderTime: null };
            }
            return t;
          });
          setTodos(sortTodosByDate(updatedTodos));
          showNotification(todo.title, todo.description);
        }
      }
    });
  };

  const showNotification = (title, description) => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, {
          body: description,
          icon: '/path/to/icon.png',
          badge: '/path/to/badge.png',
        });
      });
    } else if (Notification.permission === 'granted') {
      new Notification(title, { body: description });
    } else if (Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(title, { body: description });
        }
      });
    }
  };

  const sortTodosByDate = (todos) => {
    return todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const handleDeleteClick = (todo) => {
    setIsDeleteModalOpen(true);
    setTodoToDelete(todo);
  };

  if (!isFetched) {
    return null;
  }

  return (
    <div className="todo-list-container">
      <div className="greeting-content">
        <div className="avatar">{username[0]?.toUpperCase() || ''}</div>
        <div>
          <h2 className="greeting">Welcome, {username || 'User'}!</h2>
          <p className="welcome-message">Have a productive day!</p>
        </div>
      </div>

      <div className="todo-list-box">
        <div className="todo-header">
          <input
            className="todo-input"
            type="text"
            value={newTitle}
            onChange={(e) => handleInputChange(e, setNewTitle)}
            onFocus={handleInputFocus}
            placeholder="Enter task title"
          />
          <input
            className="todo-input"
            type="text"
            value={newDescription}
            onChange={(e) => handleInputChange(e, setNewDescription)}
            onFocus={handleInputFocus}
            placeholder="Enter task description"
          />
          {error && <div className="error-message">{error}</div>}
          <button className="todo-button" onClick={handleAddTodo}>
            Add
          </button>
        </div>
        <ul className="todo-list">
          {sortTodosByDate(todos).map((todo) => (
            <li className="todo-item" key={todo.id}>
              {editingTodo && editingTodo.id === todo.id ? (
                <>
                  <input
                    className="for-updatelist"
                    placeholder="Edit Title"
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onFocus={handleInputFocus}
                  />
                  <input
                    className="for-updatedescr"
                    placeholder="Edit Description"
                    type="text"
                    value={editingDescription}
                    onChange={(e) => setEditingDescription(e.target.value)}
                    onFocus={handleInputFocus}
                  />
                  <button className="Update-btn" onClick={handleUpdateTodo}>Update</button>
                </>
              ) : (
                <>
                  <div className="todo-info">
                    {todo.reminderDate && todo.reminderTime && (
                      <>
                        <span className="todo-day">
                          {new Date(todo.reminderDate).toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className="todo-date">
                          {new Date(todo.reminderDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                        </span>
                      </>
                    )}
                    <div className="todo-text">
                      <span className="todo-title">{todo.title}</span>
                      <span className="todo-description">{todo.description}</span>
                    </div>
                  </div>
                  <div className="date-time">Added on: {todo.createdAt}</div>
                  <div className="todo-actions">
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => handleEditTodo(todo)}
                      className="icon"
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDeleteClick(todo)}
                      className="icon"
                    />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      {isReminderModalOpen && (
        <ReminderModal
          isOpen={isReminderModalOpen}
          onClose={() => setIsReminderModalOpen(false)}
          onSave={handleSaveReminder}
        />
      )}
      {isAlertOpen && (
        <ReminderAlert
          title={alertTitle}
          description={alertDescription}
          onClose={() => setIsAlertOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => handleDeleteTodo(todoToDelete.id)}
        />
      )}
    </div>
  );
};

export default TodoList;
