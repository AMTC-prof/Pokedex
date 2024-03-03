import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PokemonListItemComponent } from "./pokemon-list-item/pokemon-list-item.component";
import { PokemonDataResult } from '../../interfaces/pokeApi';

@Component({
    selector: 'app-pokemon-list',
    standalone: true,
    templateUrl: './pokemon-list.component.html',
    styleUrl: './pokemon-list.component.scss',
    imports: [PokemonListItemComponent]
})
export class PokemonListComponent implements OnInit{
    @Input() pokemonList: PokemonDataResult[] = [];
    
    ngOnInit(): void {
        
    }

    ngOnChanges(){
        console.log('PokeList', this.pokemonList);
    }
    
   
}
