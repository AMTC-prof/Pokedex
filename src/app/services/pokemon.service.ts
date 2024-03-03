import { Injectable } from '@angular/core';
import { PokemonData, PokemonDataResult } from '../interfaces/pokeApi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  async getByPage(page: number, size:number = 40 ):Promise<PokemonDataResult[]>{

    const offset = size*(page-1);
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${size}&offset=${offset}`);
    const resJson = await res.json();

    if(resJson.results.length > 0) return resJson.results;   
    return [];
  }

  async getById(id:string):Promise<any>{
    //https://pokeapi.co/api/v2/pokemon/
  }

 
  getDescription(){

  }
}
