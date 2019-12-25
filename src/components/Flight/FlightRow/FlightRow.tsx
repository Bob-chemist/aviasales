import React from 'react';
import classes from './FlightRow.module.sass';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const landings = (num: number) => {
    switch (num) {
      case 1: return t('1connection');
      case 2: return t('2connections');
      case 3: return t('3connections');
      default: return t('0connections');
    }
  };

  const flightTime = (min: number) => {
    return `${Math.floor(min / 60)}${t('hours')} ${min % 60}${t('minutes')}`;
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
          {t('duration')}
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
