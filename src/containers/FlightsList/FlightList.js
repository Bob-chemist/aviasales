import React, { useState, useEffect } from 'react';
import classes from './FlightList.module.sass';
import Flight from '../../components/Flight';
import API from '../../API';
import Loader from '../../components/Loader';
import ErrorIndicator from '../../components/ErrorIndicator';

const FlightList = () => {
  const [ activeButton, setActiveButton ] = useState('price');
  const [ tickets, setTickets ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    API.get('search')
      .then(({ data }) => data.searchId)
      .then((id) => API.get(`tickets?searchId=${id}`))
      .then(({ data: { tickets } }) => {

        if (tickets && tickets.length) {
          if (tickets.length > 5) {
            tickets.length = 5;
          }

          setTickets(sortByPrice(tickets));
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.log(error.message);
      });

  }, []);

  const sortByPrice = (arr) => {
    return arr.sort((a, b) => a.price - b.price);
  };

  const sortByTime = (arr) => {
    return arr.sort((a, b) => {
      a.segments.sort((x, y) => x.duration - y.duration);
      b.segments.sort((x, y) => x.duration - y.duration);
      return a.segments[0].duration - b.segments[0].duration;
    });
  };

  const buttonHandler = (event) => {
    event.preventDefault();

    const { value } = event.target;

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
          самый дешевый
        </button>
        <button className={`${ChoiceButton} ${right}`} value='duration'
          onClick={buttonHandler}>
          самый быстрый
        </button>
      </div>
      {loading ? <Loader /> : tickets.map((ticket, index) => {
        return <Flight ticket={ticket} key={index} />;
      })}

    </div>
  );
};

export default FlightList;
