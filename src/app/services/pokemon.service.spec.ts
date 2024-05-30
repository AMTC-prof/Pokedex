import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
    let service: PokemonService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PokemonService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve a list of Pokemon data by page', async () => {
        const page = 1;
        const size = 20;
        const pokemonData = await service.getByPage(page, size);
        expect(pokemonData.length).toBe(size);
    });

    it('should handle an empty page of Pokemon data', async () => {
        const page = 1000; // Assuming this page does not exist
        const size = 20;
        const pokemonData = await service.getByPage(page, size);
        expect(pokemonData.length).toBe(0);
    });

    it('should retrieve the details of a Pokemon by ID', async () => {
        const id = '1'; 
        const pokemonDetails = await service.getById(id);
        expect(pokemonDetails).toBeDefined();
        expect(pokemonDetails.id).toBe(Number(id));
    });

    it('should handle a non-existent Pokemon ID', async () => {
        const id = '9999'; 
        try {
            await service.getById(id);
            fail('Expected error not thrown');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should retrieve the description of a Pokemon by ID or number', async () => {
        const id = '1';
        const description = await service.getDescription(id);
        expect(description).toBeDefined();
        expect(description.length).toBeGreaterThan(0);
    });

    it('should handle a non-existent Pokemon description ID', async () => {
        const id = '9999'; 
        try {
            await service.getDescription(id);
            fail('Expected error not thrown');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
