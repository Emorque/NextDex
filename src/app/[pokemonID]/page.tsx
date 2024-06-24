import { Metadata } from 'next';  
import  Image  from 'next/image';

import Link from "next/link";

import { PokemonImage } from '../../../ui/pokemonImage';
import { getPokemonByID, getEvolutionChain, getPokemonNext } from '../../../lib/pokeAPI';

import { Progress } from '@/components/ui/progress';
import { stat } from 'fs/promises';
import { spec } from 'node:test/reporters';

export const metadata : Metadata = {
  title: 'Unique Pokemon Page',
};

export default async function PokemonPage( { params } : {params: { pokemonID : String} }) {
    const id = params.pokemonID;
    // console.log(id);

    const pokemon = await getPokemonByID(id);
    //console.log(typeof(id));
    //console.log(typeof(Number(id)));
    // console.log(pokemon.name);

    const [speciesInfo, evoChain] = await getEvolutionChain(Number(id));
    console.log(evoChain.id);
    
    // const chain = evoChain.chain.evolves_to;

    const [pokemonLeft, pokemonRight] = await getPokemonNext(Number(id));

    // console.log(pokemonLeft);
    const pokemonLeftName = pokemonLeft.species.name;
    const pokemonRightName = pokemonRight.species.name;

    // const firstStage = evoChain.chain.species.name;
    // console.log(firstStage)

    // const secondStage = "resr"
    //             {evoChain.chain.evolves_to.map( ( evoChainList : any ) => {
    //     const evolution = evoChainList.species.name;
    //     // const moveLevel = movesList.version_group_details;
    //     // console.log(moveLevel);
    //     return (
    //         <h2 key={evolution}>{evolution}</h2>
    //     )

    // })}
    
    return(
        <>
            <h2>{pokemon.name}</h2>
            <h2>{evoChain.id}</h2>
            <h2>National Dex Number: {id}</h2>
            <h2>Species Name: {speciesInfo.genera[7].genus}</h2>

            {/*Embedded Link that directs to the prev Pokemon*/}
            <Link
                href={String(pokemonLeft.id)}
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    key={pokemonLeftName} 
                >
                <h2 className="mb-3 text-2xl font-semibold">
                    {pokemonLeftName.charAt(0).toUpperCase() + pokemonLeftName.slice(1)}
                </h2>
            </Link>

            {/*Embedded Link that directs to the next Pokemon*/}
            <Link
                href={String(pokemonRight.id)}
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    key={pokemonRightName} 
                >
                <h2 className="mb-3 text-2xl font-semibold">
                    {pokemonRightName.charAt(0).toUpperCase() + pokemonRightName.slice(1)}
                </h2>
            </Link>

            {/*Image of the current Pokemon*/}
            <PokemonImage
                image={pokemon.sprites.other['official-artwork'].front_default}
                pokemonName={pokemon.name}
            />


            {/*Gathers the Pokemon's type(s)*/}

            <div>
                {pokemon.types.map( (typeList : any) => {
                    const type = typeList.type.name;

                    return(
                        <h2 key={type}>{type}</h2>
                    )
                })}
            </div>

            <h2>Weight : {pokemon.weight}</h2>
            <h2>Height : {pokemon.height / 10} m</h2>
            
            {/*Gathers the Pokemon's stats*/}
            <div>
                {pokemon.stats.map( ( statsList : any) => {
                    const statName = statsList.stat.name;
                    const statValue = statsList.base_stat;
                    console.log(statName);
                    console.log(statValue);

                    return (
                        <div key={statName}>
                            <h2 key={statName + "Bar"}>{statName}</h2>
                            {(() => {
                                switch (statName) { // This switch case checks the current stat and divides it to the highest possible number
                                    case 'hp':
                                        return <Progress value={(statValue / 255) * 100 }/> // Highest base HP is Blissey
                                    case 'attack':
                                        return <Progress value={(statValue / 180) * 100 }/> // Highest base Attack is Deoxys (Attack Forme)
                                    case 'defense':
                                        return <Progress value={(statValue / 200) * 100 }/> // Highest base Defense is Regirock 
                                    case 'special-attack':
                                        return <Progress value={(statValue / 180) * 100 }/> // Highest base Special-Attack is Deoxys (Attack Forme)
                                    case 'special-defense':
                                        return <Progress value={(statValue / 200) * 100 }/> // Highest base Special-Defense is Regice 
                                    case 'speed':
                                        return <Progress value={(statValue / 200) * 100 }/> // Highest base Speed is Regieleki
                                    default:
                                        return null
                                }
                            })()}
                            {/* <Progress value = {statValue} /> */}
                        </div>
                        
                    )
                })}
            </div>

            {/*Gathers the Pokemon's abilities*/}
            <div>
                {pokemon.abilities.map( ( abilitiesList : any ) => {
                    const isHidden = abilitiesList.is_hidden;
                    const abilityName = abilitiesList.ability.name;
                    console.log(isHidden);
                    
                    {/*Logic for when the ability is a 'Hidden ability'*/}
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

            {/*Gathers the Pokemon's ENTIRE move list*/}
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


            {/*Gathers the Pokemon's Evolution Chain*/}

            <div>
                <h2>{evoChain.chain.species.name}</h2>
                {evoChain.chain.evolves_to.map( ( secondStageList : any ) => {
                    const secondStage = secondStageList.species.name;
                    const thirdStage = secondStageList.evolves_to.map((thirdStageList : any) => {
                        return thirdStageList.species.name;
                    })
                    console.log(thirdStage);
                    return (
                        <div key={secondStage}>
                            <h2>{secondStage}</h2>
                            {thirdStage.map((thirdStageMon : any) => {
                                return(
                                <h2 key={thirdStageMon}>{thirdStageMon}</h2>
                                )
                            })}
                            {/* {thirdStage.forEach((element : any) => {
                                return(
                                    <h2>{element}</h2>
                                )
                            })} */}
                            <br></br>
                        </div>
                    )

                })}
            </div>



            {/* <div>
                <h2>{evoChain.chain.species.name}</h2>
                {evoChain.chain.evolves_to.map( ( evoChainList : any ) => {
                    const evolution = evoChainList.species.name;

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