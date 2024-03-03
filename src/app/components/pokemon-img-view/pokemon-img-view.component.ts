import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-img-view',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-img-view.component.html',
  styleUrl: './pokemon-img-view.component.scss'
})

export class PokemonImgViewComponent {

  @Input() pokemonImg: string | undefined = '';
  @Input() pokemonBg: string | undefined = '';
  
  constructor(){

  }
}
