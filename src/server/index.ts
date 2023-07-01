import { createServer } from "http";
import { Server, Socket } from "socket.io";

const server = createServer();
const io = new Server(server, {
  //...
});

io.on("connection", (socket: Socket) => {
  console.log("new connection");
  console.log(socket);
});

server.listen(3000);
