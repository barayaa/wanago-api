import {Request} from 'express';
import { Client } from "src/clients/entities/client.entity";


 export interface RequestWithClient extends Request {
    client: Client;
}