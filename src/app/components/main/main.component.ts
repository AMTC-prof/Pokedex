import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PokemonImgViewComponent } from "../pokemon-img-view/pokemon-img-view.component";
import { PokemonListComponent } from "../pokemon-list/pokemon-list.component";
import { PokemonListItemComponent } from '../pokemon-list/pokemon-list-item/pokemon-list-item.component';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDataResult } from '../../interfaces/pokeApi';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    imports: [PokemonImgViewComponent, PokemonListComponent, PokemonListItemComponent, MatProgressSpinnerModule]
})
export class MainComponent implements OnInit{

    @ViewChild('pokeList') pokeListElement!: ElementRef;;

    pokemonList: PokemonDataResult[] = [];
    page:number = 20;
    loading:boolean = false;

    constructor(
        private pokemonService: PokemonService,
    ) { 
        
    }

    ngOnInit(): void {
        this.getPokemonList();
    }

    async getPokemonList(){
        this.loading = true;
        this.pokemonList = [...this.pokemonList, ...await this.pokemonService.getByPage(this.page)]
        this.page++;
        this.loading = false;
        
    }

    /**
     * Evento que detecta cuando se ha llegado al final del scroll y hace otra llamda a la api para seguir rellenando la lista de pokemons
     * @param e 
     */
    onScroll(e: any) {

        if(this.loading) return;
        
        const element = e.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            this.getPokemonList();
        }
        
    }
   

}
