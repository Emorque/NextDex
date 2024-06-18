import { Metadata } from 'next';  
import  Image  from 'next/image';
import { PokemonImage } from '../../../ui/pokemonImage';
import { getPokemonByName } from '../../../lib/pokeAPI';

export const metadata : Metadata = {
  title: 'Unique Pokemon Page',
};


export default async function PokemonPage( { params } : {params: { pokemonName: string } }) {
    const pokemonName = params.pokemonName;

    const pokemon = await getPokemonByName(pokemonName);

    console.log(pokemon)

    return(
        <>
            <h2>{pokemonName}</h2>
            
            <PokemonImage
                image={pokemon.sprites.other['official-artwork'].front_default}
                pokemonName={pokemonName}
            />
            <h2>Weight : {pokemon.weight}</h2>
            
            <div>
                {pokemon.stats.map( ( statsList : any) => {
                    const statName = statsList.stat.name;
                    const statValue = statsList.base_stat;

                    return (
                        <h2 key={statName}>{statName} : {statValue}</h2>
                    )
                })}
            </div>

            {/* <Image
                src={pokemon.sprites.other['official-artwork'].front_default}
                height={200}
                width={200}
                alt={"Image of " + pokemonName}
            /> */}
        </>
        
    )
}