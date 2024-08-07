import { FC } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import { SocketDemo } from '../features/socket';

export const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SocketDemo />} />
    </Routes>
  );
};
