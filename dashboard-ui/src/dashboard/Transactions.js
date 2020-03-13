import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import TransactionsTable from "./component/TransactionsTable";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  }
}));

export default function Transactions() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Recent Transactions</Title>
            <TransactionsTable/>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    See more Transactions by Account
                </Link>
            </div>
        </React.Fragment>
    );
}
