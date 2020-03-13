import React, { Component, useState } from 'react';
import Moment from 'react-moment';
import CurrencyFormat from 'react-currency-format';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import OpenInBrowser from '@material-ui/icons/OpenInBrowser';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const paymentMap = new Map([[0, 'CREDIT'], [1, 'DEBIT']]);
const styleMap = new Map([[0, 'primary'], [1, 'secondary']]);
const statusMap = new Map([[0, 'SUCCESS'], [1, 'PROCESSING'], [2, 'FAILED']]);
const accountId = '1';

const ResponsiveDialog = (props) => {
    const { transaction } = props;
    const [open, setOpen] = useState(false);
    const handleClickOpen  = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const classes = makeStyles(theme => ({ button: { margin: theme.spacing(1) } }));

    return (
        <div>
            <Button variant="contained" color={styleMap.get(transaction.type)} size="large"
                    className={classes.button} endIcon={<OpenInBrowser />}
                    onClick={handleClickOpen}
            >
                {paymentMap.get(transaction.type)}
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                fullWidth={true}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Transaction Information"}</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText id="alert-dialog-slide-description">
                        <ListItem>
                            <ListItemIcon> </ListItemIcon>
                            <ListItemText primary="Transaction ID:: " secondary={'#'+transaction.id}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon> </ListItemIcon>
                            <ListItemText primary="Amount:: "
                                          secondary={
                                              <CurrencyFormat value={transaction.amount} displayType={'text'}
                                                              thousandSeparator={true} prefix={'$'} />
                                              }/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon> </ListItemIcon>
                            <ListItemText primary="Transaction Creation Date:: "
                                          secondary={
                                              <Moment format="YYYY MMM MMMM HH:mm:ss">{transaction.create_date}</Moment>
                                              }/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon> </ListItemIcon>
                            <ListItemText primary="Transaction Status:: "
                                          secondary={statusMap.get( transaction.status )}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon> </ListItemIcon>
                            <ListItemText primary="Transaction Type:: "
                                          secondary={paymentMap.get( transaction.type )}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>  </ListItemIcon>
                            <ListItemText primary={'Description:: '} secondary={transaction.description}/>
                        </ListItem>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} size="large" color="secondary">
                        Thanks you!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

class TransactionsTable extends Component {
    state = { txList: [] };
    getTransactionsFromApi = async () => {
        let response = await axios.get(`/accountingNotebook/api/transactions/${accountId}`);
        this.setState({txList: response.data.data});
        console.log(response.data.data);
    };
    async componentDidMount() {
        await this.getTransactionsFromApi();
    }
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
                                <TableCell>{'#' + tx.id}</TableCell>
                                <TableCell>
                                    <Moment format="YYYY MMM MMMM HH:mm:ss">{tx.create_date}</Moment>
                                </TableCell>
                                <TableCell>
                                    <CurrencyFormat value={tx.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </TableCell>
                                <TableCell>
                                    <ResponsiveDialog transaction={tx}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
        );
    }
}

export default TransactionsTable;
