import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDataWithId, PokemonDetailsData } from '../../interfaces/pokeApi';

const BULBASUR_TYPE = 'grass';
const BULBASUR : PokemonDetailsData =  {
    id: 1,
    order: 0,
    name: 'bulbasaur',
    weight: 15,
    height: 15,
    base_experience: 15,
    is_default: true,
    types: [{
        slot: 1,
        type: {
            name: 'grass',
            url: 'https://pokeapi.co/api/v2/type/12'
        }
    
    }],
    stats: [],
    abilities: [],
    cries: {latest: '', legacy: ''},
    forms: [],
    game_indices: [],
    held_items: [],
    location_area_encounters: '',
    moves: [],
    past_abilities: [],
    past_types:     [],
    species: {name: '', url: ''},
    sprites: {
        back_default:       '',
        back_female:        null,
        back_shiny:         '',
        back_shiny_female:  null,
        front_default:      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        front_female:       null,
        front_shiny:        '',
        front_shiny_female: null,
       
    }

}

class PokemonServiceStub extends PokemonService{

    pokemonData : PokemonDataWithId[] = [{pokemon: {name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1'}, id: '1'}];
    
    
    override async  getByPage(page: number, size:number = 40 ):Promise<PokemonDataWithId[]>{
        
        return this.pokemonData;
      
    }
        
    override async getById(id:string):Promise<PokemonDetailsData>{
        
        return BULBASUR;
    }
           
    override async getDescription(id:string | number): Promise<string>{
        console.log('getDescription')
        throw new Error('Method not implemented.');
    }
}

describe('MainComponent', () => {
    let fixture: ComponentFixture<MainComponent>;
    let component: MainComponent;

    // Configuración previa a cada prueba
    beforeEach(async () => {
        // Configurar el entorno de pruebas
        await TestBed.configureTestingModule({
            imports: [],
            declarations: [], 
            providers: [MainComponent, {provide: PokemonService, useClass: PokemonServiceStub}], 
        }).compileComponents();

        // Crear una instancia del componente
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
   
    it('should load the first page of Pokemon', async () => {
       
        await component.getPokemonList();
        expect(component.pokemonList.length).toBeGreaterThan(0);  
       
        
    });

    it('should icrease the page number when getPokemonList is called', async () => {
        await component.getPokemonList();
        expect(component.page).toBe(2);
    });

    // it('should select the first Pokemon when selectFirstPokemon is called', async () => {
    //     await component.getPokemonList();
       
    //     expect(component.selectedPokemon?.id).toBe(1);
       
    // });

    it('should load pokemon details on pokemonSelected', async () => {
        await component.onPokemonSelected('1');
        expect(component.selectedPokemon?.id).toBe(1);
    });

    it('should load the first pokemon image on pokemonSelected', async () => {
        await component.onPokemonSelected('1');
        expect(component.selectedPokemonImg).toBe(BULBASUR.sprites.front_default);
    });

    it('should load select pokemon types', async () => {
        await component.onPokemonSelected('1');
        expect(component.selectedPokemonTypes).toEqual(['grass']);
    });

    it('should load the background color based on the first type of the selected Pokemon', async () => {
        await component.onPokemonSelected('1');
        expect(component.selectedPokemonBg).toBe(`../../../assets/img/type-backgrounds/background-${BULBASUR_TYPE}.png`)
    });


    
});
