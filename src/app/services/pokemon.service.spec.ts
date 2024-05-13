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

    it('should retrieve the details of a Pokemon by ID', async () => {
        const id = '1'; // Convert the id to a number
        const pokemonDetails = await service.getById(id);
        expect(pokemonDetails).toBeDefined();
        expect(pokemonDetails.id).toBe(Number(id));
    });

    it('should retrieve the description of a Pokemon by ID or number', async () => {
        const id = '1';
        const description = await service.getDescription(id);
        expect(description).toBeDefined();
        expect(description.length).toBeGreaterThan(0);
    });
});