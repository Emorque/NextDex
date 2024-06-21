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
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            key={name + "Card"} 
        >
          <h2 className="mb-3 text-2xl font-semibold">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h2>
        </Link>
    )
}