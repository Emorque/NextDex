const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function getPokemon() {
    const response = await fetch(POKEMON_API + "pokemon?limit=156&offset=493");
    const data = await response.json();
    return data.results;
}

export async function getPokemonByName(name: string) {
    const response = await fetch(POKEMON_API + "pokemon/" + name);
    const data = response.json();
    return data;
}

export async function getEvolutionChain(name: string){
    const speciesResponse = await fetch(POKEMON_API + "pokemon-species/" + name);
    const speciesData  = await speciesResponse.json();

    const evoChainResponse = await fetch(speciesData.evolution_chain.url);
    const evoChainData = evoChainResponse.json();

    return evoChainData;
}