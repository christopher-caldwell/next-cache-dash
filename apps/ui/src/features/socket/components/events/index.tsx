import { FC } from 'react';

export const Events: FC<EventsProps> = ({ events }) => {
  return (
    <ul>
      {events.map((event, index) => (
        <li key={index}>{event}</li>
      ))}
    </ul>
  );
};

type EventsProps = {
  events: string[];
};
