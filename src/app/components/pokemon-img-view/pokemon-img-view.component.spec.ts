import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonImgViewComponent } from './pokemon-img-view.component';
import { MainComponent } from '../main/main.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('PokemonImgViewComponent', () => {
    let component: PokemonImgViewComponent;
    let fixture: ComponentFixture<PokemonImgViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PokemonImgViewComponent, MainComponent, HttpClientTestingModule], 
            
        }).compileComponents();

        fixture = TestBed.createComponent(PokemonImgViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });  

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should have empty pokemonImg and pokemonBg properties by default', () => {
        expect(component.pokemonImg).toBe('');
        expect(component.pokemonBg).toBe('');
    });

    it('should display the correct pokemon image', () => {
        component.pokemonImg = 'https://example.com/bulbasur.png';
        fixture.detectChanges();
        const imgElement = fixture.debugElement.query(By.css('[alt="Selected Pokemon Image"]')).nativeElement as HTMLImageElement;
        expect(imgElement.src).toBe('https://example.com/bulbasur.png');
    });

    
    it('should display the correct background image', () => {
        // Asegurarse de que pokemonImg tiene un valor para que el HTML se renderice
        component.pokemonImg = 'https://example.com/bulbasur.png';
        component.pokemonBg = 'https://example.com/background.png';
        fixture.detectChanges();    
        const containerElement = fixture.debugElement.query(By.css('[aria-label="Selected Pokemon Background"]'));
        expect(containerElement).toBeTruthy();      
        const nativeElement = containerElement.nativeElement as HTMLElement;
        const computedStyle = getComputedStyle(nativeElement);
        expect(computedStyle.backgroundImage).toBe('url("https://example.com/background.png")');
    });
});