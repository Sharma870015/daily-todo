import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h2>About TaskMaster</h2>
      <p>
        Welcome to TaskMaster, your ultimate solution for managing tasks and staying organized. Our application is designed to help you keep track of your to-do lists, prioritize your tasks, and achieve your goals with ease. Whether you're managing personal projects or coordinating with a team, TaskMaster provides the tools you need to stay on top of your responsibilities and boost your productivity.
      </p>
      <p>
        With a user-friendly interface and powerful features, TaskMaster is the perfect companion for anyone looking to enhance their productivity and manage their time effectively. Start using TaskMaster today and take control of your tasks!
      </p>
      <h3>Features</h3>
      <ul>
        <li><strong>Task Management:</strong> Create, edit, and delete tasks easily.</li>
        <li><strong>Prioritization:</strong> Set priorities to ensure important tasks are completed first.</li>
        <li><strong>Reminders:</strong> Get notified about upcoming deadlines.</li>
        <li><strong>Team Collaboration:</strong> Share tasks and collaborate with team members.</li>
      </ul>
      <h3>Why Choose TaskMaster?</h3>
      <p>
        TaskMaster stands out from other task management tools with its intuitive design and robust functionality. We are committed to providing a seamless experience that helps you stay focused and organized. Our goal is to help you achieve more with less stress.
      </p>
    </div>
  );
};

export default About;
