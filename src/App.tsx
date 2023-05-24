import React from 'react';
import './App.css';
import Pokedex from './pages/pokedex';
import Header from './components/header';

function App() {

  return (
    <div className="App">
      <Header/>
      <Pokedex/>
      <img className='poke-bg' src="./pokeballs-bg.png" alt="" />
      <img className='potion' src="./potion.png" alt="" />
    </div>
  );
}

export default App;
