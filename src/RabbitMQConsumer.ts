import dotenv from "dotenv";

import RabbitMQService from "./services/RabbitMQService";
import NotificationService from "./services/NotificationService";
import { NewMessageInput } from "./resolvers/MessageResolver";

const notificationService = new NotificationService();

dotenv.config();

const init = async () => {
  await RabbitMQService.consume(async (message) => {
    const stringMessage = message.content.toString();

    console.log(` [x] Received ${stringMessage}`);

    await notificationService.processNotification(
      JSON.parse(stringMessage) as unknown as NewMessageInput
    );
  });

  console.log(
    ` [*] Waiting for messages in ${RabbitMQService.queue}. To exit press CTRL+C`
  );
};

init().catch(console.error);
