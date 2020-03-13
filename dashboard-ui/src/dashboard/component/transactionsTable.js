import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";

// Generate Order Data
function createData(id, createDate, amount, paymentMethod) {
    return { id, createDate, amount, paymentMethod };
}

let txList = [];
const rows = [];
const accountId = '1';

function getTransactionsFromApi() {
    axios.get(`/accountingNotebook/api/transactions/${accountId}`)
        .then(response => {
            txList = response.data.data;
            for (let i = 0; i > txList.length; i++) {
                rows.push( createData(txList[i].id, txList[i].create_date, txList[i].amount, txList[i].type) );
            }
            console.log({ resultList: txList });
        });
}

class TransactionsTable extends Component {
    componentDidMount() {
        getTransactionsFromApi();
    }

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

    render() {
        return (
            <React.Fragment>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Creation Date</TableCell>
                            <TableCell align="right">Sale Amount</TableCell>
                            <TableCell>Payment Method</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={1}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.createDate}</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell>{row.paymentMethod}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
}

export default TransactionsTable;
