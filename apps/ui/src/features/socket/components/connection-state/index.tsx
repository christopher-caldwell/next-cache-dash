import { FC } from 'react';

export const ConnectionState: FC<ConnectionState> = ({ isConnected }) => {
  return <p>State: {'' + isConnected}</p>;
};

type ConnectionState = {
  isConnected?: boolean;
};
