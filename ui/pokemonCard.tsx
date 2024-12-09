import Link from "next/link";

interface PokemonInfo {
    name: string
    url: string
}

// Created a 'capitalizeName' function to have the first character be Upper-Case 
// Done as this was done in multiple places
function capitalizeName(name : string){
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Created to target the PokemonNames that have a dash
// ex: Iron-Boulder

// List of names whose forms are attached to their name
const namesToFix : string[] = ["deoxys", "wormadam", "giratina", "shaymin", "basculin", "darmanitan", "tornadus", "thundurus", "landorus", "keldeo", "meloetta", "meowstic", "aegislash", "pumpkaboo", "gourgeist", "zygarde", "oricorio", "lycanroc", "wishiwashi", "minior", "mimikyu", "toxitricity", "eiscue", "indeedee", "morpeko", "urshifu", "basculegion", "enamorus"];

function fixPokemonName(name : string) : string {
  // There are pokemon who are forms attached here to their name in the json, so they will be removed here
  // ex: Wishiwashi-Solo -> Wishiwashi
  if (namesToFix.includes(name.split('-')[0])){
    return capitalizeName(name.split('-')[0]);
  }

  return name.split('-').map(capitalizeName).join('-');
}

export function PokemonCard( {name, url } :PokemonInfo) {
    // obtaining the unique id for each Pokemon from the its url. 
    const idParts = url.split('/');
    const pokemonID = idParts[idParts.length -2]; 

    return(
        <Link href={String(pokemonID)}
          // className="group rounded-lg border border-transparent m-3 px-5 py-4 transition-colors dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          className="group rounded-lg border border-transparent m-3 px-5 py-4 transition-colors dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          key={name + "Card"}
        >
          <h2 className={`text-2xl font-semibold`}> {fixPokemonName(name)} </h2>
        </Link>
    )
}