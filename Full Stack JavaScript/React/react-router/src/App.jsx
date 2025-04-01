import { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Hello from the main page of the app!</h1>
      <p>Here are some examples of links to other pages</p>
      <nav>
        <Link to="profile">Next &rarr;</Link>
      </nav>
    </div>
  );
}

export default App;
