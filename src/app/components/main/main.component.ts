import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PokemonImgViewComponent } from "../pokemon-img-view/pokemon-img-view.component";
import { PokemonListItemComponent } from "../pokemon-list-item/pokemon-list-item.component";
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDataResult, PokemonDetailsData } from '../../interfaces/pokeApi';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PokemonDetailsComponent } from "../pokemon-details/pokemon-details.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    imports: [PokemonImgViewComponent, PokemonListItemComponent, MatProgressSpinnerModule, PokemonDetailsComponent, CommonModule]
})
export class MainComponent implements OnInit{

    @ViewChild('pokeList') pokeListElement!: ElementRef;;

    pokemonList: PokemonDataResult[] = [];
    selectedPokemon?: PokemonDetailsData;
    selectedPokemonImg: string = '';
    selectedPokemonBg: string = '../../../assets/img/type-backgrounds/background-black.png';
    selectedPokemonTypes: string[] = [];
    page:number = 1;
    viewDetails:boolean = false;
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

    async onPokemonSelected(id: string){
        if(this.selectedPokemon && this.selectedPokemon.id.toString() === id){
            this.switchViewDetails();
            return;
        }
        this.selectedPokemon = await this.pokemonService.getById(id);
        this.selectedPokemonImg = this.selectedPokemon.sprites.front_default;
        this.getPokemonTypes();
        this.getPokemonBackground(this.selectedPokemon.types[0].type.name)
                       
    }

    getPokemonBackground(type: string){
        this.selectedPokemonBg = `../../../assets/img/type-backgrounds/background-${type}.png`;
    }

    getPokemonTypes(){

        let typesArray: string[] = [];

        this.selectedPokemon?.types.forEach((type: any) => {
            typesArray.push(type.type.name);
        });
        
        this.selectedPokemonTypes = typesArray;
        console.log('Types', this.selectedPokemonTypes)
    }


    /**
     * Evento que detecta cuando se ha llegado al final del scroll y hace otra llamda a la api para seguir rellenando la lista de pokemons
     * @param e 
     */
    onScroll(e: any) {
        console.log('scroll');
        if (this.loading) {
            return;
        }
        
        const { clientHeight, scrollTop, scrollHeight } = this.pokeListElement.nativeElement;
        if (Math.round(clientHeight + scrollTop) >= scrollHeight) {
            this.getPokemonList();
        }
    }

    switchViewDetails(){
        if(this.selectedPokemon) this.viewDetails = !this.viewDetails;
    }
    
   

}
