import React, { useState, useEffect, MouseEvent } from 'react';
import classes from './FlightList.module.sass';
import Flight from '../../components/Flight';
import API from '../../API';
import Loader from '../../components/Loader';
import ErrorIndicator from '../../components/ErrorIndicator';

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

const FlightList = () => {
  const [ activeButton, setActiveButton ] = useState('price');
  const [ tickets, setTickets ] = useState<ITicket[] | []>([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<Error | null>(null);

  const prepareData = (arr: ITicket[]) => {
    return sortByPrice(sortByTime(arr.map((ticket: ITicket, id: number) => ({ ...ticket, id }))));
  };

  useEffect(() => {
    API.get('search')
      .then(({ data }) => data.searchId)
      .then((id) => API.get(`tickets?searchId=${id}`))
      .then(({ data: { tickets } }) => {

        if (tickets && tickets.length) {
          if (tickets.length > 5) {
            tickets.length = 5;
          }

          setTickets(prepareData(tickets));
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.log(error.message);
      });
    // eslint-disable-next-line
  }, []);

  const sortByPrice = (arr: ITicket[]) => {
    return arr.sort((a: ITicket, b: ITicket) => a.price - b.price);
  };

  const sortByTime = (arr: ITicket[]) => {
    return arr.sort((a: ITicket, b: ITicket) => {
      a.segments.sort((x: ISegment, y: ISegment) => x.duration - y.duration);
      b.segments.sort((x: ISegment, y: ISegment) => x.duration - y.duration);
      return a.segments[0].duration - b.segments[0].duration;
    });
  };

  const buttonHandler = (event: MouseEvent<HTMLButtonElement>) => {
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

  if (error) return <ErrorIndicator info={error!.message} />;

  return (
    <div className={List}>
      <div className={ChoiceButtons}>
        <button className={`${ChoiceButton} ${left}`} value='price'
          onClick={buttonHandler}>
          самый дешевый
        </button>
        <button className={`${ChoiceButton} ${right}`} value='duration'
          onClick={buttonHandler}>
          самый быстрый
        </button>
      </div>
      {loading ? <Loader /> : (tickets as ITicket[]).map((ticket: ITicket) => {
        return <Flight ticket={ticket} key={ticket.id} />;
      })}

    </div>
  );
};

export default FlightList;
