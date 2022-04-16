import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Purchase } from './purchase.model';

@ObjectType()
export class Customer {
  @Field(() => ID)
  id: string;
  @Field(() => ID)
  authUserId: string;
  @Field(() => [Purchase])
  purchases: Purchase[];
}
