import {Module} from '@nestjs/common';
import {EntitiesService} from './entities.service';
import {EntitiesResolver} from './entities.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Entity} from "./entities/entity.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Entity])],
    providers: [EntitiesResolver, EntitiesService]
})
export class EntitiesModule {
}
