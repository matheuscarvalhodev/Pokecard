import React, { useState, useEffect } from "react";
import Card from "../components/card";
import { pokemons } from "../utils/pokemons";
import "../styles/pokedex.css";
import Filter from "../components/filter";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { CgPokemon } from "react-icons/cg";

const PAGE_SIZE = 10;
const DISPLAY_PAGES = 5;

function sortPokemonKeys(pokemonKeys: string[]) {
  return pokemonKeys.sort((a, b) => {
    const numA = parseInt(a);
    const numB = parseInt(b);
    return numA - numB;
  });
}

const Pokedex: React.FC = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredKeys, setFilteredKeys] = useState<string[]>([]);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [showTCG, setShowTCG] = useState<boolean>(false);
  const [totalFilteredPokemons, setTotalFilteredPokemons] = useState<number>(0);


  const sortedKeys = sortPokemonKeys(Object.keys(pokemons));

  useEffect(() => {
    const filterPokemons = () => {
      const filtered = sortedKeys.filter((pokemonNumber) => {
        const pokemon = pokemons[pokemonNumber as keyof typeof pokemons];
        const pokemonName = pokemon.name.toLowerCase();
        const searchQuery = searchTerm.toLowerCase();

        if (selectedTypes.length > 0 && !pokemon.type.some((type) => selectedTypes.includes(type as string))) {
          return false;
        }

        if (!pokemonName.includes(searchQuery)) {
          return false;
        }

        return true;
      });
      setFilteredKeys(filtered);
      setTotalFilteredPokemons(filtered.length); // Atualiza o número total de Pokémon filtrados
    };

    filterPokemons();
  }, [sortedKeys, selectedTypes, searchTerm]);


  useEffect(() => {
    const calculatePageNumbers = () => {
      const totalPages = Math.ceil(filteredKeys.length / PAGE_SIZE);
      const currentPageIndex = currentPage - 1;

      let totalPagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);

      if (totalPages <= DISPLAY_PAGES) {
        setPageNumbers(totalPagesArray);
      } else {
        let startPage = currentPageIndex - Math.floor(DISPLAY_PAGES / 2);

        if (startPage < 0) {
          startPage = 0;
        } else if (startPage + DISPLAY_PAGES >= totalPages) {
          startPage = totalPages - DISPLAY_PAGES;
        }

        setPageNumbers(totalPagesArray.slice(startPage, startPage + DISPLAY_PAGES));
      }
    };

    calculatePageNumbers();
  }, [currentPage, filteredKeys]);



  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes((prevTypes) => [...prevTypes, type]);
    } else {
      setSelectedTypes((prevTypes) => prevTypes.filter((prevType) => prevType !== type));
    }
    setCurrentPage(1);
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSelectedTypes([]);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    const totalPages = Math.ceil(totalFilteredPokemons / PAGE_SIZE); // Usa o número total de Pokémon filtrados
    setCurrentPage(totalPages);
  };


  const handleToggleTCG = (checked: boolean) => {
    setShowTCG(checked);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalFilteredPokemons);
  const pokemonsToDisplay = filteredKeys.slice(startIndex, endIndex);

  return (
    <>
      <div className="container">
        <Filter selectedTypes={selectedTypes} onTypeChange={handleTypeChange} onSearch={handleSearch} onReset={handleReset} onToggleTCG={handleToggleTCG} showTCG={showTCG} />
        <div className="pokedex-field">
          {pokemonsToDisplay.map((pokemonNumber: string) => {
            const pokemon = pokemons[pokemonNumber as keyof typeof pokemons];
            return (
              <Card
                key={pokemonNumber}
                nome={pokemon.name}
                numero={pokemonNumber}
                tipos={pokemon.type}
                status={pokemon.baseStats}
                showTCG={showTCG}
              />
            );
          })}
        </div>
        <div className="pagination">
          <button className="first-last" disabled={currentPage === 1} onClick={goToFirstPage}>
            First Page<CgPokemon size={30} />
          </button>
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((prevPage) => prevPage - 1)}>
            <AiOutlineArrowLeft size={24} />
          </button>
          <span className="page-numbers">
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                className={currentPage === pageNumber ? "active" : ""}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </span>
          <button disabled={endIndex >= filteredKeys.length} onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>
            <AiOutlineArrowRight size={24} />
          </button>
          <button className="first-last" disabled={endIndex >= filteredKeys.length} onClick={goToLastPage}>
            <CgPokemon size={30} /> Last Page
          </button>
        </div>
      </div>
    </>
  );
};

export default Pokedex;
