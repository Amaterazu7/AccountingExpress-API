import React, { Component } from 'react';
import Moment from 'react-moment';
import CurrencyFormat from 'react-currency-format';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from "axios";

const classes = {};
const accountId = '1';
const paymentMap = new Map([[0, 'CREDIT'], [1, 'DEBIT']]);
const styleMap = new Map([[0, 'primary'], [1, 'secondary']]);

class TransactionsTable extends Component {
    state = { txList: [] };
    classes = makeStyles(theme => ({
        button: {
            margin: theme.spacing(1),
        },
    }));

    getTransactionsFromApi = async () => {
        let response = await axios.get(`/accountingNotebook/api/transactions/${accountId}`);
        this.setState({txList: response.data.data});
    };

    async componentDidMount() {
        await this.getTransactionsFromApi();
    }

    setState(state, callback) {
        super.setState(state, callback);
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
                                <TableCell>
                                    <Moment format="YYYY MMM MMMM HH:mm:ss">{tx.create_date}</Moment>
                                </TableCell>
                                <TableCell>
                                    <CurrencyFormat value={tx.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color={styleMap.get(tx.type)} size="large"
                                            className={classes.button} endIcon={<CloudUploadIcon />}>
                                        {paymentMap.get(tx.type)}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
        );
    }
}

export default TransactionsTable;
