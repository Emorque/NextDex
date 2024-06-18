
import { Metadata } from 'next';  

export const metadata : Metadata = {
  title: 'Unique Pokemon Page',
};


export default async function PokemonPage( { params } : {params: { pokemonName: string } }) {
    const pokemonName = params.pokemonName;

    return(
        <h2>{pokemonName}</h2>
    )
}