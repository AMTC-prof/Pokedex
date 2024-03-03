import { Component } from '@angular/core';
import { PokemonListItemComponent } from "./pokemon-list-item/pokemon-list-item.component";

@Component({
    selector: 'app-pokemon-list',
    standalone: true,
    templateUrl: './pokemon-list.component.html',
    styleUrl: './pokemon-list.component.scss',
    imports: [PokemonListItemComponent]
})
export class PokemonListComponent {

}
