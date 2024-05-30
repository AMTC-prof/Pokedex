import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListItemComponent } from './pokemon-list-item.component';
import { MainComponent } from '../main/main.component';
import { PokemonService } from '../../services/pokemon.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonServiceStub } from '../main/PokemonServiceStub';
import { By } from '@angular/platform-browser';

describe('PokemonListItemComponent', () => {
    let fixture: ComponentFixture<PokemonListItemComponent>;
    let component: PokemonListItemComponent;   

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PokemonListItemComponent, MainComponent, HttpClientTestingModule], 
            providers: [
                { provide: PokemonService, useClass: PokemonServiceStub } // useClass instead of useValue
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PokemonListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should extract the Pokemon ID from the URL', () => {
        component.data = { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' };
        component.getPokemonId();
        expect(component.id).toBe('1');
    });

    it('should retrieve the Pokemon details', () => {
        
        component.getPokemonDetails();
        expect(component.detailsData).toBeDefined();
    });

    it('should retrieve the Pokemon details when the data changes', () => {
        
        component.ngOnChanges();
        expect(component.detailsData).toBeDefined();
    });

    it('should load the click sound', () => {
        component.loadClickSound();
        expect(component.clickSound).toBeDefined();
    });

    it('should play a sound when clicked', () => {
        spyOn(component.clickSound, 'play');
        fixture.detectChanges(); 
        const element = fixture.debugElement.query(By.css('#card'));
        expect(element).not.toBeNull(); 

        if (element) {
            element.triggerEventHandler('click', null);
            expect(component.clickSound.play).toHaveBeenCalled();
        }
    });

    
   
});
