import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Context } from "../context";
import RabbitMQService from "../services/RabbitMQService";

@InputType()
export class NewMessageInput {
  @Field()
  userId: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  phone?: string;

  @Field()
  content: string;
}

@Resolver()
export default class MessageResolver {
  @Mutation((_returns) => Boolean)
  async collectMessage(
    @Arg("data") newMessageData: NewMessageInput,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const { prisma } = ctx;

    await prisma.message.create({ data: { ...newMessageData } });

    await RabbitMQService.pushToQueue({ ...newMessageData });

    return true;
  }
}
