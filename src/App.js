import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import About from './components/About';
import TodoList from "./components/TodoList";
import "./App.css"; // Import the main layout CSS
import { TodosProvider } from "./components/TodosContext";

const App = () => {
  useEffect(() => {
    // Register the service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then((registration) => {
            console.log('ServiceWorker registered with scope:', registration.scope);
          })
          .catch((error) => {
            console.error('ServiceWorker registration failed:', error);
          });
      });
    }
  }, []);

  return (
    <TodosProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/todos" element={<TodoList />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TodosProvider>
  );
};

export default App;
