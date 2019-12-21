import React, { Component } from 'react';
import classes from './Filter.module.sass';

export default class Filter extends Component {

  state = {
    filter: {
      'all': true,
      0: true,
      1: true,
      2: true,
      3: true,
    },
  }

  filterChange = (event) => {
    const { value, checked } = event.target;

    this.setState((prevState) => {
      const { filter } = prevState;

      const keys = Object.keys(filter);
      const isAllChecked = (filter) => {
        for (const key in filter) {
          if (key !== 'all' && !filter[key]) {
            return false;
          }
        }

        return true;
      };

      if (value === 'all') {
        const newFilter = {};

        keys.forEach((key) => newFilter[key] = checked);
        return {
          filter: newFilter,
        };
      } else {
        const newFilter = { ...filter, [value]: checked };

        return {
          filter: {
            ...newFilter,
            'all': isAllChecked(newFilter),
          },
        };
      }
    });
  }

  render() {

    const { filterBlock, filterBlockTitle, filterBlockList, filterBlockListitem } = classes;

    return (
      <div className={filterBlock}>
        <h3 className={filterBlockTitle}>Количество пересадок</h3>

        <div className={filterBlockList}>
          <label className={filterBlockListitem}>
            <input type='checkbox' checked={this.state.filter['all']} value={'all'} onChange={this.filterChange} />
            Все
          </label>

          <label className={filterBlockListitem}>
            <input type='checkbox' checked={this.state.filter[0]} value={0} onChange={this.filterChange} />
            Без пересадок
          </label>

          <label className={filterBlockListitem}>
            <input type='checkbox' checked={this.state.filter[1]} value={1} onChange={this.filterChange} />
            1 пересадка
          </label>

          <label className={filterBlockListitem}>
            <input type='checkbox' checked={this.state.filter[2]} value={2} onChange={this.filterChange} />
            2 пересадки
          </label>

          <label className={filterBlockListitem}>
            <input type='checkbox' checked={this.state.filter[3]} value={3} onChange={this.filterChange} />
            3 пересадки
          </label>
        </div>
      </div>
    );
  }
}
