/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Chat, Input, SignUp } from "@/components";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Home() {
  const [chat, setChat] = useState<any[]>([]);
  const [input, setInput] = useState<any>("");
  const [typing, setTyping] = useState<string[]>([]);

  useEffect(() => {
    socket.on("receive_message", (data: any) => {
      setChat((prev: any) => [...prev, data]);
    });

    socket.on("user_typing", (data) => {
      if (!user.current) return;
      console.log("asdasd", data);
      setTyping((prev) => {
        const isTyping = prev.includes(data.user.name);

        if (isTyping && data.typing === true) {
          return prev; // Đã có rồi, không thêm lại
        }

        if (data.typing === false) {
          // Xoá nếu không còn gõ nữa
          return prev.filter((name) => name !== data.user.name);
        }

        // Thêm nếu chưa có và đang gõ
        return [...prev, data.user.name];
      });
    });

    socket.on("new_user", (newUser) => {
      if (!user.current) return;
      setChat((prev) => [
        ...prev,
        { content: `${newUser.name} joined`, type: "server", user: newUser },
      ]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("user_typing");
      socket.off("new_user");
    };
  }, []);

  const user = useRef(null);

  return (
    <div className="h-screen max-h-screen max-w-screen mx-auto md:container md:p-20 md:pt:4">
      {user.current ? (
        <>
          <Chat chat={chat} user={user.current} typing={typing} />
          <Input setChat={setChat} user={user.current} socket={socket} />
        </>
      ) : (
        <SignUp user={user} input={input} setInput={setInput} socket={socket} />
      )}
    </div>
  );
}
