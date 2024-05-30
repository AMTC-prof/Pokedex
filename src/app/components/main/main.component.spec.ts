import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetailsData } from '../../interfaces/pokeApi';
import { BULBASUR, BULBASUR_TYPE, PokemonServiceStub } from './PokemonServiceStub';

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

    // it('should detect when scrolled to bottom', () => {
    //     const event = {
    //       target: {
    //         scrollHeight: 1000,
    //         scrollTop: 900,
    //         clientHeight: 100
    //       }
    //     };
      
    //     const spyOnScroll = spyOn(component, 'onScroll').and.callThrough();
      
    //     component.onScroll(event);
      
    //     expect(spyOnScroll).toHaveBeenCalledWith(event);
    // });
    


    
});
