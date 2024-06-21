"use client"

import { useState } from "react"; //Only because this is in "use client"
import Image from "next/image";
import { PokemonCard } from "./pokemonCard";

interface PokemonTableProps {
    pokemonList: any; //consider changing to Pokemon[] as a list of type Pokemon
}


export function PokemonTable( {pokemonList} : PokemonTableProps) {

    const [ searchText, setSearchText ] = useState("")

    console.log(pokemonList);

    // filter the pokemon list according to the input text 
    const searchFilter = (pokemonList : any) => {
        return pokemonList.filter(
            (pokemon : any) => pokemon.name.includes(searchText.toLowerCase())
        )
    }


    //save the filtered list 
    const filteredPokemonList = searchFilter(pokemonList);

    return(
        <>
            <div>
                <h2>Want a Specfic Pokemon?</h2>
                <div>
                    <label htmlFor="pokemonName">Pokemon Name</label>
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

            <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
                {filteredPokemonList.map((pokemon : any) => { //filtered pokemon list // initial filter of "" which includes ENTIRE list
                    return(
                        <PokemonCard key = {pokemon.name} name={pokemon.name} url={pokemon.url}/>
                    )
                })}
                {/* <PokemonCard name="Torchic"/>
                <PokemonCard name="Torchic"/>
                <PokemonCard name="Torchic"/>
                <PokemonCard name="Torchic"/> */}
            </div>
        </>
    )
}