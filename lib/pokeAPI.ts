const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function getPokemon() {
    const response = await fetch(POKEMON_API + "pokemon?limit=156&offset=493");
    const data = await response.json();
    return data.results;
}

export async function getPokemonByID(id: String) {
    const response = await fetch(POKEMON_API + "pokemon/" + id);
    const data = response.json();
    return data;
}

export async function getPokemonNext(id: number) {
    const leftPokemon: number = id == 1 ? 10277 : id-1;
    const rightPokemon: number = id == 10277 ? 1 : id+1;
    //const leftPokemon = id - 1;
    //const rightPokemon = id + 1;
    const leftResponse = await fetch(POKEMON_API + "pokemon/" + leftPokemon);
    const rightResponse = await fetch(POKEMON_API + "pokemon/" + rightPokemon);
    const leftPokemonData = await leftResponse.json();
    const rightPokemonData = await rightResponse.json();

    return [leftPokemonData, rightPokemonData];
}

export async function getEvolutionChain(name: string){
    const speciesResponse = await fetch(POKEMON_API + "pokemon-species/" + name);
    const speciesData  = await speciesResponse.json();

    const evoChainResponse = await fetch(speciesData.evolution_chain.url);
    const evoChainData = evoChainResponse.json();

    return evoChainData;
}