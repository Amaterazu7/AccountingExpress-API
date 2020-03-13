import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";

const accountId = '1';

class TransactionsTable extends Component {

    state = { txList: [] };

    getTransactionsFromApi = async () => {
        let response = await axios.get(`/accountingNotebook/api/transactions/${accountId}`);
        this.setState({txList: response.data.data});
    };

    async componentDidMount() {
        await this.getTransactionsFromApi();
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

    setState(state, callback) {
        super.setState(state, callback);
    }

    render() {
        return (
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Creation Date</TableCell>
                            <TableCell>Transaction Amount</TableCell>
                            <TableCell>Payment Method</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.txList.map(tx => (
                            <TableRow key={tx.id}>
                                <TableCell>{tx.id}</TableCell>
                                <TableCell>{tx.create_date}</TableCell>
                                <TableCell>{tx.amount}</TableCell>
                                <TableCell>{tx.type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
        );
    }
}

export default TransactionsTable;
