"use client";

import * as React from "react";
import Image from "next/image";
import { format, set } from "date-fns";

import { client } from "@local/eden";
import { Message, messageValidator } from "@local/validators";

import { cn } from "@/lib/utils";

interface MessagesProps {
  initialMessages: Message[];
  sessionId: string;
  chatId: string;
  teacherName: string;
}

const Messages: React.FC<MessagesProps> = ({
  initialMessages,
  sessionId,
  chatId,
  teacherName,
}) => {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  React.useEffect(() => {
    const chat = client.api.inbox[`${chatId}`]?.subscribe();
    const messageHandler = (message: Message) => {
      setMessages((prev) => [message, ...prev]);
    };
    chat?.subscribe((message) => {
      messageHandler(message.data as Message);
    });

    return () => {
      chat?.close();
    };
  }, [chatId]);

  const scrollDownRef = React.useRef<HTMLDivElement | null>(null);

  const formatTimestamp = (timestamp: number) => {
    return format(timestamp, "HH:mm");
  };

  return (
    <div
      id="messages"
      className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex h-full flex-1 flex-col-reverse gap-4 overflow-y-auto p-3"
    >
      <div ref={scrollDownRef} />
      {messages &&
        messages.map((message, index) => {
          const isCurrentUser = message.senderId === sessionId;

          const hasNextMessageFromSameUser =
            messages[index - 1]?.senderId === messages[index]?.senderId;
          return (
            <div
              className="chat-message"
              key={`${message.id}-${message.timestamp}`}
            >
              <div
                className={cn("flex items-end", {
                  "justify-end": isCurrentUser,
                })}
              >
                <div
                  className={cn(
                    "mx-2 flex max-w-xs flex-col space-y-2 text-base",
                    {
                      "order-1 items-end": isCurrentUser,
                      "order-2 items-start": !isCurrentUser,
                    },
                  )}
                >
                  <span
                    className={cn("inline-block rounded-lg px-4 py-2", {
                      "bg-indigo-600 text-white": isCurrentUser,
                      "bg-gray-200 text-gray-900": !isCurrentUser,
                      "rounded-br-none":
                        !hasNextMessageFromSameUser && isCurrentUser,
                      "rounded-bl-none":
                        !hasNextMessageFromSameUser && !isCurrentUser,
                    })}
                  >
                    {message.text}{" "}
                    <span className="ml-2 text-xs text-gray-400">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </span>
                </div>

                <div
                  className={cn("relative h-6 w-6", {
                    "order-2": isCurrentUser,
                    "order-1": !isCurrentUser,
                    invisible: hasNextMessageFromSameUser,
                  })}
                ></div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Messages;
