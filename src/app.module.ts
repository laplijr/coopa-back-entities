import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";
import {GraphQLModule} from '@nestjs/graphql';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import { EntitiesModule } from './entities/entities.module';
import {Entity} from "./entities/entities/entity.entity";
import * as path from "path";

require('dotenv').config({
    path: path.resolve(process.cwd(), `env/.env.${process.env.NODE_ENV}`)
});

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [Entity],
            synchronize: ['local', 'dev'].includes(process.env.NODE_ENV),
            schema: process.env.DB_SCHEMA
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            sortSchema: true
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        EntitiesModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private connection: Connection) {}
}
