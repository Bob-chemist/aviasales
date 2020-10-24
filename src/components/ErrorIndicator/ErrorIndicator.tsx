import React, { FC } from 'react';
import classes from './ErrorIndicator.module.sass';

type OwnProps ={
  info: string | null;
}

const ErrorIndicator: FC<OwnProps> = ({ info }) => {
  return info ? (
    <div className={classes.error}>
      {`Something gone wrong! ${info}`}
    </div>
  ) : null;
};

export default ErrorIndicator;
