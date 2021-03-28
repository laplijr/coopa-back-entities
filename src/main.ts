import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";
import {AppModule} from './app.module';
import * as path from "path";
import {Logger} from "@nestjs/common";

require('dotenv').config({
    path: path.resolve(process.cwd(), `env/.env.${process.env.NODE_ENV}`)
});

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({
            logger: process.env.NODE_ENV === 'local'
        })
    );
    app.setGlobalPrefix('api');

    /**
     * API documentation with Swagger setup
     * process.env.npm_package_version represents the actual version of the application
     */
    const options = new DocumentBuilder()
        .setTitle('Coopa Entities API')
        .setDescription('API needed to retrieve Coopa entities')
        .setVersion(process.env.npm_package_version)
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(process.env.PORT);
}

bootstrap()
    .then(() => {
        Logger.log(`started on ${process.env.PORT}`, 'Bootstrap', true);
    })
    .catch(err => {
        Logger.error(`failed starting on ${process.env.PORT}`, err, 'Bootstrap', true)
    })
