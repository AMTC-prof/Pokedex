import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonDataResult } from '../../interfaces/pokeApi';
import { TitleCasePipe } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list-item',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-list-item.component.html',
  styleUrl: './pokemon-list-item.component.scss'
})
export class PokemonListItemComponent implements OnInit{

  @Input() data?: PokemonDataResult;
  @Output() onSelected = new EventEmitter<string>();

  id: string = ''; //Número del pokemon en la pokedex. No viene directamente como dato del EP sino que hay que extraerlo de la url
  detailsData : any = []; //Datos del pokemon

  constructor(
    private pokemonService: PokemonService,
  ) { }

 ngOnInit(): void {
    this.getPokemonId();
 }

  /**
   * Extrae el id del pokemon de la url
   */
  getPokemonId(){
    if(this.data){
      const url = this.data.url;
      const id = url.split('/')[6];
      this.id = id;
      this.getPokemonDetails();
    }
  }

  getPokemonDetails(){
    this.pokemonService.getById(this.id).then((res)=>{
      this.detailsData = res;
    });
  }

}
