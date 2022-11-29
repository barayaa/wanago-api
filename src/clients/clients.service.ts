import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {

  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>
  ){}


 async create(createClientDto: CreateClientDto) {
      const client  = await this.clientRepository.create(createClientDto);
      await this.clientRepository.save(client)
      return client;
  }

  findAll() {
    return this.clientRepository.find();
  }

async findOne(id: number) {
    const client= this.clientRepository.findOne({where: {id}})

    if(client){
      return client
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

  }

 async update(id: number, updateClientDto: UpdateClientDto) {
      await this.clientRepository.update(id,updateClientDto);
      const clientExist = await this.clientRepository.findOne({where: {id}})
      if(clientExist){
        return clientExist
      }
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
  }

 async remove(id: number) {
    const clientDelete =  await this.clientRepository.delete(id)

    if(!clientDelete.affected){
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }
  }
}
