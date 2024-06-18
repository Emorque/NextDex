import Image from "next/image";
import { PokemonTable } from "../../ui/pokemonTable";

import { getPokemon } from "../../lib/pokeAPI";

export default async function Home() {

  const unovaPokemon = await getPokemon();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h2 className="text-2xl font-semibold">
          NextDex
        </h2>
        
      </div>

      <PokemonTable pokemonList={unovaPokemon}/>

      
    </main>
  );
}
