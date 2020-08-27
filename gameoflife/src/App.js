import React from 'react';
import Game from './components/Game.js'
import Rules from './components/Rules.js'
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="header-container">
        <h1>
          Conway's Game Of Life
        </h1>
        <Rules/>
        <Game />
      </div>
    </div>
  );
}

export default App;
