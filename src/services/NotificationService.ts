import { NewMessageInput } from "../resolvers/MessageResolver";
import { prismaClient } from "../prismaClient";

class NotificationService {
  async save(notificationData: { message: string; userId: number }) {
    const { message, userId } = notificationData;

    const notification = await prismaClient.notification.create({
      data: { message, user: { connect: { id: userId } } },
    });

    console.log(
      `Notification created -> id:${notification.id} for user id:${notification.userId}`
    );

    return notification;
  }

  async sendPush(message: string) {
    console.log(`Push notification sent -> ${message}`);
  }

  async processNotification(messageData: NewMessageInput) {
    const { userId, firstName } = messageData;

    const message = `${firstName} sent you a message!`;

    try {
      await this.save({ message, userId });
      await this.sendPush(message);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default NotificationService;
