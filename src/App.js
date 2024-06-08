// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import Login from './Login';




function App() {
  return (
    <Router>
      <div className="app">
    <Login></Login>
       
      </div>
    </Router>
  );
}

export default App;


