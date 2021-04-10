import { Route, Controller, Get, Security, Query, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';

import { ICharacter, PagedResponse } from '../interfaces/characters.interfaces';
import CharacterService from '../services/character.service';
import FavoriteService from '../services/favorites.service';
import AuthService from '../services/auth.service';

@Route('characters')
@Tags('characters')
export default class CharacterController extends Controller {
    private readonly token: string;

    constructor(token: string) {
        super();
        this.token = token;
    }

    @Inject
    private readonly service: CharacterService;

    @Inject
    private readonly favoriteService: FavoriteService;

    @Inject
    private readonly authService: AuthService;

    @Security('api_key')
    @Get()
    public async getPagedCharacters(@Query('page') page: string): Promise<PagedResponse<ICharacter>> {
        try {
            const userId: string = this.authService.getUserIdFromToken(this.token);
            const data: PagedResponse<ICharacter> = await this.service.getPagedCharacters(page);

            const dataWithFavs: Promise<ICharacter>[] = data.results.map(async (character: ICharacter) => ({
                ...character,
                isFavorite: await this.favoriteService.isFavorite(character.id.toString(), userId),
            }));

            return { ...data, results: await Promise.all(dataWithFavs) };
        } catch (e) {
            console.error(e);
            throw { statusCode: e.statusCode || 500, message: e.message || 'error on get data characters' };
        }
    }

    @Security('api_key')
    @Get('{id}')
    public async getCharacterById(id: string): Promise<ICharacter> {
        try {
            const userId: string = this.authService.getUserIdFromToken(this.token);

            return {
                ...(await this.service.getCharacterById(id)),
                isFavorite: await this.favoriteService.isFavorite(id.toString(), userId),
            };
        } catch (e) {
            console.error(e);
            throw { statusCode: e.statusCode || 500, message: e.message || 'error on get character' };
        }
    }
}
