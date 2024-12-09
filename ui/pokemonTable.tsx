"use client"

import { useState } from "react"; //Only because this is in "use client"
import Image from "next/image";
import { PokemonCard } from "./pokemonCard";

interface PokemonTableProps {
    pokemonList: any; //consider changing to Pokemon[] as a list of type Pokemon
}

export function PokemonTable( {pokemonList} : PokemonTableProps) {

    const [ searchText, setSearchText ] = useState("")

    // filter the pokemon list according to the input text 
    const searchFilter = (pokemonList : any) => {
        return pokemonList.filter(
            (pokemon : any) => pokemon.name.includes(searchText.toLowerCase()) //set entire name to lowercase. torchic still shows Torchic
        )
    }

    //save the filtered list 
    const filteredPokemonList = searchFilter(pokemonList);

    return(
        <>
            <div>
                <div className="flex flex-col w-full max-w-sm text-left">
                    <label htmlFor="pokemonName">Search for your Pokemon:</label>
                    <input
                        type="text"
                        value={searchText}
                        id="pokemonName" //connects to label
                        placeholder="Torchic"
                        autoComplete="off"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
            </div>

            {/* <div> */}
                {/* <div className="flex flex-col flex-grow-0"> */}
            <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-3 grid-cols-3 lg:text-left">
                {filteredPokemonList.map((pokemon : any) => { //filtered pokemon list // initial filter of "" which includes ENTIRE list
                    return(
                        <PokemonCard key = {pokemon.name} name={pokemon.name} url={pokemon.url}/>
                    )
                })}
            </div>    
            {/* </div> */}
            
        </>
    )
}