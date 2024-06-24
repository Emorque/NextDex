const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function getPokemon() {
    //const response = await fetch(POKEMON_API + "pokemon?limit=156&offset=493"); //UNOVA POKEMON
    const response = await fetch(POKEMON_API + "pokemon?limit=1025&offset=0"); // ALL POKEMON
    const data = await response.json();
    return data.results;
}

export async function getPokemonByID(id: String) {
    const response = await fetch(POKEMON_API + "pokemon/" + id);
    const data = response.json();
    return data;
}

export async function getPokemonNext(id: number) {
    const leftPokemon: number = id == 1 ? 1025 : id-1;
    const rightPokemon: number = id == 1025 ? 1 : id+1;
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
    const evoChainData = await evoChainResponse.json();

    return [speciesData, evoChainData];
}