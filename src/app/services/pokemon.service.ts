import { Injectable } from '@angular/core';
import { PokemonData, PokemonDataResult, PokemonDetailsData } from '../interfaces/pokeApi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  constructor() { }

  async getByPage(page: number, size:number = 40 ):Promise<PokemonDataResult[]>{

    
    if(page > 26) return [];

    const offset = size*(page-1);
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${size}&offset=${offset}`);
    const resJson = await res.json();

    if(resJson.results.length > 0){ 
      return resJson.results; 
    } 
    return [];
  }

  async getById(id:string):Promise<PokemonDetailsData>{
     const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
     const resJson = await res.json();
     return resJson;
  }

 
  getDescription(){

  }
}
