import { Metadata } from 'next';  
import  Image  from 'next/image';

import Link from "next/link";

import { PokemonImage } from '../../../ui/pokemonImage';
import { getPokemonByID, getEvolutionChain, getPokemonNext } from '../../../lib/pokeAPI';

import { Progress } from '@/components/ui/progress';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

// import { stat } from 'fs/promises';
// import { spec } from 'node:test/reporters';

export const metadata : Metadata = {
  title: 'Unique Pokemon Page',
};


// Created a 'capitalizeName' function to have the first character be Upper-Case 
// Done as this was done in multiple places
function capitalizeName(name : string){
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// Created to target the moveList to convert names like "Take-Down" into "Take Down"
function fixMoveName(name : string){
    return name.split('-').map(capitalizeName).join(' ');
}

// Created to target the PokemonNames that have a dash
// ex: Iron-Boulder
// It is because there are names and moves that start with 'Iron' that require different outputs 
function fixPokemonName(name : string) : string {
    return name.split('-').map(capitalizeName).join('-');
}

function getProgressColor(value: number) : string {
    if (value > 70) return "bg-green-500"
    else if (value > 20) return "bg-yellow-500"
    else return "bg-red-500"
}

function removeArrow(str : string) : string{
    return str.replace('\f',       '\n') 
    .replace('\u00ad\n', '') 
    .replace('\u00ad',   '') 
    .replace(' -\n',     ' - ') 
    .replace('-\n',      '-') 
    .replace('\n',       ' ')
}

// Dictionary to get the full Language from its code
const language : {[id:string] : string} = {
    "ja-Hrkt" : "Japanese - Hiragana + Katakana",
    "roomaji" : "Japanese - Romaji",
    "ko": "Korean",
    "zh-Hant" : "Chinese - Traditional",
    "fr": "French",
    "de": "German",
    "es": "Spanish",
    "it": "Italian",
    "en": "English",
    "ja": "Japanese",
    "zh-Hans": "Chinese - Simplified"
}

export default async function PokemonPage( { params } : {params: { pokemonID : String} }) {
    const id = params.pokemonID;
    console.log(typeof(id));

    const pokemon = await getPokemonByID(id);

    const [speciesInfo, evoChain] = await getEvolutionChain(Number(id));
    console.log(evoChain.id);
    
    // const chain = evoChain.chain.evolves_to;

    const [pokemonLeft, pokemonRight] = await getPokemonNext(Number(id));

    // console.log(pokemonLeft);
    const pokemonLeftName = pokemonLeft.species.name;
    const pokemonRightName = pokemonRight.species.name;

    const pokemonName= capitalizeName(pokemon.name);




    return(
        <div className='bg-black flex flex-col justify-center items-center text-white w-full'>
            {/* <h2>Species Name: {speciesInfo.genera[7].genus}</h2> */} 
            <div className='flex justify-between w-full'>
                {/*Embedded Link that directs to the prev Pokemon*/}
                <Link
                    href={String(pokemonLeft.id)}
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-white hover:text-black"
                        key={pokemonLeftName} 
                    >
                    <h5>
                        Prev:
                    </h5>
                    <h2 className="mb-3 text-2xl font-semibold">
                        {/* {pokemonLeftName.charAt(0).toUpperCase() + pokemonLeftName.slice(1)} */}
                        {fixPokemonName(pokemonLeftName)}
                    </h2>
                </Link>

                {/*Embedded Link that directs to the next Pokemon*/}
                <Link
                    href={String(pokemonRight.id)}
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:bg-white hover:text-black"
                        key={pokemonRightName} 
                    >
                    <h5>
                        Next:
                    </h5>
                    <h2 className="mb-3 text-2xl font-semibold">
                        {/* {pokemonRightName.charAt(0).toUpperCase() + pokemonRightName.slice(1)} */}
                        {fixPokemonName(pokemonRightName)}
                    </h2>
                </Link>
            </div>
            
    
            {/*Gathers the Pokemon's English Species Name*/}

            <div className='flex w-full md:w-full items-center flex-col md:flex-row md:justify-around lg:w-1/2 lg:md:justify-between gap-10'>
                {/* Basic Information */}
                <div>
                    <h2>{pokemonName}</h2>
                    {/* <h2>{evoChain.id}</h2> */}
                    <h2>National Dex No. {id}</h2>
                    {speciesInfo.genera.map( (speciesList : any) => {
                        const specLanguage: string = speciesList.language.name;
                        if (specLanguage == "en"){
                            return(
                                <h2 key={specLanguage}>{speciesList.genus}</h2>
                            )
                        }
                    })}
                </div>
                
                {/* Image and Type */}
                <div className='flex flex-col items-center'>
                    {/*Image of the current Pokemon*/}
                    <PokemonImage
                        image={pokemon.sprites.other['official-artwork'].front_default}
                        pokemonName={pokemon.name}
                    />

                    {/*Gathers the Pokemon's type(s)*/}
                    {pokemon.types.map( (typeList : any) => {
                    const type = typeList.type.name;

                    return(
                        <h2 key={type}>{capitalizeName(type)}</h2>
                    )
                    })}
                </div>
            </div>


            <br/>

            <div className='flex w-full md:w-full items-center flex-col md:flex-row md:justify-around lg:w-1/2 lg:md:justify-between gap-10'>
                {/* Measurements and Abilities */}
                <div>
                    {/* Measurements */}
                    <h2>Weight : {pokemon.weight / 10} kg</h2>
                    <h2>Height : {pokemon.height / 10} m</h2>

                    <br/>

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
                                    key={abilityName}> {capitalizeName(abilityName)} <span className='italic'>Hidden</span></h2>
                                )
                            }
                            else {
                                return (
                                    <h2 key={abilityName}>{capitalizeName(abilityName)}</h2>
                                )
                            }
                        })}
                    </div>
                </div>
                    

                <div className='md:mr-2 lg:mr-4'>
                {/*Gathers the Pokemon's stats*/}
                    {pokemon.stats.map( ( statsList : any) => {
                        const statName = statsList.stat.name;
                        const statValue = statsList.base_stat;

                        return (
                            <div key={statName}>
                                <h2 key={statName + "Bar"}>{fixPokemonName(statName)} : {statValue}</h2>
                                {(() => {
                                    switch (statName) { // This switch case checks the current stat and divides it to the highest possible number
                                        case 'hp':
                                            var statPercent = (statValue/255) * 100; // Highest base HP is Blissey
                                            // return <Progress progressColor='bg-blue-500' value={(statValue / 255) * 100 }/> 
                                            return <Progress progressColor={getProgressColor(statPercent)} value={statPercent}/>
                                        case 'attack':
                                            var statPercent = (statValue/180) * 100; // Highest base Attack is Deoxys (Attack Forme)
                                            return <Progress progressColor={getProgressColor(statPercent)} value={statPercent}/> 
                                        case 'defense':
                                            var statPercent = (statValue/180) * 100; // Highest base Defense is Regirock 
                                            return <Progress progressColor={getProgressColor(statPercent)} value={statPercent}/> 
                                        case 'special-attack':
                                            var statPercent = (statValue/180) * 100; // Highest base Special-Attack is Deoxys (Attack Forme)
                                            return <Progress progressColor={getProgressColor(statPercent)} value={statPercent}/> 
                                        case 'special-defense':
                                            var statPercent = (statValue/200) * 100; // Highest base Special-Defense is Regice 
                                            return <Progress progressColor={getProgressColor(statPercent)} value={statPercent}/> 
                                        case 'speed':
                                            var statPercent = (statValue/200) * 100; // Highest base Speed is Regieleki
                                            return <Progress progressColor={getProgressColor(statPercent)} value={statPercent}/> 
                                        default:
                                            return null
                                    }
                                })()}
                                <div className='h-2'></div>
                            </div>
                        )
                    })}
                </div>

            </div>
            
            <br/>

            

            <br/>

            <div className='w-full flex justify-between gap-10'>
                {/*Gathers the Pokemon's ENTIRE move list*/}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Move</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pokemon.moves.map( ( movesList : any ) => (
                            <TableRow key={movesList.move.name}>
                                <TableCell>{fixMoveName(movesList.move.name)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className='w-full'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Region</TableHead>
                                <TableHead>Pokedex Number</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {speciesInfo.pokedex_numbers.map( ( regionalNoList : any ) => (
                                <TableRow key={fixPokemonName(regionalNoList.pokedex.name)}>
                                    <TableCell>
                                        {fixPokemonName(regionalNoList.pokedex.name)}
                                    </TableCell>
                                    <TableCell>
                                        {regionalNoList.entry_number}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Language</TableHead>
                                <TableHead>Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {speciesInfo.names.map( ( nameList : any ) => (
                                <TableRow key={language[nameList.language.name]}>
                                    <TableCell>
                                        {language[nameList.language.name]}
                                    </TableCell>
                                    <TableCell>
                                        {nameList.name}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Game</TableHead>
                                <TableHead>Pokedex Entry</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {speciesInfo.flavor_text_entries.map( ( pokedexEntriesList : any ) => (
                                pokedexEntriesList.language.name == "en" && (
                                    <TableRow key={fixPokemonName(pokedexEntriesList.version.name)}>
                                        <TableCell>
                                            {fixPokemonName(pokedexEntriesList.version.name)}
                                        </TableCell>
                                        <TableCell>
                                            {removeArrow(pokedexEntriesList.flavor_text)}
                                        </TableCell>
                                    </TableRow> 
                                )
                            ))}
                        </TableBody>
                    </Table>
                </div>
                
            </div>

            {/*Gathers the Pokemon's ENTIRE move list*/}
            {/* <div className=''>
                {pokemon.moves.map( ( movesList : any ) => {
                    const moveName = movesList.move.name;
                    // const moveLevel = movesList.version_group_details;
                    // console.log(moveLevel);
                    //fixDashName(moveName);

                    return (
                        <h2 key={moveName}>{fixMoveName(moveName)}</h2>
                    )

                })}
            </div> */}

            

            <br/>


            {/*Gathers the Pokemon's Evolution Chain*/}
{/* 
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
                            <h2>Evolves: to</h2>
                            <h2>{secondStage}</h2>
                            <h2>Evolves to:</h2>
                            {thirdStage.map((thirdStageMon : any) => {
                                return(
                                <h2 key={thirdStageMon}>{thirdStageMon}</h2>
                                )
                            })}
                            <br></br>
                        </div>
                    )

                })}
            </div> */}

            {/*Gathers the Pokemon's Multiple Pokedex Entries*/}

            {/* <div>
                <h2>Regional Pokedex Numbers:</h2>
                {speciesInfo.pokedex_numbers.map( ( regionalNoList : any ) => {
                    const entryNumber = regionalNoList.entry_number;
                    const region = regionalNoList.pokedex.name; //If I want to make the names formatted better, try a switch case or create a map before the initial return 
                    // const moveLevel = movesList.version_group_details;
                    // console.log(moveLevel);
                    return (
                        <h2 key={region}>{capitalizeName(region)} : {entryNumber}</h2>
                    )

                })}
            </div> */}

            

            <br/>

            {/*Gathers the Pokemon's Name in All Languages*/}

            {/* <div>
                <h2>Name in Other Languages:</h2>
                {speciesInfo.names.map( ( nameList : any ) => {
                    const language = nameList.language.name;
                    const nameInLang = nameList.name; //If I want to make the names formatted better, try a switch case or create a map before the initial return 
                    // const moveLevel = movesList.version_group_details;
                    // console.log(moveLevel);
                    return (
                        <h2 key={language}>{language} : {nameInLang}</h2>
                    )

                })}
            </div> */}




            <br/>

            {/*Gathers every Pokedex entry for this Pokemon's*/}

            {/* <div>
                <h2>All Pokedex Entries:</h2>
                {speciesInfo.flavor_text_entries.map( ( pokedexEntriesList : any ) => {
                    const entry: string = pokedexEntriesList.flavor_text;
                    // entry orignially had a strange character that was taken from when scrapped from the orignial games
                    // the solution below removes that strange character and was found here: https://github.com/veekun/pokedex/issues/218
                    const langauge = pokedexEntriesList.language.name;
                    const game = pokedexEntriesList.version.name; //If I want to make the names formatted better, try a switch case or create a map before the initial return 
                    if (langauge == "en"){
                        return (
                            <h2 key={game}>{capitalizeName(game)} : {entryFixed}</h2>
                        )
                    }


                })}
            </div> */}
        </div>
        
    )
}