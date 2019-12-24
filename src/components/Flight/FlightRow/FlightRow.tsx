import React from 'react';
import classes from './FlightRow.module.sass';

interface Item {
  item: {
    origin: string,
    destination: string,
    date: string,
    duration: number,
    stops: string[],
  }
}

const FlightRow = ({ item: { origin, destination, date, duration, stops } }: Item) => {
  const { title, content } = classes;

  const landings = (num: number) => {
    switch (num) {
      case 1: return '1 пересадка';
      case 2:
      case 3: return `${num} пересадки`;
      default: return 'без пересадок';
    }
  };

  const flightTime = (min: number) => {
    return `${Math.floor(min / 60)}ч ${min % 60}м`;
  };

  const departureArrival = (date: string, duration: number) => {
    const departure = new Date(date).toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });
    const arrival = new Date(new Date(date).getTime() + duration * 60 * 1000)
      .toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });

    return departure + ' - ' + arrival;
  };

  return (
    <>
      <div>
        <div className={title}>
          {`${origin} ${destination}`}
        </div>
        <div className={content}>{departureArrival(date, duration)}</div>
      </div>

      <div>
        <div className={title}>
          в пути
        </div >
        <div className={content}>
          {flightTime(duration)}
        </div>

      </div>

      <div>
        <div className={title}>
          {landings(stops.length)}
        </div>
        <div className={content}>
          {stops.join(', ')}
        </div>

      </div>
    </>
  );
};

export default FlightRow;
