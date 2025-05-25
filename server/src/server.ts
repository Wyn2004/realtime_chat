import { log } from "console";
import express from "express";
import * as http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

//  create socket server
const io = new Server(server, { cors: { origin: "*" } });

// //  handle connection sockets, connection nằm ở phía server
// io.on("connection", (socket) => {
//   console.log("a user connected: " + socket.id);

//   //  handle event client_ready
//   socket.on("client_ready", (data) => {
//     console.log("server_ready: ", socket.id);
//     console.log("client ready: ", data);
//   });

//   //  handle receive send_message
//   socket.on("send_message", (data) => {
//     console.log("send_message: ", data);
//     //  handle send event to client
//     socket.emit("send_message", "hello from server");
//   });
// });

io.on("connection", (socket) => {
  console.log("id: ", socket.id);
  //  get send_message
  socket.on("send_message", (data) => {
    console.log("send_message: ", data);
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("new_user", (data) => {
    console.log("new_user: ", data);
    socket.broadcast.emit("new_user", data);
  });

  socket.on("user_typing", (data) => {
    console.log("user_typing: ", data);
    socket.broadcast.emit("user_typing", data);
  });
});

server.listen(3001, () => {
  console.log("server is running on port 3001s");
});
