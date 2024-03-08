import { auth } from "@local/auth";
import { client } from "@local/eden";
import { Message, messageValidator } from "@local/validators";

import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { chatId, text } = await req.json();
    console.log("hi");
    if (!chatId) throw new Error("ChatId is required");
    const session = await auth();

    const [userId1, userId2] = chatId.split("--");
    if (!session) {
      throw new Error("You are not logged in");
    }

    const timestamp = Date.now();
    if (session.user.id !== userId1 && session.user.id !== userId2) {
      return new Response("Unauthorized", { status: 401 });
    }
    const friendId = session.user.id === userId1 ? userId2 : userId1;
    const idNumber = Math.random().toString(16).slice(2);
    const messageData: Message = {
      senderId: session.user.id,
      text,
      timestamp: timestamp,
    };
    const message = messageValidator.parse(messageData);

    await pusherServer.trigger(
      toPusherKey(`chat:${chatId}`),
      "incoming-message",
      message,
    );
    await pusherServer.trigger(
      toPusherKey(`user:${friendId}:chats`),
      "new-message",
      {
        ...message,
        senderName: session.user.name,
      },
    );
    console.log("sending message", message);
    await client.api.inbox[`${chatId}`]?.post({ message });

    return new Response("success", { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return new Response(error.message, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}