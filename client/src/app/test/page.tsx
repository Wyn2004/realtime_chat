"use client";
import { Chat, Input, SignUp } from "@/components";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Home() {
  // connect nằm ở phía client
  socket.on("connect", () => {
    console.log("connected to server: ", socket.id);
  });

  // send data to server với tên là client_ready
  socket.emit("client_ready", "helloooo");

  const handleSendMessage = () => {
    socket.emit("send_message", "hello");
  };

  //  handle receive send_message
  socket.on("send_message", (data) => {
    console.log("send_message: ", data);
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Chat />
      <Input />
      <SignUp />
      <button
        className="bg-white text-black p-2 rounded-md"
        onClick={handleSendMessage}
      >
        Send mess
      </button>
    </div>
  );
}
