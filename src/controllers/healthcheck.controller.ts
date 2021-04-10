import { Route, Get, Controller, Tags } from 'tsoa';
import { IPingResponse } from '../interfaces/healthcheck.interface';

@Route('ping')
@Tags('healthcheck')
export default class HealthCheckController extends Controller {
    @Get()
    public async getPong(): Promise<IPingResponse> {
        return Promise.resolve({ message: 'Pong' });
    }
}
