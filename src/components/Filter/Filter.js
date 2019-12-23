import React, { useState } from 'react';
import classes from './Filter.module.sass';

const Filter = () => {

  const [ filter, setFilter ] = useState({
    'all': true,
    0: true,
    1: true,
    2: true,
    3: true,
  });

  const filterChange = (event) => {
    const { value, checked } = event.target;

    setFilter(() => {
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
          ...newFilter,
        };
      } else {
        const newFilter = { ...filter, [value]: checked };

        return {
          ...newFilter,
          'all': isAllChecked(newFilter),
        };
      }
    });
  };

  const { filterBlock, filterBlockTitle, filterBlockList, filterBlockListitem } = classes;

  return (
    <div className={filterBlock}>
      <h3 className={filterBlockTitle}>Количество пересадок</h3>

      <div className={filterBlockList}>
        <label className={filterBlockListitem}>
          <input type='checkbox' checked={filter['all']} value={'all'} onChange={filterChange} />
          Все
        </label>

        <label className={filterBlockListitem}>
          <input type='checkbox' checked={filter[0]} value={0} onChange={filterChange} />
          Без пересадок
        </label>

        <label className={filterBlockListitem}>
          <input type='checkbox' checked={filter[1]} value={1} onChange={filterChange} />
          1 пересадка
        </label>

        <label className={filterBlockListitem}>
          <input type='checkbox' checked={filter[2]} value={2} onChange={filterChange} />
          2 пересадки
        </label>

        <label className={filterBlockListitem}>
          <input type='checkbox' checked={filter[3]} value={3} onChange={filterChange} />
          3 пересадки
        </label>
      </div>
    </div>
  );
};

export default Filter;
