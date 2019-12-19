import React, { Component } from 'react';
import classes from './FlightList.module.sass';
import Flight from '../../components/Flight';
import Axios from 'axios';
import Loader from '../../components/Loader';
import ErrorIndicator from '../../components/ErrorIndicator/ErrorIndicator';

export default class FlightList extends Component {
  state = {
    activeButton: 'price',
    tickets: [],
    loading: true,
    error: null,
  }

  componentDidMount() {
    Axios.get('https://front-test.beta.aviasales.ru/search')
      .then(({ data }) => data.searchId)
      .then((id) => Axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${id}`))
      .then(({ data }) => {
        const { tickets } = data;

        // if (tickets && tickets.length) {
        //   if (tickets.length > 30) {
        //     tickets.length = 30;
        //   }

        this.setState({
          tickets: this.sortByPrice(tickets),
          loading: false,
        });
        // }
      })
      .catch((error) => {
        this.setState({
          error,
          loading: false,
        });
        console.log(error.message);
      });

  }

  sortByPrice = (arr) => {
    return arr.sort((a, b) => a.price - b.price);
  }

  sortByTime = (arr) => {
    return arr.sort((a, b) => {
      a.segments.sort((x, y) => x.duration - y.duration);
      b.segments.sort((x, y) => x.duration - y.duration);
      return a.segments[0].duration - b.segments[0].duration;
    });
  }

  buttonHandler = (event) => {
    event.preventDefault();

    const { value } = event.target;
    const { tickets, activeButton } = this.state;

    if (activeButton === value) return;

    this.setState({
      activeButton: value,
      tickets: value === 'price' ? this.sortByPrice(tickets) : this.sortByTime(tickets),
    });
  }

  render() {
    const { activeButton, tickets, error, loading } = this.state;
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
            onClick={this.buttonHandler}>
            самый дешевый
          </button>
          <button className={`${ChoiceButton} ${right}`} value='duration'
            onClick={this.buttonHandler}>
            самый быстрый
          </button>
        </div>
        {loading ? <Loader /> : tickets.map((ticket, index) => {
          return <Flight ticket={ticket} key={index} />;
        })}

      </div>
    );
  }
}
