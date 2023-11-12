import { useEffect, useState } from "react";
import fetchPokemonData from "../services/fetchPokemonData";

export const usePokemonController = () => {
  const [data, setData]: [
    any | null,
    React.Dispatch<React.SetStateAction<any | null>>,
  ] = useState(null);

  const FETCH_POKEMON_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetchPokemonData(FETCH_POKEMON_ENDPOINT, 151);
        setData(result);
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    }

    fetchData();
  }, []);

  return data;
};

export default usePokemonController;
