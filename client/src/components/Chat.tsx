import Typing from "./Typing";
import ServerMessage from "./ServerMessage";
import Message from "./Message";
import { useEffect, useRef } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Chat = ({
  chat,
  user,
  typing,
}: {
  chat: any;
  user: any;
  typing: any;
}) => {
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scroller.current) {
      scroller.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [chat]);

  return (
    <div className="h-full pb-12 md:p-4">
      <div className="w-full h-full max-h-screen rounded-md overflow-y-auto gradient pt-2 md:pt-6">
        {chat.map((msg: any, index: number) => {
          return msg.type === "server" ? (
            <ServerMessage key={index} content={msg.content} />
          ) : (
            <Message
              user={msg.user}
              key={index}
              content={msg.content}
              own={msg.user.id === user.id}
              type={msg.type}
            />
          );
        })}
        {typing.length > 0 && <Typing user={typing[0]} />}
        <div ref={scroller} className="pb-2 md:pb-6" />
      </div>
    </div>
  );
};

export default Chat;
