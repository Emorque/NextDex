import { Metadata } from 'next';  
import  Image  from 'next/image';

import Link from "next/link";

import { PokemonImage } from '../../../ui/pokemonImage';
import { getPokemonByID, getEvolutionChain, getPokemonNext } from '../../../lib/pokeAPI';

export const metadata : Metadata = {
  title: 'Unique Pokemon Page',
};

export default async function PokemonPage( { params } : {params: { pokemonID : String} }) {
    const id = params.pokemonID;
    // console.log(id);

    const pokemon = await getPokemonByID(id);
    // console.log(pokemon.name);

    // const evoChain = await getEvolutionChain(pokemonID);
    // console.log(evoChain.id);
    
    // const chain = evoChain.chain.evolves_to;

    const [pokemonLeft, pokemonRight] = await getPokemonNext(Number(id));

    // console.log(pokemonLeft);
    const pokemonLeftName = pokemonLeft.species.name;
    const pokemonRightName = pokemonRight.species.name;

    
    return(
        <>
            <h2>{pokemon.name}</h2>

            <Link
                href={String(pokemonLeft.id)}
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    key={pokemonLeftName} 
                >
                <h2 className="mb-3 text-2xl font-semibold">
                    {pokemonLeftName.charAt(0).toUpperCase() + pokemonLeftName.slice(1)}
                </h2>
            </Link>

            <Link
                href={String(pokemonRight.id)}
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    key={pokemonRightName} 
                >
                <h2 className="mb-3 text-2xl font-semibold">
                    {pokemonRightName.charAt(0).toUpperCase() + pokemonRightName.slice(1)}
                </h2>
            </Link>

            <PokemonImage
                image={pokemon.sprites.other['official-artwork'].front_default}
                pokemonName={pokemon.name}
            />

            <h2>Weight : {pokemon.weight}</h2>
            <h2>Height : {pokemon.height / 10} m</h2>
            
            <div>
                {pokemon.stats.map( ( statsList : any) => {
                    const statName = statsList.stat.name;
                    const statValue = statsList.base_stat;

                    return (
                        <h2 key={statName}>{statName} : {statValue}</h2>
                    )
                })}
            </div>

            <div>
                {pokemon.abilities.map( ( abilitiesList : any ) => {
                    const isHidden = abilitiesList.is_hidden;
                    const abilityName = abilitiesList.ability.name;
                    console.log(isHidden);
                    
                    if (isHidden) {
                        return(
                            <h2 className='red'
                            key={abilityName}> {abilityName}  : is Hidden</h2>
                        )
                    }
                    else {
                        return (
                            <h2 key={abilityName}>{abilityName}</h2>
                        )
                    }
                })}
            </div>

            <div>
                {pokemon.moves.map( ( movesList : any ) => {
                    const moveName = movesList.move.name;
                    // const moveLevel = movesList.version_group_details;
                    // console.log(moveLevel);

                    return (
                        <h2 key={moveName}>{moveName}</h2>
                    )

                })}
            </div>

{/* 
            <div>
                <h2>{evoChain.chain.species.name}</h2>
                {evoChain.chain.evolves_to.map( ( evoChainList : any ) => {
                    const evolution = evoChainList.species.name;
                    // const moveLevel = movesList.version_group_details;
                    // console.log(moveLevel);

                    return (
                        <h2 key={evolution}>{evolution}</h2>
                    )

                })}
            </div> */}

            {/* <Image
                src={pokemon.sprites.other['official-artwork'].front_default}
                height={200}
                width={200}
                alt={"Image of " + pokemonName}
            /> */}
        </>
        
    )
}