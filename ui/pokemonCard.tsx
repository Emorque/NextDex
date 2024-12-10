import Link from "next/link";
import Image from "next/image";
// import pokemon from "@/lib/pokemonTypes.json";
import typeColors from "../lib/pokemonTypes.json";


// import { promises as fs } from 'fs'; 

interface PokemonInfo {
    name: string
    url: string
}

// Needed to query pokemonTypes.json
interface PokemonTypes {
  [id: string]: string;
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

const primaryColor : {[id: string]: string} = {
    "normal": "#9fa19f",    
    "fire": "#e62829",      
    "water": "#2980ef",     
    "electric": "#fac000",  
    "grass": "#3fa129",     
    "ice": "#3dcef3",       
    "fighting": "#ff8000",  
    "poison": "#9141cb",    
    "ground": "#915121",    
    "flying": "#81b9ef",    
    "psychic": "#81b9ef",   
    "bug": "#91a119",       
    "rock": "#afa981",      
    "ghost": "#704170",     
    "dragon": "#5060e1",    
    "dark": "#705848",      
    "steel": "#60a1b8",     
    "fairy": "#ef70ef"      
};

function fixPokemonName(name : string) : string {
  // There are pokemon who are forms attached here to their name in the json, so they will be removed here
  // ex: Wishiwashi-Solo -> Wishiwashi
  if (namesToFix.includes(name.split('-')[0])){
    return capitalizeName(name.split('-')[0]);
  }

  return name.split('-').map(capitalizeName).join('-');
}

function getPokemonType(pokemonName: string): string { // it was this before to see what pokemon names needed to be readjusted: function getPokemonType(pokemonName: string): string | undefined { 
  // Ensure the pokemonName exists in the pokemon dictionary, convert to lowercase first
  const type = typeColors.pokemon[pokemonName.toLowerCase() as keyof typeof typeColors.pokemon];
  return type;
}

export function PokemonCard( {name, url } :PokemonInfo) {
// export default async function pokemonCard( {name, url} : PokemonInfo) {
// obtaining the unique id for each Pokemon from the its url. 
    const idParts = url.split('/');
    const pokemonID = idParts[idParts.length -2]; 
  
    const pokemonName : string = fixPokemonName(name);

    const pokemonType = getPokemonType(pokemonName);

    if (pokemonType === undefined) {
      console.log(pokemonName);
    }

    const imagePath = "../public/fire.svg"; 

    // const backgroundColor : string = pokemonType ? primaryColor[pokemonType] : "#000";

    return(
        <Link href={String(pokemonID)}
          style={{backgroundColor: primaryColor[pokemonType]}}
          // className="group rounded-lg border border-transparent m-3 px-5 py-4 transition-colors dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          className={`relative z-10 group rounded-lg border border-transparent m-3 px-5 py-4 transition-colors dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}
          key={name + "Card"}
        >
          <h2 className={`relative z-30 text-2xl font-semibold`}> {pokemonName} </h2>
          
          <Image
            src={`/${pokemonType}_icon.png`}
            alt="Logo for Type"
            className={"absolute top-0 z-20 -right-14 transform transition duration-200 group-hover:-translate-x-14"}
            // style={{right: -5}}
            width={52}
            height={52}
          >
            
          </Image>
        </Link>
    )
}