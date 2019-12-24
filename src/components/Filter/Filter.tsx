import React, { useState } from 'react';
import classes from './Filter.module.sass';

interface IFilter {
  [key: string]: boolean,
  'all': boolean,
  '0': boolean,
  '1': boolean,
  '2': boolean,
  '3': boolean,
}

interface ILanding {
  [key: string]: string
}

const Filter = () => {
  const [filter, setFilter] = useState<IFilter>({
    'all': true,
    '0': true,
    '1': true,
    '2': true,
    '3': true,
  });

  const filterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    const getNewFilter = () => {
      const keys = Object.keys(filter);
      const isAllChecked = (filter: IFilter) => {
        for (const key in filter) {
          const bool: boolean = filter[key];

          if (key !== 'all' && !bool) {
            return false;
          }
        }

        return true;
      };

      if (value === 'all') {
        const newFilter: any = {};

        keys.forEach((key) => newFilter[key] = checked);
        return newFilter;
      } else {
        const newFilter = { ...filter, [value]: checked };

        return {
          ...newFilter,
          'all': isAllChecked(newFilter),
        };
      }
    };
    const newFilter = getNewFilter();

    setFilter(newFilter);
  };

  const landings = ['all', '0', '1', '2', '3'];

  const landingsArray: ILanding = {
    'all': 'Все',
    '0': 'Без пересадок',
    '1': '1 пересадка',
    '2': '2 пересадки',
    '3': '3 пересадки',
  };

  const renderLabel = (key: string) => {
    const bool = filter[key];

    return (
      <label className={filterBlockListitem}>
        <input type='checkbox' checked={bool} value={key} onChange={filterChange} />
        <div className={filterBlockInput} style={bool ? undefined : { borderColor: '#9ABBCE' } }>
          <div className={filterBlockInputCheck} style={bool ? { display: 'block' } : undefined}></div>
        </div>
        {landingsArray[key]}
      </label>
    );
  };

  const {
    filterBlock,
    filterBlockTitle,
    filterBlockList,
    filterBlockListitem,
    filterBlockInput,
    filterBlockInputCheck,
  } = classes;

  return (
    <div className={filterBlock}>
      <h3 className={filterBlockTitle}>Количество пересадок</h3>
      <div className={filterBlockList}>
        {landings.map(renderLabel)}
      </div>
    </div>
  );
};

export default Filter;
