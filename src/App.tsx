import React, { useState } from 'react';
import './App.css';
import Pokedex from './pages/pokedex';
import Header from './components/header';

function App() {

  const [toColor, setToColor] = useState<boolean>(false);

  const handlerChangeColor = (changeColor: boolean) => {
    if (changeColor) {
      setToColor(true);
    } else {
      setToColor(false);
    }
  };

  return (
    <div className={`App ${toColor ? "to-red" : "to-blue"}`}>
      <Header/>
      <Pokedex color={handlerChangeColor}/>
      <img className='poke-bg' src="./pokeballs-bg.png" alt="" />
      <img className='potion' src="./potion.png" alt="" />
    </div>
  );
}

export default App;
