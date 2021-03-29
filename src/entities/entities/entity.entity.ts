import {ObjectType, Field} from '@nestjs/graphql';
import {Column, Entity as TEntity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@TEntity()
export class Entity {
    @PrimaryGeneratedColumn("uuid")
    @Field({description: 'id of the entity'})
    id: string;

    @Column()
    @Field({description: 'name of the entity'})
    name: string;
}
