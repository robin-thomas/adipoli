import { useEffect, useContext, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Tooltip } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { fromUnixTime, format } from 'date-fns';
import { Scrollbars } from 'react-custom-scrollbars-2';

import fetchJson from '../../utils/fetchJson';
import { DataContext } from '../utils/DataProvider';

import styles from './transactions.module.css';

const getTransactionType = (type) => {
  switch (type) {
    case 'p2p_transfer':
      return 'Transfer;';

    case 'payment_funds_in':
      return 'Top Up';
  }
};

const getTransactionIcon = (type) => {
  switch (type) {
    case 'p2p_transfer':
      return <PersonOutlineIcon fontSize="large" />;

    case 'payment_funds_in':
      return <GetAppIcon fontSize="large" />;
  }
};

const Transaction = (transaction) => (
  <div className={styles.txnContainer}>
    <Row className="align-items-center">
      <Col md="auto">
        <div className={styles.iconContainer}>
          {getTransactionIcon(transaction.type)}
        </div>
      </Col>
      <Col md="2">{getTransactionType(transaction.type)}</Col>
      <Tooltip title={transaction.id} placement="top" arrow>
        <Col md="4" className={styles.id}>
          ID {transaction.id.slice(0, 20)}...
        </Col>
      </Tooltip>
      <Col md="2" className={styles.amount}>
        <span
          className={
            styles[`${transaction.amount > 0 ? 'amountGreen' : 'amountRed'}`]
          }
        >
          {transaction.amount > 0
            ? `+$${transaction.amount}`
            : `-$${Math.abs(transaction.amount)}`}
        </span>
      </Col>
      <Col md="auto" className="ml-auto mr-4">
        <div className={styles.date}>
          <Row>
            <Col>
              {format(fromUnixTime(transaction.created_at), 'yyyy-MM-dd')}
            </Col>
          </Row>
          <Row>
            <Col>
              {format(fromUnixTime(transaction.created_at), 'hh:mm aaa')}
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </div>
);

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  const ctx = useContext(DataContext);

  useEffect(() => {
    const fn = async () => {
      try {
        const url = `/api/wallet/${ctx.user.walletId}/transactions`;
        const resp = await fetchJson(url, { method: 'GET' });
        setTransactions(resp.transactions);
      } catch (err) {
        // TODO.
      }
    };

    fn();
  }, [ctx.user, ctx.toppedUp]);

  return (
    <>
      <div className={styles.title}>Recent Transactions</div>
      <hr />
      <Scrollbars autoHide renderThumbHorizontal={() => <div></div>}>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} {...transaction} />
        ))}
      </Scrollbars>
    </>
  );
};

export default Transactions;
