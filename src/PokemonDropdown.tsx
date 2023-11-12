import Select from "react-select";
import { useState } from "react";
import "./index.css";
import usePokemonController from "./hooks/usePokemon";

interface Pokemon {
  pokemonName: string;
  pokemonURL: string;
}

interface PokemonOption {
  value: string;
  label: string;
}

const PokemonDropdown = () => {
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    undefined
  );

  const pokemons = usePokemonController();

  if (!pokemons) {
    return <> </>;
  }
  const transformPokemon = (pokemonList: Pokemon[]): PokemonOption[] => {
    return pokemonList.map((pokemon) => {
      const { pokemonName } = pokemon;
      return { value: pokemonName, label: pokemonName };
    });
  };

  const findPokemonImage = (pokemonList: Pokemon[]): string | undefined => {
    const pokemon = pokemonList.find(
      (pokemon) => pokemon.pokemonName === selectedItem
    );
    return pokemon?.pokemonURL;
  };

  const pokemonOptions = transformPokemon(pokemons);

  const handleSelectChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setSelectedItem(selectedOption?.value);
  };

  return !selectedItem ? (
    <div className="pokemon-select">
      {
        <Select
          options={pokemonOptions}
          value={pokemonOptions.find((option) => option.value === selectedItem)}
          placeholder="Choose a pokemon"
          onChange={handleSelectChange}
        />
      }
    </div>
  ) : (
    <>
      {selectedItem}
      <img src={findPokemonImage(pokemons)} />
    </>
  );
};

export default PokemonDropdown;
