import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

interface pokeType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  typeList: pokeType[] = [
    { value: 'normal', viewValue: 'Normal' },
    { value: 'fire', viewValue: 'Fire' },
    { value: 'water', viewValue: 'Water' },
    { value: 'electric', viewValue: 'Electric' },
    { value: 'grass', viewValue: 'Grass' },
    { value: 'ice', viewValue: 'Ice' },
    { value: 'fighting', viewValue: 'Fighting' },
    { value: 'poison', viewValue: 'Poison' },
    { value: 'ground', viewValue: 'Ground' },
    { value: 'flying', viewValue: 'Flying' },
    { value: 'psychic', viewValue: 'Psychic' },
    { value: 'bug', viewValue: 'Bug' },
    { value: 'rock', viewValue: 'Rock' },
    { value: 'ghost', viewValue: 'Ghost' },
    { value: 'dragon', viewValue: 'Dragon' },
    { value: 'dark', viewValue: 'Dark' },
    { value: 'steel', viewValue: 'Steel' },
    { value: 'fairy', viewValue: 'Fairy' }
  ];
}
