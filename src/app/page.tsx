import Image from "next/image";
import { PokemonTable } from "../../ui/pokemonTable";

import { getPokemon } from "../../lib/pokeAPI";

export default async function Home() { //async function b/c of await call 

  const unovaPokemon = await getPokemon();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PokemonTable pokemonList={unovaPokemon}/>
    </main>
  );
}
