import {InputType, Field} from '@nestjs/graphql';

@InputType()
export class CreateEntityInput {
    @Field({description: 'name of the entity'})
    name: string;
}
