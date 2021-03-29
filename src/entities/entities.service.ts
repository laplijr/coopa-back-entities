import {Injectable} from '@nestjs/common';
import {CreateEntityInput} from './dto/create-entity.input';
import {UpdateEntityInput} from './dto/update-entity.input';
import {InjectRepository} from "@nestjs/typeorm";
import {Entity} from "./entities/entity.entity";
import {DeleteResult, Repository} from "typeorm";

@Injectable()
export class EntitiesService {
    constructor(
        @InjectRepository(Entity)
        private entityRepository: Repository<Entity>
    ) {
    }

    create(createEntityInput: CreateEntityInput): Promise<Entity> {
        return this.entityRepository.save({
            name: createEntityInput.name
        });
    }

    findAll(): Promise<Entity[]> {
        return this.entityRepository.find();
    }

    findOne(id: string): Promise<Entity> {
        return this.entityRepository.findOne({
            where: {
                id
            }
        });
    }

    update(updateEntityInput: UpdateEntityInput): Promise<Entity> {
        return this.entityRepository.save(updateEntityInput);
    }

    async remove(id: string){
        const entity = await this.findOne(id);
        await this.entityRepository.delete({
            id
        });
        return entity;
    }
}
