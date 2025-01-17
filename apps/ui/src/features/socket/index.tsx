import React, { useState, useEffect, FC } from 'react';

import { socket } from './utils/socket';

import {
  ConnectionState,
  Events,
  CreateEvent,
  ConnectionManager,
} from './components';
import { Files } from './components/files';

export const SocketDemo: FC = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<string[]>([]);
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: string) {
      setFooEvents((previous) => [...previous, value]);
    }

    function onFileEvent(files: string[]) {
      setFiles(files);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('event:read', onFooEvent);
    socket.on('file:read', onFileEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('event:read', onFooEvent);
    };
  }, []);

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <Events events={fooEvents} />
      <Files files={files} />
      <ConnectionManager />
      <CreateEvent />
    </div>
  );
};
