import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;
  @Field(() => String)
  title: string;
  @Field(() => String)
  slug: string;
}
