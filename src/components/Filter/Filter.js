import React, { Component } from 'react';
import classes from './Filter.module.sass';

export default class Filter extends Component {

  render() {

    const { filter, filterTitle, filterList, filterListitem } = classes;

    return (
      <div className={filter}>
        <h3 className={filterTitle}>Количество пересадок</h3>

        <div className={filterList}>
          <label className={filterListitem}><input type='checkbox' />Все</label>
          <label className={filterListitem}><input type='checkbox' />Без пересадок</label>
          <label className={filterListitem}><input type='checkbox' />1 пересадка</label>
          <label className={filterListitem}><input type='checkbox' />2 пересадки</label>
          <label className={filterListitem}><input type='checkbox' />3 пересадки</label>
        </div>
      </div>
    );
  }
}
