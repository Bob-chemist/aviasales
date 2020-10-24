import React, { FC, useContext } from 'react';
import classes from './Filter.module.sass';
import { useTranslation } from 'react-i18next';
import { FilterContext } from '../../App';
import { FilterState, UPDATE } from '../../reducers';

interface Landing {
  [key: string]: string;
}

const Filter: FC = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(FilterContext);

  const filterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = event.target;

    const isAllChecked = (state: FilterState): boolean => {
      for (const key in state) {
        if (key !== 'all' && !state[key]) {
          return false;
        }
      }

      return true;
    };

    const getNewFilter = (): FilterState => {
      const keys = Object.keys(state);

      if (value === 'all') {
        const newFilter = {} as FilterState;

        keys.forEach((key) => newFilter[key] = checked);
        return newFilter;
      } else {
        const newFilter = { ...state, [value]: checked };

        return {
          ...newFilter,
          'all': isAllChecked(newFilter),
        };
      }
    };

    dispatch({
      type: UPDATE,
      payload:  getNewFilter(),
    });
  };

  const landings = ['all', '0', '1', '2', '3'];

  const landingsArray: Landing = {
    'all': t('all'),
    '0': t('0connections'),
    '1': t('1connection'),
    '2': t('2connections'),
    '3': t('3connections'),
  };

  const renderLabel = (key: string): JSX.Element => {
    const bool = state[key];

    return (
      <label key={key} className={filterBlockListitem}>
        <input type='checkbox' checked={bool} value={key} onChange={filterChange} />
        <div className={filterBlockInput} style={bool ? undefined : { borderColor: '#9ABBCE' } }>
          <div className={filterBlockInputCheck} style={bool ? { opacity: 1 } : undefined}></div>
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
      <h3 className={filterBlockTitle}>{t('nOfConnections')}</h3>
      <div className={filterBlockList}>
        {landings.map(renderLabel)}
      </div>
    </div>
  );
};

export default Filter;
