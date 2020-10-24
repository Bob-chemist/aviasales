import React, { useState, useEffect, MouseEvent, FC } from 'react';
import classes from './FlightList.module.sass';
import Flight from '../../components/Flight';
import API from '../../API';
import Loader from '../../components/Loader';
import ErrorIndicator from '../../components/ErrorIndicator';
import { useTranslation } from 'react-i18next';
import { AxiosError, AxiosResponse } from 'axios';

export interface Ticket {
  price: number;
  carrier: string;
  segments: Segment[];
  id: number;
}

export interface Segment {
  origin: string;
  destination: string;
  date: string;
  duration: number;
  stops: string[];
}

const FlightList: FC = () => {
  const [activeButton, setActiveButton] = useState('price');
  const [tickets, setTickets] = useState<Ticket[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { t } = useTranslation();

  const prepareData = (arr: Ticket[]): Ticket[] => {
    return sortByPrice(sortByTime(arr.map((ticket: Ticket, id: number) => ({ ...ticket, id }))));
  };

  useEffect(() => {
    API.get('search')
      .then(({ data }: AxiosResponse<{searchId: string}>) => data.searchId)
      .then((id) => API.get(`tickets?searchId=${id}`))
      .then(({ data: { tickets } }: {data: {tickets: Ticket[]}}) => {

        if (tickets && tickets.length) {
          if (tickets.length > 5) {
            tickets.length = 5;
          }

          setTickets(prepareData(tickets));
          setLoading(false);
        }
      })
      .catch((error: AxiosError) => {
        setError(error);
        setLoading(false);
        console.log(error.message);
      });
    // eslint-disable-next-line
  }, []);

  const sortByPrice = (arr: Ticket[]): Ticket[] => {
    return arr.sort((a: Ticket, b: Ticket) => a.price - b.price);
  };

  const sortByTime = (arr: Ticket[]): Ticket[] => {
    return arr.sort((a: Ticket, b: Ticket) => {
      a.segments.sort((x: Segment, y: Segment) => x.duration - y.duration);
      b.segments.sort((x: Segment, y: Segment) => x.duration - y.duration);
      return a.segments[0].duration - b.segments[0].duration;
    });
  };

  const buttonHandler = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const { value } = event.currentTarget;

    if (activeButton === value) return;
    setActiveButton(value);
    setTickets(value === 'price' ? sortByPrice(tickets) : sortByTime(tickets));
  };

  const { List, ChoiceButtons, ChoiceButton, active } = classes;
  let { left, right } = classes;

  if (activeButton === 'price') {
    left = `${left} ${active}`;
  } else {
    right = `${right} ${active}`;
  }

  if (error) return <ErrorIndicator info={error.message} />;

  return (
    <div className={List}>
      <div className={ChoiceButtons}>
        <button className={`${ChoiceButton} ${left}`} value='price'
          onClick={buttonHandler}>
          {t('cheap')}
        </button>
        <button className={`${ChoiceButton} ${right}`} value='duration'
          onClick={buttonHandler}>
          {t('fast')}
        </button>
      </div>
      {loading ? <Loader /> : (tickets as Ticket[]).map((ticket: Ticket) => {
        return <Flight ticket={ticket} key={ticket.id} />;
      })}

    </div>
  );
};

export default FlightList;
