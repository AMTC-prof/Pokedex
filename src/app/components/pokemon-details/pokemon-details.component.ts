import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { PokemonDetailsData } from '../../interfaces/pokeApi';
import { PokemonImgViewComponent } from '../pokemon-img-view/pokemon-img-view.component';
import { PokemonListItemComponent } from '../pokemon-list-item/pokemon-list-item.component';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonTypeBgColor } from '../Enums/PokemonEnums';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
  imports: [PokemonImgViewComponent, PokemonListItemComponent, CommonModule],
})
export class PokemonDetailsComponent implements OnChanges {
  @Input() pokemonData?: PokemonDetailsData;
  @Input() viewDetails: boolean = false;
  @Output() switchViewDetails = new EventEmitter();

  isOpen: boolean = false; 
  pokemonDescription: string = '';
  pokemonTypes: string[] = [];
  pokemonBgColor: string[] = [];
  
  constructor(private pokemonService: PokemonService) {}
  
    ngOnChanges() {
        // Check if pokemonData is available
        if (this.pokemonData) {
            // Get the description for the pokemon
            this.pokemonService.getDescription(this.pokemonData?.id).then((res) => {
                this.pokemonDescription = res;
            });

            // Get the types of the pokemon
            this.pokemonTypes = this.pokemonData.types.map((type) => type.type.name);

            // Check if there are any types
            if (this.pokemonTypes.length > 0) {
                // Get the background colors for each type
                this.pokemonBgColor = this.getPokemonTypeBgColor();
            }
        }   
    }
    // This method returns an array of background colors for each pokemon type
    getPokemonTypeBgColor(): string[] {
        return this.pokemonTypes.map((type) => PokemonTypeBgColor[type as keyof typeof PokemonTypeBgColor] || '#FFFFFF');
    }
}
