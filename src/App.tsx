import React from 'react';
import './App.css';
import Pokedex from './pages/pokedex';
import Header from './components/header';

function App() {

  return (
    <div className="App">
      <Header/>
      <Pokedex/>
    </div>
  );
}

export default App;
