const fetchPokemonImageURL = async (pokemonURL: string): Promise<string> => {
  try {
    const response = await fetch(pokemonURL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const pokemonData = await response.json();
    return pokemonData.sprites["front_default"];
  } catch (error) {
    throw new Error(`Error while fetching pokemon image data: ${error}`);
  }
};

const fetchPokemonData = async (
  apiUrl: string,
  numberOfDesiredResults: number
): Promise<any[]> => {
  try {
    let pokemons: { pokemonName: string; pokemonURL: string }[] = [];
    let numberOfLoops = Math.ceil(numberOfDesiredResults / 20) + 1;
    let url = `${apiUrl}?offset=0}`;
    for (let i = 0; i < numberOfLoops; i++) {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      url = data.next;
      const results = data.results;
      results.map(async (pokemon: { name: string; url: string }) => {
        const pokemonName = pokemon.name;
        const pokemonURL = await fetchPokemonImageURL(pokemon.url);
        pokemons.push({ pokemonName, pokemonURL });
      });
    }

    return pokemons.slice(0, numberOfDesiredResults);
  } catch (error) {
    throw new Error(`Error while fetching pokemon data: ${error}`);
  }
};

export default fetchPokemonData;
