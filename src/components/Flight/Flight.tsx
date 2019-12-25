import React from 'react';
import classes from './Flight.module.sass';
import FlightRow from './FlightRow/FlightRow';
import { useTranslation } from 'react-i18next';

interface IFlight {
  ticket: {
    price: number,
    carrier: string,
    segments: ISegment[],
    id: number
  }
}

interface ISegment {
  origin: string,
    destination: string,
    date: string,
    duration: number,
    stops: string[],
}

const Flight = ({ ticket: { price, carrier, segments } }: IFlight) => {
  const { Card, priceClass, companyLogo } = classes;
  const { t } = useTranslation();

  return (
    <div className={Card}>
      <div className={priceClass}>{price.toLocaleString('ru')} {t('price')}</div>
      <div></div>
      <div className={companyLogo}>
        <img src={`http://pics.avs.io/110/36/${carrier}.png`} alt={`Logo ${carrier}`} />
      </div>

      {segments.map((segment: ISegment, key: number) => {
        return <FlightRow key={key} item={segment} />;
      })}
    </div>
  );
};

export default Flight;
