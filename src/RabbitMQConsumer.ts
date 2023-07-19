import RabbitMQService from "./services/RabbitMQService";
import dotenv from "dotenv";

dotenv.config();

const init = async () => {
  await RabbitMQService.consume(async (message) => {
    console.log(" [x] Received %s", message.content.toString());
  });

  console.log(
    " [*] Waiting for messages in %s. To exit press CTRL+C",
    RabbitMQService.queue
  );
};

init().catch(console.error);
