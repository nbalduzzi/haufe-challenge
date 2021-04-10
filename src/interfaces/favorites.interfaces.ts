export interface IFavoriteRepository {
    getUserFavorites(userId: string): Promise<IFavorite[]>;
    getUserFavorite(favorite: IFavorite): Promise<IFavorite | undefined>;
    addUserFavorite(favorite: IFavorite): Promise<IFavorite>;
    removeUserFavorite(favorite: IFavorite): Promise<void>;
}

export interface IFavoriteService {
    getUserFavorites(userId: string): Promise<IFavorite[]>;
    getUserFavorite(userId: string, characterId: string): Promise<IFavorite | undefined>;
    addUserFavorite(userId: string, characterId: string): Promise<IFavorite>;
    removeUserFavorite(userId: string, characterId: string): Promise<void>;
    isFavorite(characterId: string, userId?: string): Promise<boolean>;
}

export interface IFavorite {
    userId: string;
    characterId: string;
}
