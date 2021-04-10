import { Inject, Singleton } from 'typescript-ioc';
import CharacterGateway from '../gateways/character.gateway';
import { ICharacterService, ICharacter, PagedResponse } from '../interfaces/characters.interfaces';

@Singleton
export default class CharacterService implements ICharacterService {
    @Inject
    private gateway: CharacterGateway;

    public async getPagedCharacters(page?: string): Promise<PagedResponse<ICharacter>> {
        try {
            const { info, results }: PagedResponse<any> = await this.gateway.getData(page);

            return {
                info: {
                    ...info,
                    next: info.next && new URL(info.next).searchParams.get('page')!,
                    prev: info.prev && new URL(info.prev).searchParams.get('page')!,
                },
                results: results.map((r: any) => ({ ...r, episode: r.episode.length })),
            };
        } catch (e) {
            console.error('CharacterService.getData', e);
            throw e;
        }
    }

    public async getCharacterById(id: string): Promise<ICharacter> {
        try {
            const character: any = await this.gateway.getById(id);
            return { ...character, episode: character.episode.length };
        } catch (e) {
            console.error('CharacterService.getById', e);
            throw e;
        }
    }
}
