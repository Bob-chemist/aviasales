import React from 'react';
import classes from './ErrorIndicator.module.sass';

const ErrorIndicator = ({ info }: {info: string}) => {
  return (
    <div className={classes.error}>
      {`Something gone wrong! ${info}`}
    </div>
  );
};

export default ErrorIndicator;
