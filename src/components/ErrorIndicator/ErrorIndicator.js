import React from 'react';
import classes from './ErrorIndicator.module.sass';

const ErrorIndicator = (props) => {
  return (
    <div className={classes.error}>
      {`Something gone wrong! ${props.info}`}
    </div>
  );
};

export default ErrorIndicator;
