import { Component, EventEmitter, AfterViewInit, Input, OnInit, Output } from '@angular/core';
import {
  PokemonDataResult,
  PokemonDetailsData,
} from '../../interfaces/pokeApi';

import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pokemon-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list-item.component.html',
  styleUrl: './pokemon-list-item.component.scss',
})
export class PokemonListItemComponent implements OnInit {
  @Input() data?: PokemonDataResult;
  @Input() selected?: boolean = false;
  @Input() fullData?: PokemonDetailsData;
  @Output() onSelected = new EventEmitter<string>();

  id: string = ''; //Número del pokemon en la pokedex. No viene directamente como dato del EP sino que hay que extraerlo de la url
  detailsData: any = []; //Datos del pokemon
  clickSound: HTMLAudioElement = new Audio("../../../assets/Sounds/click.mp3");

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemonId();
    
  }

  ngAfterViewInit(){
    this.clickSound.load(); 
    this.clickSound.volume = 0.2;
  }

  ngOnChanges() {
    this.getPokemonId();
  }

  
  getPokemonId() {
    // Check if data is available and the url is not empty
    if (this.data && this.data.url !== '') {
      const url = this.data.url;
      const id = url.split('/')[6]; // Extract the id from the url
      this.id = id; // Assign the id to the class property
      this.getPokemonDetails(); // Call the method to fetch the pokemon details
    } 
    // If fullData is available (called from the details view)
    else if (this.fullData) {
      // Extract the id from the species url
      this.id = this.fullData.species.url.substring(
        42,
        this.fullData.species.url.length - 1
      );
      // Create a dummy data object with the name and an empty url
      this.data = {
        name: this.fullData.species.name,
        url: '',
      };
      this.getPokemonDetails(); // Call the method to fetch the pokemon details
    }
  }

  getPokemonDetails() {
    this.pokemonService.getById(this.id).then((res) => {
      this.detailsData = res;
    });
  }

  loadClickSound() {
    this.clickSound = new Audio();
    this.clickSound.src = "../../../assets/Sounds/click.mp3"; 
    this.clickSound.load(); 
    this.clickSound.volume = 0.2; 
  }

  playClickSound() {
       
    this.clickSound.play(); 
    
  }
}
