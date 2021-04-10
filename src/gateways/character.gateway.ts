import fetch, { Response } from 'node-fetch';
import { Singleton } from 'typescript-ioc';
import { ICharacterGateway, PagedResponse } from '../interfaces/characters.interfaces';

@Singleton
export default class CharacterGateway implements ICharacterGateway {
    public readonly API_URL: string = 'https://rickandmortyapi.com/api/character'; // TODO: change this to env

    public async getData(page?: string): Promise<PagedResponse<any>> {
        try {
            const response: Response = await fetch(`${this.API_URL}?page=${page ? +page : 0}`);
            return await response.json();
        } catch (e) {
            console.error('CharacterGateway.getData', e);
            throw e;
        }
    }

    public async getById(id: string): Promise<any> {
        try {
            const response: Response = await fetch(`${this.API_URL}/${id}`);

            if (response.status === 404) throw { statusCode: response.status, message: response.statusText };
            return await response.json();
        } catch (e) {
            console.error('CharacterGateway.getById', e);
            throw e;
        }
    }
}
