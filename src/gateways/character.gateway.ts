import fetch, { Response } from 'node-fetch';
import { Singleton } from 'typescript-ioc';
import { ICharacterGateway, PagedResponse } from '../interfaces/characters.interfaces';

@Singleton
export default class CharacterGateway implements ICharacterGateway {
    private readonly apiUrl: string;

    constructor() {
        this.apiUrl = `${process.env.RICK_AND_MORTY_API_URL}/character`;
    }

    public async getData(page?: string): Promise<PagedResponse<any>> {
        try {
            const response: Response = await fetch(`${this.apiUrl}?page=${page ? +page : 0}`);
            return await response.json();
        } catch (e) {
            console.error('CharacterGateway.getData', e);
            throw e;
        }
    }

    public async getById(id: string): Promise<any> {
        try {
            const response: Response = await fetch(`${this.apiUrl}/${id}`);

            if (response.status === 404) throw { statusCode: response.status, message: response.statusText };
            return await response.json();
        } catch (e) {
            console.error('CharacterGateway.getById', e);
            throw e;
        }
    }
}
