import React, { useContext } from 'react';
import classes from './Flight.module.sass';
import FlightRow from './FlightRow/FlightRow';
import { useTranslation } from 'react-i18next';
import { FilterContext } from '../../App';
import { Ticket, Segment } from '../../containers/FlightsList';

interface FlightProps {
  ticket: Ticket;
}

const Flight = ({ ticket: { price, carrier, segments } }: FlightProps): JSX.Element => {
  const { Card, priceClass, companyLogo, middle } = classes;
  const { t } = useTranslation();
  const { state } = useContext(FilterContext);

  const filterByUser = (segments: Segment[]): Segment[] => {
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

      {newSegments.map((segment: Segment, key: number) => {
        return <FlightRow key={key} segment={segment} />;
      })}
    </div>
  );
};

export default Flight;
