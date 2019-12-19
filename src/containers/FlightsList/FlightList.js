import React, { Component } from 'react';
import classes from './FlightList.module.sass';
import Flight from '../../components/Flight';
import Axios from 'axios';

export default class FlightList extends Component {
  state = {
    activeButton: 'cheap',
    tickets: [],
  }

  componentDidMount() {
    Axios.get('https://front-test.beta.aviasales.ru/search')
      .then(({ data }) => data.searchId)
      .then((id) => Axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${id}`))
      .then(({ data }) => {
        const { tickets } = data;

        if (tickets && tickets.length) {
          if (tickets.length > 30) {
            tickets.length = 30;
          }

          this.setState({ tickets });
        }
      })
      .catch((err) => console.log(err.message));

  }

  buttonHandler = (event) => {
    event.preventDefault();
    this.setState({ activeButton: event.target.value });
  }

  render() {
    const { activeButton, tickets } = this.state;
    const { List, ChoiceButtons, ChoiceButton, active } = classes;
    let { left, right } = classes;

    if (activeButton === 'cheap') {
      left = `${left} ${active}`;
    } else {
      right = `${right} ${active}`;
    }

    return (
      <div className={List}>
        <div className={ChoiceButtons}>
          <button className={`${ChoiceButton} ${left}`} value='cheap'
            onClick={this.buttonHandler}>
            самый дешевый
          </button>
          <button className={`${ChoiceButton} ${right}`} value='fast'
            onClick={this.buttonHandler}>
            самый быстрый
          </button>
        </div>
        {tickets.map((ticket, index) => {
          return <Flight ticket={ticket} key={index} />;
        })}

      </div>
    );
  }
}
