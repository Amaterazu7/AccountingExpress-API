import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Dashboard from './dashboard/Dashboard';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3005';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Dashboard> </Dashboard>
      </header>
    </div>
  );
}

export default App;
