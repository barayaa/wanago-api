import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientsService } from 'src/clients/clients.service';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
   constructor(
    private readonly clienService: ClientsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
   ){}


   //register a new clients
    async registerClient(createclient: CreateClientDto){
        const hasPassword = await bcrypt.hash(createclient.password, 10);
        try{
            const createClient = await this.clienService.create({
                ...createclient,
                password: hasPassword
            })
           // createClient.password = undefined;
           const {password, ...result} = createClient;
            return result;
        }catch(error){
            if(error?.code === '23505' ){
                throw new HttpException('Email already exists',HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAuthenticatedClient(email: string, Hashedpassword: string){
       try {
        const client = await this.clienService.findByEmail(email)
        const isPasswordMaatch = bcrypt.compare(Hashedpassword, client.password);
        if(!isPasswordMaatch){
            throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
        }
        const {password, ...result} = client;
        return result;
       } catch (error) {
        throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
       }
    }

    //getCookiWithToken
    async getCookiWithToken(email: string){
        const payload = {email};
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION')}`;
    }
}
