import Link from "next/link";

interface PokemonInfo {
    name: string
    url: string
}

export function PokemonCard( {name, url } :PokemonInfo) {

    //console.log(url);
    // obtaining the unique id for each Pokemon from the its url. 
    const idParts = url.split('/');
    const pokemonID = idParts[idParts.length -2]; 

    return(
        <Link
          href={String(pokemonID)}
          className=""
            key={name + "Card"} 
        >
          <h2 className="mb-3 text-2xl font-semibold">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h2>
        </Link>
    )
}