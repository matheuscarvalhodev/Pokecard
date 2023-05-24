import React, { useState } from "react";
import "../styles/filter.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BsSortNumericDownAlt, BsSortNumericDown } from "react-icons/bs";
import { RxReset } from "react-icons/rx";

type FilterProps = {
  selectedTypes: string[];
  onTypeChange: (type: string, checked: boolean) => void;
  onSearch: (searchTerm: string) => void;
  onReset: () => void;
  onToggleTCG: (showTCG: boolean) => void;
  onSort: (sort: boolean) => void;
  showTCG: boolean;
  isSort: boolean;
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
  onSort,
  isSort
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

  const handleSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    onSort(checked);
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
          <div className="switch-container">
          <button className="button-form">
            <label className="switch sort">
              <input type="checkbox" checked={isSort} onChange={handleSort}/>
              <span className="check-sort">{isSort ?  <BsSortNumericDown size={30}/> : <BsSortNumericDownAlt size={30}/>}</span>
            </label>
            <span className="">Sort Cards</span>
          </button>
        </div>
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
