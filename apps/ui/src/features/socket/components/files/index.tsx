import { FC } from 'react';

export const Files: FC<EventsProps> = ({ files }) => {
  return (
    <ul>
      {files.map((event, index) => (
        <li key={index}>{event}</li>
      ))}
    </ul>
  );
};

type EventsProps = {
  files: string[];
};
