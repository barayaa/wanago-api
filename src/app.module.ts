import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as joi from '@hapi/joi'
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    DbModule,
    ClientsModule,
    ConfigModule.forRoot({
      validationSchema: joi.object({
        POSTGRES_HOST: joi.string().required(),
        POSTGRES_PORT: joi.number().required(),
        POSTGRES_USER: joi.string().required(),
        POSTGRES_PASSWORD: joi.string().required(),
        POSTGRES_DB: joi.string().required(),
        PORT: joi.number()
    }) 
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
