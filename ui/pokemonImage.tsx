"use client"
import Image from "next/image";

export function PokemonImage( { image, pokemonName } : { image: string, pokemonName : string}){
    return (
        <Image
                src={image}
                height={200}
                width={200}
                alt={"Image of " + pokemonName}
            />
    )
}