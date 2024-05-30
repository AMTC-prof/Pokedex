import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from '../main/main.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonDetailsComponent } from './pokemon-details.component';
import { PokemonService } from '../../services/pokemon.service';
import { BULBASUR, BULBASUR_TYPE, PokemonServiceStub } from '../main/PokemonServiceStub';

describe('PokemonDetailsComponent', () => {
    let component: PokemonDetailsComponent
    let fixture: ComponentFixture<PokemonDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PokemonDetailsComponent, MainComponent, HttpClientTestingModule], 
            providers: [
                { provide: PokemonService, useClass: PokemonServiceStub }
            ]
            
        }).compileComponents();

        fixture = TestBed.createComponent(PokemonDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load the Pokémon description on changes', async () => {
       component.pokemonData = BULBASUR;
       component.ngOnChanges();

       await fixture.whenStable();

        expect(component.pokemonDescription).toBe('bulbasaur description');
    });

    it('should load the Pokémon types on changes', async () => {
        component.pokemonData = BULBASUR;
        component.ngOnChanges();

        await fixture.whenStable();

        expect(component.pokemonTypes).toEqual([BULBASUR_TYPE]);
    });

    it('should load the Pokémon background color on changes', async () => {
        component.pokemonData = BULBASUR;
        component.ngOnChanges();

        await fixture.whenStable();

        expect(component.pokemonBgColor).toEqual(['#78c850' ]);
    });

   

});