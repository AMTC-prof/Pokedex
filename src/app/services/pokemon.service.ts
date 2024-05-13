import { Injectable } from '@angular/core';
import { PokemonData, PokemonDataResult, PokemonDataWithId, PokemonDetailsData } from '../interfaces/pokeApi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  currentLang = 'es';

  constructor() {}
  
  /**
   * Retrieves a list of Pokemon data based on the specified page number and size.
   * @param page - The page number to retrieve.
   * @param size - The number of Pokemon data to retrieve per page. Default value is 40.
   * @returns A promise that resolves to an array of PokemonDataResult objects.
   */
  async getByPage(page: number, size:number = 40 ):Promise<PokemonDataWithId[]>{
    
    if(page > 26) return [];

    const offset = size*(page-1);
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${size}&offset=${offset}`);
    const resJson : { results: PokemonDataResult[]} = await res.json();

      if(resJson.results.length > 0){ 

        return resJson.results.map((pokemon, index) => {
          const pokemonData: PokemonDataWithId = {
            pokemon: pokemon,
            id: pokemon.url.split('/')[6]
          
          };
          return pokemonData;
        }); 
      } 

      return [];
     
    }

  /**
   * Retrieves the details of a Pokemon based on the specified ID.
   * @param id - The ID of the Pokemon to retrieve.
   * @returns A promise that resolves to a PokemonDetailsData object.
   */
  async getById(id:string):Promise<PokemonDetailsData>{
     const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
     const resJson = await res.json();
     return resJson;
  }
 
  /**
   * Retrieves the description of a Pokemon based on the specified ID or number.
   * @param id - The ID or number of the Pokemon to retrieve the description for.
   * @returns A promise that resolves to a string containing the description.
   */
  async getDescription(id:string | number): Promise<string>{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    const resJson = await res.json();

    const description =  resJson.flavor_text_entries.find((entry:any) => entry.language.name === this.currentLang);
    return description.flavor_text;
  }
}
