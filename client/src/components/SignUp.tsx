/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket } from "socket.io-client";

const SignUp = ({
  user,
  input,
  setInput,
  socket,
}: {
  user: any;
  input: any;
  setInput: any;
  socket: Socket;
}) => {
  const addUser = () => {
    if (input) {
      user.current = { name: input, id: socket.id };
      console.log("id: ", socket.id);
      socket.emit("new_user", { name: input, id: socket.id });
      setInput("");
    }
  };
  return (
    <div className="w-full h-full flex flex=col items-center justify-center">
      <div className="text-center grid grid-rows-3 gap-2 gradient p-8 rounded-md">
        <h1 className="text-6xl font-bold text-white">Chat App</h1>
        <h2 className="text-2xl text-white">Enter you name to join</h2>
        <input
          type="text"
          className="text-2xl text-center rounded-md p-2 my-2 text-blue-400 placeholder-blue-300 focus:outline-none"
          placeholder="Username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addUser()}
        />
        <button
          className={`text-xl w-full text-white font-bold py-2 px-3 rounded-md ${
            input ? "bg-sky-400" : "bg-slate-400"
          }`}
          disabled={!input}
          onClick={addUser}
        >
          Join Chat
        </button>
      </div>
    </div>
  );
};

export default SignUp;
