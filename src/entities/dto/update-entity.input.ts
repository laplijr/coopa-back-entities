import {CreateEntityInput} from './create-entity.input';
import {InputType, Field, PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateEntityInput extends PartialType(CreateEntityInput) {
    @Field({description: "id of the entity"})
    id: string;
    @Field({description: "name of the entity"})
    name: string;
}
