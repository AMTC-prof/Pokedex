import { Component } from '@angular/core';

@Component({
  selector: 'app-pokemon-img-view',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-img-view.component.html',
  styleUrl: './pokemon-img-view.component.scss'
})

export class PokemonImgViewComponent {

  type: string = 'white';
  backgroundType: string = `../../../assets/img/type-backgrounds/background-${this.type}.png`;
  

  constructor(){

  }
}
