import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { watch } from 'fs';
import { resolve } from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: 'http://localhost:4200',
  },
});

const events = [];
const files: Record<string, string> = {};

const createEvent = (data: string) => {
  console.log(data);
  events.push(data);

  io.emit('event:read', events);
};

const readEvents = () => {
  io.emit('event:read', events);
};

const rootFilePath = resolve(process.cwd(), 'temp');

io.on('connection', (socket) => {
  socket.on('event:create', createEvent);
  socket.on('event:read', readEvents);
  watch(rootFilePath, (event, filename) => {
    console.log({ event, filename });
    files[filename] = filename;
    io.emit('file:read', Object.values(files));
  });
  // socket.on("todo:update", updateTodo);
  // socket.on("todo:delete", deleteTodo);
  // socket.on("todo:list", listTodo);
});

console.log('Listening on http://localhost:5001');
httpServer.listen(5001);
