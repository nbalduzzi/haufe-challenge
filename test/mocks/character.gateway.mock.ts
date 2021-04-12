import {
    CharacterGender,
    CharacterStatus,
    ICharacter,
    PagedResponse,
} from '../../src/interfaces/characters.interfaces';

export class CharacterGatewayMock {
    public async getData(): Promise<PagedResponse<any>> {
        return {
            info: {
                count: 1,
                pages: 34,
                next: 'https://rickandmortyapi.com/api/character?page=2',
                prev: 'https://rickandmortyapi.com/api/character?page=1',
            },
            results: [
                {
                    id: 1,
                    name: 'Rick Sanchez',
                    status: CharacterStatus.ALIVE,
                    species: 'Human',
                    type: '',
                    gender: CharacterGender.MALE,
                    origin: {
                        name: 'Earth (C-137)',
                        url: 'https://rickandmortyapi.com/api/location/1',
                    },
                    location: {
                        name: 'Earth (Replacement Dimension)',
                        url: 'https://rickandmortyapi.com/api/location/20',
                    },
                    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                    episode: [],
                    url: 'https://rickandmortyapi.com/api/character/1',
                    created: '2017-11-04T18:48:46.250Z',
                    isFavorite: false,
                },
            ],
        };
    }

    public async getById(): Promise<any> {
        return {
            id: 1,
            name: 'Rick Sanchez',
            status: CharacterStatus.ALIVE,
            species: 'Human',
            type: '',
            gender: CharacterGender.MALE,
            origin: {
                name: 'Earth (C-137)',
                url: 'https://rickandmortyapi.com/api/location/1',
            },
            location: {
                name: 'Earth (Replacement Dimension)',
                url: 'https://rickandmortyapi.com/api/location/20',
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            episode: [],
            url: 'https://rickandmortyapi.com/api/character/1',
            created: '2017-11-04T18:48:46.250Z',
            isFavorite: false,
        };
    }
}

export class CharacterGatewayFailMock {
    public async getData(): Promise<PagedResponse<ICharacter>> {
        throw { statusCode: 500, message: 'fail' };
    }

    public async getById(): Promise<PagedResponse<ICharacter>> {
        throw { statusCode: 500, message: 'fail' };
    }
}
