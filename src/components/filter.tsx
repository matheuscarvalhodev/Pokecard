import React, { useState } from "react";
import "../styles/filter.css";
import { AiOutlineSearch } from "react-icons/ai";
import { RxReset } from "react-icons/rx";

type FilterProps = {
  selectedTypes: string[];
  onTypeChange: (type: string, checked: boolean) => void;
  onSearch: (searchTerm: string) => void;
  onReset: () => void;
  onToggleTCG: (showTCG: boolean) => void; // Adicionando a prop para lidar com a mudança do valor do TCG
  showTCG: boolean; // Valor atual do TCG
};

const pokemonTypes: string[] = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Steel",
  "Fairy",
];

const Filter: React.FC<FilterProps> = ({
  selectedTypes,
  onTypeChange,
  onSearch,
  onReset,
  onToggleTCG,
  showTCG,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    onTypeChange(value, checked);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleReset = () => {
    setSearchTerm("");
    onReset();
  };

  const handleToggleTCG = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    onToggleTCG(checked);
  };

  return (
    <div className="filtro-container">
      <div className="filtro">
        {pokemonTypes.map((type) => (
          <label className="checkbox" key={type}>
            <input
              type="checkbox"
              value={type}
              checked={selectedTypes.includes(type)}
              onChange={handleTypeChange}
            />
            <span className="checkmark"></span>
            {type}
          </label>
        ))}
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="buttons">
          <button className="button-form" onClick={handleSearch}>
            <AiOutlineSearch size={35} />
            Search
          </button>
          <button className="button-form" onClick={handleReset}>
            <RxReset size={35} />
            Reset
          </button>
        </div>
        <div className="switch-container">
          <label className="switch">
            <input type="checkbox" checked={showTCG} onChange={handleToggleTCG}/>
            <span className={`slider round ${showTCG ? "checked" : ""}`}></span>
          </label>
          <span className="switch-label">Rotate Cards</span>
        </div>
      </div>
    </div>
  );
};

export default Filter;
