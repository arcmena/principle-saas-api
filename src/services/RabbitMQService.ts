import amqp, { Channel, Connection, ConsumeMessage } from "amqplib";

class RabbitMQService {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  get queue() {
    return process.env.RABBITMQ_PUSH_QUEUE;
  }

  async getConnection() {
    if (this.connection) {
      return this.connection;
    }

    const newConnection = await amqp.connect({
      hostname: process.env.RABBITMQ_HOST,
      port: parseInt(process.env.RABBITMQ_PORT),
      username: process.env.RABBITMQ_USER,
      password: process.env.RABBITMQ_PASSWORD,
    });

    this.connection = newConnection;

    return newConnection;
  }

  async getChannel() {
    if (this.channel) {
      return this.channel;
    }

    const currConnection = await this.getConnection();
    const newChannel = await currConnection.createChannel();

    await newChannel.assertQueue(this.queue, {
      durable: true,
      autoDelete: false,
    });

    return newChannel;
  }

  async pushToQueue(message: unknown) {
    const stringMessage = JSON.stringify(message);

    const channel = await this.getChannel();

    return channel.sendToQueue(this.queue, Buffer.from(stringMessage));
  }

  async consume(onMessage: (msg: ConsumeMessage | null) => void) {
    const channel = await this.getChannel();

    return channel.consume(this.queue, onMessage, { noAck: true });
  }
}

export default new RabbitMQService();
