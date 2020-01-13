import React, { useContext } from 'react';
import classes from './Flight.module.sass';
import FlightRow from './FlightRow/FlightRow';
import { useTranslation } from 'react-i18next';
import { FilterContext } from '../../App';

interface IFlight {
  ticket: ITicket
}
interface ITicket {
  price: number,
  carrier: string,
  segments: ISegment[],
  id: number,
}

interface ISegment {
  origin: string,
    destination: string,
    date: string,
    duration: number,
    stops: string[],
}

const Flight = ({ ticket: { price, carrier, segments } }: IFlight) => {
  const { Card, priceClass, companyLogo, middle } = classes;
  const { t } = useTranslation();
  const { state } = useContext<any>(FilterContext);

  const filterByUser = (segments: ISegment[]) => {
    return segments.filter(({ stops }) => {
      return state[stops.length.toString()] || state['all'];
    });
  };

  const newSegments = filterByUser(segments);

  if (newSegments.length === 0) return <></>;

  return (
    <div className={Card}>
      <div className={priceClass}>{price.toLocaleString('ru')} {t('price')}</div>
      <div className={middle}></div>
      <div className={companyLogo}>
        <img src={`https://pics.avs.io/110/36/${carrier}.png`} alt={`Logo ${carrier}`} />
      </div>

      {newSegments.map((segment: ISegment, key: number) => {
        return <FlightRow key={key} item={segment} />;
      })}
    </div>
  );
};

export default Flight;
