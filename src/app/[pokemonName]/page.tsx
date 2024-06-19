import { Metadata } from 'next';  
import  Image  from 'next/image';
import { PokemonImage } from '../../../ui/pokemonImage';
import { getPokemonByName, getEvolutionChain } from '../../../lib/pokeAPI';

export const metadata : Metadata = {
  title: 'Unique Pokemon Page',
};


export default async function PokemonPage( { params } : {params: { pokemonName: string } }) {
    const pokemonName = params.pokemonName;

    const pokemon = await getPokemonByName(pokemonName);
    const pokemonID = pokemon.id;

    const evoChain = await getEvolutionChain(pokemonName);
    console.log(evoChain.id);

    //console.log(pokemon);
    //console.log(pokemonID); // This can be used for calls that only use the pokemon's ID and not name
    
    // console.log(typeof pokemonID); //id is a 'number' type
    
    return(
        <>
            <h2>{pokemonName}</h2>
            
            <PokemonImage
                image={pokemon.sprites.other['official-artwork'].front_default}
                pokemonName={pokemonName}
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

            {/* <Image
                src={pokemon.sprites.other['official-artwork'].front_default}
                height={200}
                width={200}
                alt={"Image of " + pokemonName}
            /> */}
        </>
        
    )
}