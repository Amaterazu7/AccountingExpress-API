import React, { Component }from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from "axios";

// Generate Order Data
function createData(id, amount, paymentMethod) {
  return { id, amount, paymentMethod };
}

let txList = [];
const rows = [];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

function getTransactionsFromApi() {
  axios.get(`/accountingNotebook/api/transactions/1`)
      .then(response => {
          txList = response.data.data;
          for (let i = 0 ; i > txList.length; i++) {
              rows.push( createData(txList[i].create_date, txList[i].amount, txList[i].type) );
          }

          console.log({ resultList: txList });
      });
}

class ComponentOrders extends Component {
    componentDidMount = () => {
        getTransactionsFromApi();
    };
}

export default function Orders() {
  const classes = useStyles();

  /** POPUP
   *
   Transaction Id:: #1

   Amount:: € 50,000.00

   Transaction Creation Date:: Mar 12, 2020, 2:36:34 AM

   Transaction Status:: PROCESSING

   Transaction Type:: CREDIT

   Description:: InitializerTransaction
   *
   * */

  return (
    <React.Fragment>
      <Title component={ComponentOrders}>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
            <TableCell>Payment Method</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={1}>
                <TableCell>{row.id}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
