import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: 'http://localhost:4200',
  },
});

const events = [];
const createEvent = (data: any) => {
  console.log(data);
  events.push(data);

  io.emit('event:read', events);
};

const readEventsEvent = () => {
  io.emit('event:read', events);
};

io.on('connection', (socket) => {
  socket.on('event:create', createEvent);
  socket.on('event:read', readEventsEvent);
  // socket.on("todo:update", updateTodo);
  // socket.on("todo:delete", deleteTodo);
  // socket.on("todo:list", listTodo);
  // setInterval(() => {
  //   socket.emit('message', 'Hello World');
  // });
});

httpServer.listen(5001);
