const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function getPokemon() {
    const response = await fetch(POKEMON_API + "pokemon?limit=156&offset=493");
    const data = await response.json();
    return data.results;
}