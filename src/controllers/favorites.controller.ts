import { Route, Controller, Get, Put, Delete, Security, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { IFavorite } from '../interfaces/favorites.interfaces';
import AuthService from '../services/auth.service';
import FavoriteService from '../services/favorites.service';

@Route('favorites')
@Tags('favorites')
export default class FavoriteController extends Controller {
    private readonly token: string;

    constructor(token: string) {
        super();
        this.token = token;
    }

    @Inject
    private readonly authService: AuthService;

    @Inject
    private readonly service: FavoriteService;

    @Security('api_key')
    @Get()
    public async getUserFavorites(): Promise<IFavorite[]> {
        try {
            const userId: string = this.authService.getUserIdFromToken(this.token);
            return await this.service.getUserFavorites(userId);
        } catch (e) {
            console.error(e);
            throw { statusCode: e.statusCode || 500, message: e.message || 'error on getting user favorites' };
        }
    }

    @Security('api_key')
    @Put('{characterId}')
    public async addUserFavorite(characterId: string): Promise<IFavorite> {
        try {
            const userId: string = this.authService.getUserIdFromToken(this.token);
            return await this.service.addUserFavorite(userId, characterId);
        } catch (e) {
            console.error(e);
            throw { statusCode: e.statusCode || 500, message: e.message || 'error on add user favorite' };
        }
    }

    @Security('api_key')
    @Delete('{characterId}')
    public async removeUserFavorite(characterId: string): Promise<void> {
        try {
            const userId: string = this.authService.getUserIdFromToken(this.token);
            await this.service.removeUserFavorite(userId, characterId);
        } catch (e) {
            console.error(e);
            throw { statusCode: e.statusCode || 500, message: e.message || 'error on remove user favorite' };
        }
    }
}
