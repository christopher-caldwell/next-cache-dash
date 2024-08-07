import React, { FC } from 'react';

import { socket } from '../../utils/socket';

export const ConnectionManager: FC = () => {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </>
  );
};
