import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { watch, statSync, readdirSync } from 'fs';
import { resolve } from 'path';
import dayjs from 'dayjs';
import numeral from 'numeral';

import { rootFilePath, seedCache } from './files';
import { FileStatsCache } from './utils/cache';

seedCache();
const app = express();
app.get('/test', (req, res) => {
  const query = req.query ?? {};
  const { page = 1 } = query;
  res.send('Hello World - ' + page);
});
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:4200',
  },
});

const events = [];
const createEvent = (data: string) => {
  console.log(data);
  events.push(data);

  io.emit('event:read', events);
};

const readEvents = () => {
  io.emit('event:read', events);
};

io.on('connection', (socket) => {
  const initialFileKeys = FileStatsCache.keys();
  io.emit('file:read', Object.values(FileStatsCache.mget(initialFileKeys)));
  socket.on('event:create', createEvent);
  socket.on('event:read', readEvents);
  watch(rootFilePath, (event, filename) => {
    const targetFilePath = resolve(rootFilePath, filename);
    const stats = statSync(targetFilePath);
    console.log({ filename, stats });
    FileStatsCache.set(
      filename,
      filename +
        ' - ' +
        numeral(stats.size).format('0.00b') +
        ' - ' +
        dayjs(stats.mtime).format('YYYY-MM-DD HH:mm:ss')
    );
    const fileKeys = FileStatsCache.keys();
    io.emit('file:read', Object.values(FileStatsCache.mget(fileKeys)));
  });
  // socket.on("todo:update", updateTodo);
  // socket.on("todo:delete", deleteTodo);
  // socket.on("todo:list", listTodo);
});

console.log('Listening on http://localhost:5001');
httpServer.listen(5001);
