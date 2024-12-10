import requests
import json

# Function to get all Pokémon primary types
def getPrimaryTypes():
    typeDict = {}
    url = "https://pokeapi.co/api/v2/pokemon?limit=1025"  # Get all Pokemon

    while url:
        response = requests.get(url).json()
        
        # BEFORE CALLING AGAIN, implemented logic to remove words after "-". Ex: wishiwashi-solo

        # Fetch the data for each Pokémon
        for pokemon in response['results']:
            pokemonInfo = requests.get(pokemon['url']).json()
            primaryType = pokemonInfo['types'][0]['type']['name']  # Primary type is always the first type
            typeDict[pokemon['name']] = primaryType
        
        # Get the next Pokémon if it exists
        url = response.get('next')

    return typeDict

# Fetch the data
typeData = getPrimaryTypes()

# Save it to a JSON file
with open('pokemonTypes.json', 'w') as file:
    json.dump({"pokemon": typeData}, file, indent=2)

print("Types saved to pokemonTypes.json.")
# Json was edited after to remove the additional forms (ex: megas) at the end. pecharunt should be the end