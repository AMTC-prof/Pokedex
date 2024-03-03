import { Component } from '@angular/core';
import { PokemonImgViewComponent } from "../pokemon-img-view/pokemon-img-view.component";
import { PokemonListComponent } from "../pokemon-list/pokemon-list.component";
import { PokemonListItemComponent } from '../pokemon-list/pokemon-list-item/pokemon-list-item.component';

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    imports: [PokemonImgViewComponent, PokemonListComponent, PokemonListItemComponent]
})
export class MainComponent {

}
