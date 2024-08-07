import React, { FC, FormEventHandler, useState } from 'react';

import { socket } from '../../utils/socket';

export const CreateEvent: FC = () => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit('event:create', value, () => {
      setIsLoading(false);
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <input onChange={(e) => setValue(e.target.value)} />

      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
};
