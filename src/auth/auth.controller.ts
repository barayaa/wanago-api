import { Body, Controller, HttpCode, Req, UseGuards } from '@nestjs/common';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { AuthService } from './auth.service';
import { LocalAuthenticationGuard } from './localAuthenticationGuard';
import { RequestWithClient } from './requestWithClient';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    // @Post('register')
    async register(@Body() createClientDto: CreateClientDto){
        return this.authService.registerClient(createClientDto);
    }

    // @Post('login')
    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    async login(@Req() request: RequestWithClient){
        const client = request.client;
        client.password = undefined;
        return client;
    }
}
