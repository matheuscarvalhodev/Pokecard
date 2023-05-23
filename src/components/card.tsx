import React, { useState, useEffect } from "react";
import "../styles/card.css";
import { colors } from "../utils/colors";
import { CgPokemon } from "react-icons/cg";
import { SiPokemon } from "react-icons/si";
import ProgressBar from "./progressBar";

interface Status {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

interface Pokemon {
  nome: string;
  numero: string;
  tipos: string[];
  status: Status;
  showTCG: boolean;
}

const Card: React.FC<Pokemon> = ({ nome, numero, tipos, status, showTCG }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(showTCG);
  }, [showTCG]);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={handleClick}>
      <div className="back">
        <SiPokemon size={70} className="name-pokemon" />
        <CgPokemon size={40} className="icon-pokemon" />
        <div className="div-poke">
          <img className="img-poke" src={`../kanto/${numero}.png`} alt="pokemon" />
        </div>
        <div className="info">
          <div className="info-poke">
            <p>Nº {numero}</p>
            <p>{nome}</p>
            <div className="types">
              {tipos.map((tipo) => (
                <p
                  key={tipo}
                  style={{ backgroundColor: colors[tipo as keyof typeof colors], fontSize: 12 }}
                  className="type"
                >
                  {tipo}
                </p>
              ))}
            </div>
          </div>
          <div className="info-status">
            <p>Base Status:</p>
            <ProgressBar label="hp" value={status.hp} max={100} tipo={tipos[0]} />
            <ProgressBar label="atk" value={status.attack} max={100} tipo={tipos[0]} />
            <ProgressBar label="def" value={status.defense} max={100} tipo={tipos[0]} />
            <ProgressBar label="sp atk" value={status.specialAttack} max={100} tipo={tipos[0]} />
            <ProgressBar label="sp def" value={status.specialDefense} max={100} tipo={tipos[0]} />
            <ProgressBar label="sdp" value={status.speed} max={100} tipo={tipos[0]} />
          </div>
        </div>
      </div>
      <div className="front">
        <img src={`../tcg_pack/${numero}.png`} alt="" />
      </div>
    </div>
  );
};

export default Card;
