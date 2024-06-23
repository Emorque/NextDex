import Image from "next/image";
import { PokemonTable } from "../../ui/pokemonTable";

import { getPokemon } from "../../lib/pokeAPI";

export default async function Home() { //async function b/c of await call 

  const allPokemon = await getPokemon();

  return (
    <main>
      <PokemonTable pokemonList={allPokemon}/>
    </main>
  );
}
