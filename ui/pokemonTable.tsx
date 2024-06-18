"use client"

import { useState } from "react"; //Only because this is in "use client"
import Image from "next/image";
import { PokemonCard } from "./pokemonCard";

interface PokemonTableProps {
    pokemonList: any; //consider changing to Pokemon[] as a list of type Pokemon
}


export function PokemonTable( {pokemonList} : PokemonTableProps) {

    console.log(pokemonList);

    return(
        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
            {pokemonList.map((pokemon : any) => {
                return(
                    <PokemonCard name={pokemon.name}/>
                )
            })}
            {/* <PokemonCard name="Torchic"/>
            <PokemonCard name="Torchic"/>
            <PokemonCard name="Torchic"/>
            <PokemonCard name="Torchic"/> */}
        </div>
    )
}