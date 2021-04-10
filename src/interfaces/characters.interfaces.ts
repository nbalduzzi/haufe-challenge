export interface ICharacterService {
    getPagedCharacters(page?: string): Promise<PagedResponse<ICharacter>>;
    getCharacterById(id: string): Promise<ICharacter>;
}

export interface ICharacterGateway {
    getData(page?: string): Promise<PagedResponse<any>>;
    getById(id: string): Promise<any>;
}

export interface PagedResponse<T> {
    info: {
        count: number;
        pages: number;
        next?: string;
        prev?: string;
    };
    results: T[];
}

export enum CharacterStatus {
    ALIVE = 'Alive',
    DEAD = 'Dead',
    UNKNOWN = 'unknown',
}

export enum CharacterGender {
    FEMALE = 'Female',
    MALE = 'Male',
    GENDERLESS = 'Genderless',
    UNKNOWN = 'unknown',
}

export interface ICharacterOrigin {
    name: string;
    url: string;
}

export interface ICharacterLocation {
    name: string;
    url: string;
}

export interface ICharacter {
    id: number;
    name: string;
    status: CharacterStatus;
    species: string;
    type: string;
    gender: CharacterGender;
    origin: ICharacterOrigin;
    location: ICharacterLocation;
    image: string;
    episode: number;
    url: string;
    created: string;
    isFavorite: boolean;
}
