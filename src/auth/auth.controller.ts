import { Body, Controller, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';

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
    @Post()
    async register(@Body() createClientDto: CreateClientDto){
        return this.authService.registerClient(createClientDto);
    }

    @Post('login')
    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    // async login(@Req() request: RequestWithClient, @Res() response: Response){
    //     const {client }= request;
    //     const cookie = this.authService.getCookiWithToken(client.email);
    //     response.headers.set('Set-Cookie', await cookie);
    //     client.password = undefined;
    //     return response ;
    // }

    async login(@Req() request: RequestWithClient){
        const {client }= request;
        const cookie = this.authService.getCookiWithToken(client.email);
        client.password = undefined;
       const result = {client, cookie}
        return result;
       // return {client, cookie};
    }
}
