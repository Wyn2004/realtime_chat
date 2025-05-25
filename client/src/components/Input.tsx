/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { send, upload } from "@/assets/index";
import { useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const Input = ({
  user,
  socket,
  setChat,
}: {
  user: string;
  socket: Socket;
  setChat: (prev: any) => void;
}) => {
  const [input, setInput] = useState("");
  const uploadInput = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (input) {
      const msg = {
        id: uuidv4(),
        user: user,
        content: input,
        type: "text",
        time: new Date().toLocaleTimeString(),
      };
      setChat((prev: any) => [...prev, msg]);
      setInput("");
      socket.emit("send_message", msg);
      socket.emit("user_typing", {
        user: user,
        typing: false,
      });
    }
  };

  const userTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    socket.emit("user_typing", {
      user: user,
      typing: e.target.value ? true : false,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type === "image/png" || file?.type === "image/jpeg") {
      const img = URL.createObjectURL(file);
      const msg = {
        id: uuidv4(),
        user: user,
        content: img,
        type: "image",
        time: new Date().toLocaleTimeString(),
      };
      socket.emit("send_message", msg);
      setChat((prev: any) => [...prev, msg]);
    }
  };

  return (
    <div className="w-full absolute bottom-0 text-xl grid grid-cols-5 gap-3 gradient md:bg-none md:text-3xl md:flex md:justify-center md:relative">
      <input
        className="focus:outline-none rounded-2xl p-3 text-white placeholder-slate-200 col-span-4 gradient md:w-6/12 md:mr-3"
        type="text"
        placeholder="Enter your message"
        value={input}
        onChange={(e) => userTyping(e)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <input
        type="file"
        ref={uploadInput}
        className="hidden"
        onChange={handleImageUpload}
      />
      <button
        className="w-full py-2 px-3 bg-sky-400 text-white font-fold rounded-md text-xl gradient md:w-1/12 md:text-2xl"
        onClick={sendMessage}
      >
        <Image
          src={send}
          className="w-6 md:w-12 mx-auto"
          alt="send"
          height={20}
          width={20}
        />
      </button>
      <button
        className="w-full py-2 px-3 bg-sky-400 text-white font-fold rounded-md text-xl gradient md:w-1/12 md:text-2xl"
        onClick={() => uploadInput.current?.click()}
      >
        <Image
          src={upload}
          className="w-6 md:w-12 mx-auto"
          alt="upload"
          height={20}
          width={20}
        />
      </button>
    </div>
  );
};

export default Input;
