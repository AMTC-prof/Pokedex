import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PokemonImgViewComponent } from '../pokemon-img-view/pokemon-img-view.component';
import { PokemonListItemComponent } from '../pokemon-list-item/pokemon-list-item.component';
import { PokemonService } from '../../services/pokemon.service';
import {
  PokemonDataResult,
  PokemonDataWithId,
  PokemonDetailsData,
} from '../../interfaces/pokeApi';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [
    PokemonImgViewComponent,
    PokemonListItemComponent,
    MatProgressSpinnerModule,
    PokemonDetailsComponent,
    CommonModule,
    
  ],
})
export class MainComponent implements OnInit {
  @ViewChild('pokeList') pokeListElement!: ElementRef;
  
  pokemonList: PokemonDataWithId[] = [];
  selectedPokemon?: PokemonDetailsData;
  selectedPokemonImg: string = '';
  selectedPokemonBg: string =
    '../../../assets/img/Backgrounds/default-pokeball.png';
  selectedPokemonTypes: string[] = [];
  page: number = 0;
  viewDetails: boolean = false;
  loading: boolean = false;

  constructor(private pokemonService: PokemonService) {}

 async ngOnInit(): Promise<void> {
    
   await this.getPokemonList();      
    
    
  }

  ngAfterViewInit(): void {  }

  /**
   * Retrieves a list of Pokemon and appends it to the existing list.
   * Increments the page number and updates the loading status.
   */
  async getPokemonList() {
    this.loading = true;
    this.page++;

    this.pokemonList = [
      ...this.pokemonList,
      ...(await this.pokemonService.getByPage(this.page)),
    ];    
    
    this.loading = false;
   
    this.selectFirstPokemon();
  }

  private async selectFirstPokemon() {
    
    if(this.selectedPokemon === undefined && this.pokemonList.length > 0) {
      await this.onPokemonSelected(this.pokemonList[0].id);
      
    }
  }

  /**
   * Handles the event when a Pokemon is selected.
   * If the selected Pokemon is already the current selected Pokemon, it toggles the view details flag.
   * Otherwise, it retrieves the details of the selected Pokemon, updates the selected Pokemon image,
   * gets the Pokemon types, and sets the background based on the first type of the selected Pokemon.
   * @param id The ID of the selected Pokemon.
   */
  async onPokemonSelected(id: string) {
    
    if (this.selectedPokemon && this.selectedPokemon.id.toString() === id) {
      this.switchViewDetails();
      return;
    }
    this.selectedPokemon = await this.pokemonService.getById(id);
    this.selectedPokemonImg = this.selectedPokemon.sprites.front_default;
    this.getPokemonTypes();
    this.getPokemonBackground(this.selectedPokemon.types[0].type.name);
  }

  /**
   * Retrieves the background image URL based on the given Pokemon type.
   * @param type The type of the Pokemon.
   */
  getPokemonBackground(type: string) {
    this.selectedPokemonBg = `../../../assets/img/type-backgrounds/background-${type}.png`;
  }

  /**
   * Retrieves the types of the selected Pokemon and updates the selectedPokemonTypes array.
   */
  getPokemonTypes() {
    let typesArray: string[] = [];

    this.selectedPokemon?.types.forEach((type: any) => {
      typesArray.push(type.type.name);
    });

    this.selectedPokemonTypes = typesArray;
  }

  /**
   * Event that detects when the scroll reaches the end and makes another API call to continue populating the Pokemon list.
   * @param e The scroll event.
   */
  onScroll(e: any) {
    if (this.loading) {
      return;
    }
    this.playScrollSound();
    const { clientHeight, scrollTop, scrollHeight } =
      this.pokeListElement.nativeElement;
      if (Math.round(clientHeight + scrollTop) >= scrollHeight - 100) {
         this.getPokemonList();
     }
  }

  
  /**
   * Plays a sound effect when scrolling.
   */
  playScrollSound() {

    let scrollAudio = new Audio();
    scrollAudio.src = "../../../assets/Sounds/scroll-sound.wav";  
    scrollAudio.volume = 0.05;
    scrollAudio.load();
    scrollAudio.play();

  }

  playOpeningSong() {
    let openingSong = new Audio();
    openingSong.src = "../../../assets/Sounds/pokemon-opening.mp3"; 
    openingSong.load(); 
    openingSong.play(); 
    openingSong.volume = 0.1; 
    
  }
   
  /**
   * Toggles the view details flag.
   */
  switchViewDetails() {
    if (this.selectedPokemon) this.viewDetails = !this.viewDetails;
  }
}
