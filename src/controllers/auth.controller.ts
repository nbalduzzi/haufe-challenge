import { Route, Controller, Post, Body, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { IAuthLoginRequest, IAuthResponse } from '../interfaces/auth.interfaces';
import { IUser, IUserRegister } from '../interfaces/users.interfaces';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

@Route('auth')
@Tags('security')
export default class AuthController extends Controller {
    @Inject
    private readonly service: AuthService;

    @Inject
    private readonly userService: UserService;

    @Post('login')
    public async login(@Body() { username, password }: IAuthLoginRequest): Promise<IAuthResponse> {
        try {
            const user: IUser = await this.userService.getByUsername(username);

            if (await this.service.isAuthorized(user, password)) {
                this.userService.updateLastConnection(username);
                return {
                    userId: user.userId!,
                    username,
                    access_token: this.service.generateToken(user.userId!),
                    timestamp: Date.now(),
                };
            }

            throw { statusCode: 401, message: 'user is not authorized' };
        } catch (e) {
            console.error(e);
            throw { statusCode: e.statusCode || 500, message: e.message || 'error on attempt to login' };
        }
    }

    @Post('register')
    public async register(@Body() { username, password }: IUserRegister): Promise<IUser> {
        try {
            return await this.userService.register(username, password);
        } catch (e) {
            console.error(e);
            throw { statusCode: e.statusCode || 500, message: e.message || 'error on register user' };
        }
    }
}
