import React from 'react';
import Moment from 'react-moment';
import CurrencyFormat from 'react-currency-format';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
          <CurrencyFormat value={75000} displayType={'text'} thousandSeparator={true} prefix={'$'} />
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
          <Moment format="YYYY MMM MMMM HH:mm:ss">{new Date()}</Moment>
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
