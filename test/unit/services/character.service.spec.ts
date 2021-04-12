import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Container, Snapshot } from 'typescript-ioc';
import CharacterGateway from '../../../src/gateways/character.gateway';
import CharacterService from '../../../src/services/character.service';
import { ICharacter, ICharacterService, PagedResponse } from '../../../src/interfaces/characters.interfaces';
import { CharacterGatewayFailMock, CharacterGatewayMock } from '../../mocks/character.gateway.mock';

chai.use(chaiAsPromised);

describe('Character Service', () => {
    const snapshot: Snapshot = Container.snapshot(CharacterGateway);

    afterEach(() => snapshot.restore());

    describe('on want to get all characters', () => {
        describe('on success gateway', () => {
            before(() => Container.bind(CharacterGateway).to(CharacterGatewayMock));

            describe('on first page ask', () => {
                it('should return the results', async () => {
                    const service: ICharacterService = new CharacterService();
                    const page: PagedResponse<ICharacter> = await service.getPagedCharacters();

                    expect(page.info.count).to.be.equals(1);
                    expect(page.results[0].name).to.be.equals('Rick Sanchez');
                });
            });
        });

        describe('on gateway service fails', () => {
            before(() => Container.bind(CharacterGateway).to(CharacterGatewayFailMock));

            describe('on gateway call', () => {
                it('should throw error', async () => {
                    const service: ICharacterService = new CharacterService();
                    expect(service.getPagedCharacters()).to.eventually.be.rejectedWith();
                });
            });
        });
    });

    describe('on want to get character by id', () => {
        describe('on success gateway', () => {
            before(() => Container.bind(CharacterGateway).to(CharacterGatewayMock));

            describe('on ask for id 1', () => {
                it('should return the Rick Sanchez character', async () => {
                    const service: ICharacterService = new CharacterService();
                    const character: ICharacter = await service.getCharacterById('1');

                    expect(character.id).to.be.equals(1);
                    expect(character.name).to.be.equals('Rick Sanchez');
                });
            });
        });

        describe('on gateway service fails', () => {
            before(() => Container.bind(CharacterGateway).to(CharacterGatewayFailMock));

            describe('on gateway getById method call', () => {
                it('should throw error', async () => {
                    const service: ICharacterService = new CharacterService();
                    expect(service.getCharacterById('1')).to.eventually.be.rejectedWith();
                });
            });
        });
    });
});
