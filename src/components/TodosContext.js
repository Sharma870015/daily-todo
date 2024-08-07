import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setIsFetched(true);
      }
    };

    fetchTodos();
  }, []);

  return (
    <TodosContext.Provider value={{ todos, setTodos, isFetched }}>
      {children}
    </TodosContext.Provider>
  );
};

export { TodosContext, TodosProvider };
