import { PokemonService } from '../../services/pokemon.service';
import { PokemonDataWithId, PokemonDetailsData } from '../../interfaces/pokeApi';

export const BULBASUR_TYPE = 'grass';
export const BULBASUR : PokemonDetailsData =  {
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


export class PokemonServiceStub extends PokemonService {

    pokemonData: PokemonDataWithId[] = [{ pokemon: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' }, id: '1' }];


    override async getByPage(page: number, size: number = 40): Promise<PokemonDataWithId[]> {

        return this.pokemonData;

    }

    override async getById(id: string): Promise<PokemonDetailsData> {

        return BULBASUR;
    }

    override async getDescription(id: string | number): Promise<string> {

        return 'bulbasaur description';
    }
}
