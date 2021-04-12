import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import nock from 'nock';
import {
    CharacterGender,
    CharacterStatus,
    ICharacter,
    ICharacterGateway,
    PagedResponse,
} from '../../../src/interfaces/characters.interfaces';
import CharacterGateway from '../../../src/gateways/character.gateway';

chai.use(chaiAsPromised);

describe('Character Gateway', () => {
    const gateway: ICharacterGateway = new CharacterGateway();

    afterEach(() => nock.cleanAll());

    describe('on want to get all characters', () => {
        describe('on external api success', () => {
            describe('on call first page', () => {
                it('should return the paged results', async () => {
                    nock('https://rickandmortyapi.com/api')
                        .get('/character?page=0')
                        .reply(200, {
                            info: { count: 1 },
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
                                },
                            ],
                        });

                    const page: PagedResponse<ICharacter> = await gateway.getData();

                    expect(page.info.count).to.be.equals(1);
                    expect(page.results[0].name).to.be.equals('Rick Sanchez');
                });
            });

            describe('on call other page', () => {
                it('should return the paged results', async () => {
                    nock('https://rickandmortyapi.com/api')
                        .get('/character?page=2')
                        .reply(200, {
                            info: {
                                count: 1,
                                next: 'https://rickandmortyapi.com/api/character?page=3',
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
                                },
                            ],
                        });

                    const page: PagedResponse<ICharacter> = await gateway.getData('2');

                    expect(page.info.count).to.be.equals(1);
                    expect(page.results[0].name).to.be.equals('Rick Sanchez');
                });
            });

            describe('on call get by id', () => {
                it('should return the character', async () => {
                    nock('https://rickandmortyapi.com/api')
                        .get('/character/1')
                        .reply(200, {
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
                        });

                    const character: ICharacter = await gateway.getById('1');

                    expect(character.id).to.be.equals(1);
                    expect(character.name).to.be.equals('Rick Sanchez');
                });
            });
        });
    });

    describe('on external api fails', () => {
        describe('on call first page', () => {
            it('should throw error', async () => {
                nock('https://rickandmortyapi.com/api').get('/character?page=0').replyWithError('fails');
                expect(gateway.getData()).to.eventually.be.rejectedWith();
            });
        });

        describe('on call get by id', () => {
            describe('on 404 response', () => {
                it('should throw error', async () => {
                    nock('https://rickandmortyapi.com/api').get('/character/1').reply(404);
                    expect(gateway.getById('1')).to.eventually.be.rejectedWith();
                });
            });

            describe('on fail service', () => {
                it('should throw error', async () => {
                    nock('https://rickandmortyapi.com/api').get('/character/1').replyWithError('fails');
                    expect(gateway.getById('1')).to.eventually.be.rejectedWith();
                });
            });
        });
    });
});
