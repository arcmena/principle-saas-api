import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { MessageCreateInput } from "@generated/type-graphql";
import { Context } from "../context";
import RabbitMQService from "../services/RabbitMQService";

class NewMessageInput extends MessageCreateInput {
  userId: number;
}

@Resolver()
export default class MessageResolver {
  @Mutation((_returns) => Boolean)
  collectMessage(
    @Arg("data") newMessageData: MessageCreateInput,
    @Ctx() ctx: Context
  ): boolean {
    RabbitMQService.pushToQueue({ ...newMessageData });

    return true;
  }
}
